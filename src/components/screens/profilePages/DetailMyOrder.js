import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Modal from 'react-native-modal'
import RadioGroup from 'react-native-radio-buttons-group'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import Names from 'src/constants/Names'
import { formatCurrency } from 'src/contexts/StorageProvider'
import UserContext from 'src/contexts/UserContext'
import OrderHTTP from 'src/utils/http/OrderHTTP'
const DetailMyOrder = ({ route }) => {
  const navigation = useNavigation()
  const { user } = useContext(UserContext)
  const { myOrder } = route.params || {}
  const [transportFee, setTransportFee] = useState('')
  const [shipping, setshipping] = useState({})
  const [carts, setCarts] = useState([])
  const [status, setstatus] = useState(false)
  const [isShowModal, setisShowModal] = useState(false)
  const [isHuy, setisHuy] = useState(false)
  const [cancelMessage, setcancelMessage] = useState(null)
  const [selectedValue, setSelectedValue] = useState(null)
  const [selectedId, setSelectedId] = useState()

  useFocusEffect(
    useCallback(() => {
      if (navigation) {
        navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
      }
    }, [navigation])
  )
  useEffect(() => {
    const fetchData = () => {
      try {
        // if (myOrder.status != '01' || myOrder.status != '05') {
        //   setstatus(true)
        //   console.log(myOrder.payment.transactionStatus)
        // } else {
        //   setstatus(false)
        // }
        // console.log(JSON.stringify(myOrder.status, null, 2))

        user.shipping.map(item => {
          if (item.selected == true) {
            setshipping(item)
          }
        })
        setCarts(myOrder.carts)
        if (myOrder.amount < 499000) {
          setTransportFee(49000)
        } else {
          setTransportFee(0)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const calculateTotalBasePrice = carts => {
    return carts.reduce((total, product) => total + product.base_price, 0)
  }
  const totalBasePrice = calculateTotalBasePrice(carts)
  const formattedBase_price = formatCurrency(totalBasePrice)
  const formattedAmount = formatCurrency(myOrder.amount)
  const formattedTransportfee = formatCurrency(transportFee)

  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Khác',
        value: 'khac',
        labelStyle: styles.label
      },
      {
        id: '2',
        label: 'Tôi muốn thêm một sản phẩm khác',
        value: 'themSanPham',
        labelStyle: styles.label
      },
      {
        id: '3',
        label: 'Tôi đã đổi ý',
        value: 'doiY',
        labelStyle: styles.label
      },
      {
        id: '4',
        label: 'Tôi đặt nhầm ( ví dụ: sai kích cỡ, sai màu sắc )',
        value: 'datNham',
        labelStyle: styles.label
      },
      {
        id: '5',
        label: 'Tôi muốn sử dụng phương thức thanh toán khác',
        value: 'ptThanhToanKhac',
        labelStyle: styles.label
      },
      {
        id: '6',
        label: 'Tôi quên thêm mã giảm giá',
        value: 'quenMaGiamGia',
        labelStyle: styles.label
      }
    ],
    []
  )
  const getSelectedValue = () => {
    const selectedButton = radioButtons.find(button => button.id === selectedId)
    return selectedButton ? selectedButton.value : null
  }
  console.log(getSelectedValue())

  const handleCancel = async () => {
    if (getSelectedValue() != null) {
      const res = await OrderHTTP.cancel({
        id: myOrder._id,
        status: '04',
        messageCancel: getSelectedValue()
      })
      console.log(JSON.stringify(res, null, 2))
      navigation.goBack()
    } else {
      console.log('Chưa chọn lý do hủy')
    }
  }

  const showModalHuy = () => {
    return (
      <Modal isVisible={isShowModal}>
        <View style={{ flex: 1, backgroundColor: Colors.white, justifyContent: 'space-between' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16
            }}
          >
            <Text style={[styles.txt_title, { fontSize: 18, textAlign: 'center' }]}>Hủy đơn</Text>
          </View>
          {isHuy ? (
            <View style={{ padding: 16, flex: 1 }}>
              <Text style={[styles.txt_title, { fontSize: 20, marginTop: 8 }]}>Tại sao?</Text>
              <Text style={[styles.txt_description, { fontSize: 12, marginVertical: 8 }]}>
                Bạn có chắc chắn muốn hủy đơn hàng này ?
              </Text>
              <RadioGroup
                containerStyle={{ alignItems: 'flex-start', marginTop: 8 }}
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
              />
              {/* <Text>Selected Value: {getSelectedValue()}</Text> */}
            </View>
          ) : (
            <View style={{ paddingHorizontal: 16, flex: 1 }}>
              <View style={{ height: 32 }} />
              <Text style={[styles.txt_title, { fontSize: 20 }]}>
                Bạn có chắc chắn muốn hủy đơn hàng này ?
              </Text>
              <Text style={[styles.txt_description, { marginTop: 16, fontSize: 14 }]}>
                Nếu bạn hủy đơn đặt hàng và đổi ý sau đó, bạn sẽ phải thực hiện lại thanh toán toàn
                bộ giao dịch mua hàng.
              </Text>
              <Text style={[styles.txt_description, { marginTop: 16, fontSize: 14 }]}>
                Khi bạn hủy đơn hàng của mình, bạn sẽ được hoàn lại tiền đầy đủ và hoàn toàn không
                bị tính phí tùy thuộc vào phương thức thanh toán bạn đã chọn
              </Text>
            </View>
          )}
          <View>
            {isHuy ? (
              <TouchableOpacity
                onPress={() => handleCancel()}
                style={{
                  backgroundColor: Colors.black2,
                  padding: 16,
                  marginHorizontal: 16,
                  borderWidth: 1
                }}
              >
                <Text style={[styles.txt_huy, { color: Colors.white }]}>Gửi</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setisHuy(true)}
                style={{
                  backgroundColor: Colors.black2,
                  padding: 16,
                  marginHorizontal: 16,
                  borderWidth: 1
                }}
              >
                <Text style={[styles.txt_huy, { color: Colors.white }]}>Xác nhận hủy</Text>
              </TouchableOpacity>
            )}
            <View style={{ height: 16 }} />
            <TouchableOpacity
              onPress={() => setisShowModal(!isShowModal) & setisHuy(false)}
              style={{
                backgroundColor: Colors.white,
                padding: 16,
                marginHorizontal: 16,
                borderWidth: 1
              }}
            >
              <Text style={[styles.txt_huy, { color: Colors.black2 }]}>Quay lại</Text>
            </TouchableOpacity>
            <View style={{ height: 16 }} />
          </View>
        </View>
      </Modal>
    )
  }
  return (
    <KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* <View style={{ backgroundColor: Colors.skyBlue, padding: 28 }}>
        <Text style={styles.txt_title}>Đơn hàng của bạn đã bị hủy vào {'date..'} </Text>
        <Text
          style={[styles.txt_description, { marginTop: 4, fontSize: 12, textAlign: 'justify' }]}
        >
          Bạn sẽ được hoàn tiền theo phương thức thanh toán ban đầu. Nếu bạn thanh toán qua các cổng
          thanh toán online thì khoản tiền hoàn sẽ được chuyển vào tài khoản ngân hàng của bạn.
        </Text>
      </View> */}
        <View style={{ flexDirection: 'row', padding: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1 }}>
            <Icons.Ionicons name={'arrow-back-sharp'} size={24} color={Colors.black} />
          </TouchableOpacity>
          <Text style={[styles.txt_title, { fontSize: 18, flex: 3, textAlign: 'center' }]}>
            Chi tiết đơn hàng
          </Text>
          <View style={{ flex: 1 }} />
        </View>
        <View
          style={{
            padding: 16,
            backgroundColor: Colors.greenAlpha
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.txt_title}>Mã đơn hàng</Text>
            <Text Text style={styles.txt_title}>
              Ngày đặt hàng
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 4
            }}
          >
            <Text style={[styles.txt_description, { borderBottomWidth: 1, fontSize: 12 }]}>
              {myOrder.code}
            </Text>

            <Text Text style={[styles.txt_description, { textAlign: 'right', fontSize: 12 }]}>
              {myOrder.created_at}
            </Text>
          </View>
        </View>

        <View style={{ padding: 16, backgroundColor: Colors.white }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.txt_title}>Phương thức giao hàng: </Text>
            <Text style={[styles.txt_description, { fontSize: 12 }]}> Giao hàng tiêu chuẩn</Text>
          </View>
          <Text
            style={[styles.txt_title, { fontSize: 18, textAlign: 'center', marginVertical: 24 }]}
          >
            Tóm tắt đơn hàng
          </Text>

          {carts.map((item, index) => {
            const formattedBase_price = formatCurrency(item.base_price)
            const formattedNewPrice = formatCurrency(item.base_price * item.quantity)
            return (
              <View key={index}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: '100%', height: 176, flex: 2, resizeMode: 'cover' }}
                  />
                  <View style={{ width: 16 }} />
                  <View style={{ flex: 4, justifyContent: 'space-between' }}>
                    <View>
                      <Text style={[styles.txt_title, { fontSize: 14 }]}>{item.product_Name}</Text>
                      <Text style={[styles.txt_title, { fontSize: 14, marginTop: 4 }]}>
                        {formattedBase_price}
                      </Text>
                    </View>
                    <View style={{ height: 16 }} />
                    <View>
                      <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Text style={styles.txt_description_carts}>Mã số sản phẩm:</Text>
                        <Text style={styles.txt_description_carts}>{item.code}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Text style={styles.txt_description_carts}>Số lượng:</Text>
                        <Text style={styles.txt_description_carts}>{item.quantity}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Text style={styles.txt_description_carts}>Màu sắc:</Text>
                        <Text style={styles.txt_description_carts}>{Names[item.color]}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Text style={styles.txt_description_carts}>Kích cỡ:</Text>
                        <Text style={styles.txt_description_carts}>{item.size}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Text style={styles.txt_description_carts}>Tổng</Text>
                        <Text style={styles.txt_description_carts}>{formattedNewPrice}</Text>
                      </View>
                    </View>
                    <View style={{ height: 4 }} />
                  </View>
                </View>
                <TouchableOpacity
                  style={{ paddingVertical: 16, marginVertical: 16, borderWidth: 1 }}
                >
                  <Text style={[styles.txt_title, { textAlign: 'center' }]}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
              </View>
            )
          })}
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.txt_description, { fontSize: 12 }]}>Giá trị sản phẩm: </Text>
              <Text style={[styles.txt_description, { fontSize: 12 }]}>{formattedBase_price} </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
              <Text style={[styles.txt_description, { fontSize: 12 }]}>Phí giao hàng: </Text>
              <Text style={[styles.txt_description, { fontSize: 12 }]}>
                {transportFee == 0 ? 'MIỄN PHÍ' : formattedTransportfee}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 }}
          >
            <Text style={[styles.txt_title, { fontSize: 14 }]}>Tổng</Text>
            <Text style={[styles.txt_title, { fontSize: 14 }]}>{formattedAmount}</Text>
          </View>
        </View>
        <View style={{ backgroundColor: Colors.white, marginTop: 10, padding: 16 }}>
          <Text style={styles.txt_title}>Phương thức giao hàng</Text>
          <Text style={[styles.txt_description, { fontSize: 12, marginTop: 4 }]}>
            Giao hàng tiêu chuẩn
          </Text>
          <View style={{ flexWrap: 'wrap', gap: 4, marginTop: 16 }}>
            <Text style={styles.txt_title}>Địa chỉ giao hàng</Text>
            <Text style={styles.txt_description}>{shipping.address}</Text>
            <Text style={[styles.txt_description]}>{shipping.ward}</Text>
            <Text style={[styles.txt_description]}>{shipping.district}</Text>
            <Text style={[styles.txt_description]}>{shipping.city}</Text>
            <Text style={styles.txt_description}>{shipping.zipCode}</Text>
          </View>
          <Text style={styles.txt_title}>Phương thức thanh toán</Text>
          <Text style={[styles.txt_description, { fontSize: 12, marginTop: 4 }]}>
            Thanh toán Online
          </Text>
        </View>
        <View style={{ backgroundColor: Colors.white, marginTop: 10, padding: 16 }}>
          <Text style={styles.txt_title}>Thông tin của bạn</Text>
          <Text style={[styles.txt_description, { marginTop: 4 }]}>{user.username}</Text>
          <Text style={[styles.txt_description, { marginTop: 4 }]}>{user.email}</Text>
        </View>
      </ScrollView>
      {myOrder.status == '00' ? (
        <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 16,
              backgroundColor: Colors.white
            }}
          >
            <TouchableOpacity
              style={styles.btn_huy}
              onPress={() => navigation.navigate('MyAddress')}
            >
              <Text style={styles.txt_huy}>Thay đổi địa chỉ</Text>
            </TouchableOpacity>
            <View style={{ width: 8 }} />
            <TouchableOpacity
              style={[styles.btn_huy, { backgroundColor: Colors.black2 }]}
              onPress={() => setisShowModal(!isShowModal)}
            >
              <Text style={[styles.txt_huy, { color: Colors.white }]}>Hủy đơn hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {isShowModal ? showModalHuy() : null}
    </KeyboardAvoidingView>
  )
}

export default DetailMyOrder

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: Colors.black2,
    marginVertical: 8,
    flexWrap: 'wrap', // Ensure text wraps onto the next line
    maxWidth: '90%' // Optional: control the maximum width to ensure it wraps within the container
  },
  txt_huy: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.black2,
    textAlign: 'center'
  },
  btn_huy: {
    padding: 16,
    borderWidth: 1,
    flex: 1,
    borderColor: Colors.gray
  },
  txt_description_carts: {
    color: Colors.black2,
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt_title: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.black2
  },
  txt_description: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: Colors.black2
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.grayBg
  }
})
