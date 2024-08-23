import { CommonActions } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import { View } from 'react-native-picasso'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { formatCurrency, formatDate, useStorage } from 'src/contexts/StorageProvider'
import UserContext from 'src/contexts/UserContext'
import OrderHTTP from 'src/utils/http/OrderHTTP'

const SendOrders = props => {
  const { navigation, route } = props
  const { order } = route.params
  const { user, setUser } = useContext(UserContext)
  const { storageData, setStorageData } = useStorage()
  const [openOder, setopenOder] = useState(false)
  const [shipping, setshipping] = useState({})
  const [oderCarts, setoderCarts] = useState([])
  const [vnp_CardType, setvnp_CardType] = useState('')
  const [vnp_PayDate, setvnp_PayDate] = useState('')
  const [vnp_OrderInfo, setvnp_OrderInfo] = useState('')
  const [vnp_TransactionNo, setvnp_TransactionNo] = useState('')
  const [amount, setamount] = useState('')
  const [transportFee, setTransportFee] = useState('')
  const [orderSuccess, setorderSuccess] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          vnp_Amount,
          vnp_BankCode,
          vnp_BankTranNo,
          vnp_CardType,
          vnp_OrderInfo,
          vnp_PayDate,
          vnp_ResponseCode,
          vnp_SecureHash,
          vnp_TmnCode,
          vnp_TransactionNo,
          vnp_TransactionStatus,
          vnp_TxnRef
        } = route.params
        const payment = {
          amount: vnp_Amount,
          bankCode: vnp_BankCode,
          bankTranNo: vnp_BankTranNo,
          cardType: vnp_CardType,
          orderInfo: vnp_OrderInfo,
          payDate: vnp_PayDate,
          responseCode: vnp_ResponseCode,
          secureHash: vnp_SecureHash,
          tmnCode: vnp_TmnCode,
          transactionNo: vnp_TransactionNo,
          transactionStatus: vnp_TransactionStatus,
          txnRef: vnp_TxnRef
        }
        setStorageData([])
        // TH thành công
        if (payment.responseCode == '00') {
          console.log('====================================')
          console.log('Thanh toán thành công')
          const res = await OrderHTTP.update(payment.orderInfo, { payment })
          console.log(JSON.stringify(res, null, 2))
          setvnp_CardType(payment.cardType)
          setvnp_OrderInfo(payment.orderInfo)
          setvnp_TransactionNo(payment.transactionNo)
          setvnp_PayDate(payment.payDate)
          setamount(res.amount)
          if (res.amount <= 499000) {
            setTransportFee(49000)
          } else {
            setTransportFee(0)
          }
          setoderCarts(res.carts)
          setorderSuccess(true)
          user.shipping.map(item => {
            if (item.selected == true) {
              setshipping(item)
            }
          })
          if (order) {
            setoderCarts(res.carts)
          }
        } else if (payment.responseCode == '24') {
          payment.responseCode == '02'
          await OrderHTTP.update(payment.orderInfo, { payment })
          console.log('Đã xóa hóa đơn')
          const res = await OrderHTTP.remove(payment.orderInfo)
          const newOrder = { ...res.result }
          newOrder.status = '01'
          delete newOrder.payment
          delete newOrder._id
          const newRes = await OrderHTTP.insert(newOrder)
        } else {
          throw new Error('Lỗi không xác định')
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchData()
  }, [user, shipping])

  const formattedDate = formatDate(vnp_PayDate)
  const formattedAmount = formatCurrency(amount)
  const formattedTransportfee = formatCurrency(transportFee)
  const calculateTotalBasePrice = oderCarts => {
    return oderCarts.reduce((total, product) => total + product.base_price, 0)
  }
  const totalBasePrice = calculateTotalBasePrice(oderCarts)
  const formattedBase_price = formatCurrency(totalBasePrice)

  const renderItem = ({ item, index }) => {
    const { image, product_Name, base_price, color, size, code, quantity } = item
    const formattedBase_price = formatCurrency(base_price)
    const formattedNewPrice = formatCurrency(base_price * quantity)
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 16
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 134, flex: 1, resizeMode: 'center' }}
        />

        <View style={{ flex: 2 }}>
          <Text style={[styles.txt_title, { fontSize: 14 }]}>{product_Name}</Text>
          <Text style={[styles.txt_title, { fontSize: 14 }]}>{formattedBase_price}</Text>
          <View style={{ height: 16 }} />
          <View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Text style={styles.txt_description_carts}>Mã số sản phẩm:</Text>
              <Text style={styles.txt_description_carts}>{code}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Text style={styles.txt_description_carts}>Số lượng:</Text>
              <Text style={styles.txt_description_carts}>{quantity}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Text style={styles.txt_description_carts}>Màu sắc:</Text>
              <Text style={styles.txt_description_carts}>{color}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Text style={styles.txt_description_carts}>Kích cỡ:</Text>
              <Text style={styles.txt_description_carts}>{size}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Text style={styles.txt_description_carts}>Tổng</Text>
              <Text style={styles.txt_description_carts}>{formattedNewPrice}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
  function resetToScreen(navigation) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Vị trí của màn hình bạn muốn hiển thị sau khi reset
        routes: [{ name: 'BagPage' }] // Tên của màn hình mà bạn muốn điều hướng đến
      })
    )
  }
  function resetProfileStack(navigation) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Vị trí của màn hình bạn muốn hiển thị sau khi reset
        routes: [{ name: 'Profile' }] // Tên của màn hình mà bạn muốn điều hướng đến
      })
    )
  }
  const oder = () => {
    return (
      <View>
        <View style={{ backgroundColor: Colors.white, padding: 16, marginTop: 32 }}>
          <Text style={[styles.txt_title, { textAlign: 'center' }]}>
            Chi tiết đơn hàng - {vnp_TransactionNo}
          </Text>
          <Text style={styles.txtTitleProfile}>Email</Text>
          <Text style={styles.txtUserName}>{user.email}</Text>
          <Text style={styles.txtTitleProfile}>Phương thức thanh toán</Text>
          {vnp_CardType ? (
            <Text style={styles.txtUserName}>Thanh toán bằng thẻ {vnp_CardType}</Text>
          ) : (
            <Text style={styles.txtUserName}>Thanh toán bằng tiền mặt</Text>
          )}
          <Text style={styles.txtTitleProfile}>Ngày đặt hàng</Text>
          <Text style={styles.txtUserName}>{formattedDate}</Text>
          <View>
            <Text style={styles.txtTitleProfile}>Số điện thoại liên hệ</Text>
            <Text style={styles.txtUserName}>84+ {user.phoneNumber}</Text>
            <Text style={[styles.txtTitleProfile, { marginTop: 4 }]}>Tùy chọn giao hàng</Text>
            <Text style={styles.txtUserName}>Giao hàng tiêu chuẩn</Text>
          </View>
          <Text style={styles.txtTitleProfile}>Địa chỉ giao hàng</Text>
          <Text style={styles.txtUserName}>{shipping.name}</Text>
          <Text style={styles.txtUserName}>{shipping.address}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.txtUserName}>{shipping.ward}</Text>
            <View style={{ width: 8 }} />
            <Text style={styles.txtUserName}>{shipping.city}</Text>
            <View style={{ width: 8 }} />
            <Text style={styles.txtUserName}>{shipping.zipCode}</Text>
          </View>
        </View>
        <View style={{ marginTop: 32, backgroundColor: Colors.grayBg }}>
          <Text style={[styles.txt_title, { textAlign: 'center' }]}>
            Tóm tắt đơn hàng - {vnp_TransactionNo}
          </Text>
          <Text style={[styles.txt_description, { textAlign: 'center', marginTop: 4 }]}>
            Thời gian giao hàng: 3-7 NGÀY LÀM VIỆC
          </Text>
          <View style={{ height: 16 }} />
          <FlatList scrollEnabled={false} data={oderCarts} renderItem={renderItem} />
          <View style={{ height: 32 }} />
        </View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.txt_title}>Giá trị sản phẩm</Text>
            <Text style={styles.txt_title}>{formattedBase_price}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={styles.txt_title}>Phí giao hàng</Text>
            {transportFee === 0 ? (
              <Text style={styles.txt_title}>Miễn Phí</Text>
            ) : (
              <Text style={styles.txt_title}>{formattedTransportfee}</Text>
            )}
          </View>
          <View style={{ borderBottomWidth: 1, borderColor: Colors.black2, marginVertical: 16 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={styles.txt_title}>Tổng</Text>
            <Text style={styles.txt_title}>{formattedAmount}</Text>
          </View>
          <View style={{ marginVertical: 32 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={styles.txt_description}>
                Để biết thêm thông tin, vui lòng đăng nhập vào
              </Text>
              <Text style={[styles.txt_description, { borderBottomWidth: 1 }]}>
                Tài Khoản Của Tôi
              </Text>
              <Text style={styles.txt_description}> hoặc gọi cho chúng tôi tại 1800400180.</Text>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={styles.txt_description}>
                Để biết thông tin về trả hàng, vui lòng đọc
              </Text>
              <Text style={[styles.txt_description, { borderBottomWidth: 1 }]}>
                Chính sách Trả hàng và Hoàn tiền
              </Text>
            </View>
            <Text style={styles.txt_description}>
              Chúng tôi hi vọng bạn đã có trải nghiệm mua sắm tốt đẹp!
            </Text>
          </View>
        </View>
      </View>
    )
  }

  const paymentSuccessful = () => {
    return (
      <View style={{ paddingHorizontal: 16, backgroundColor: Colors.grayBg }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginVertical: 16 }}>
          <MyText style={{ color: Colors.black2, fontSize: 12 }}>Đóng</MyText>
        </TouchableOpacity>
        <Text style={[styles.txt_title, { fontSize: 24, textAlign: 'center' }]}>Cảm ơn bạn!</Text>
        <Text style={[styles.txt_description, { marginTop: 8, textAlign: 'justify' }]}>
          Chúng tôi đang tiếp nhận đơn hàng của bạn và bạn sẽ sớm nhận được email xác nhận đơn hàng
          được gửi tới {user.email}. Trong thời gian chờ đợi, hãy khám phá các sản phẩm thời trang
          mới nhất và tìm cảm hứng từ FwF Magazine
        </Text>
        <Text style={[styles.txt_description, { marginTop: 8, textAlign: 'justify' }]}>
          Các thành viên FwF được tích điểm cho mỗi lần mua hàng và có quyền truy cập các phần
          thưởng thời trang cũng như các đặc quyền đặc biệt. Nếu bạn là thành viên, có thể mất đến
          24 giờ để cập nhật số điểm mới nhất cảu bạn.
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: Colors.black2, paddingVertical: 16, marginTop: 16 }}
        >
          <TouchableOpacity onPress={() => setopenOder(!openOder)}>
            {openOder ? (
              <Text
                style={[
                  styles.txt_title,
                  { color: Colors.white, textAlign: 'center', fontSize: 14 }
                ]}
              >
                Ẩn xác nhận đơn hàng
              </Text>
            ) : (
              <Text
                style={[
                  styles.txt_title,
                  { color: Colors.white, textAlign: 'center', fontSize: 14 }
                ]}
              >
                Xem xác nhận đơn hàng
              </Text>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
        <Pressable style={{ marginTop: 16, alignItems: 'center' }}>
          <Text
            style={[styles.txt_description, { borderBottomWidth: 1, borderColor: Colors.black }]}
          >
            TÌm hiểu về chính sách trả hàng của chúng tôi
          </Text>
        </Pressable>
        {openOder ? oder() : null}
        <View style={{ paddingVertical: 32 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={styles.container_setting}
              onPress={() => {
                resetToScreen(navigation)
                resetProfileStack(navigation)
                navigation.navigate('ProfileStack', { screen: 'MyOrder' })
              }}
            >
              <Icons.AntDesign name="inbox" size={24} />
              <Text style={styles.txtSetting}>GIAO HÀNG</Text>
            </TouchableOpacity>
            <View style={{ width: 4 }} />
            <TouchableOpacity
              style={styles.container_setting}
              onPress={() => navigation.navigate('SettingProfile')}
            >
              <Icons.Octicons name="credit-card" size={24} />

              <Text style={styles.txtSetting}>THANH TOÁN</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 4 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.container_setting}>
              <Icons.Ionicons name="return-up-back-outline" size={24} />
              <Text style={styles.txtSetting}>TRẢ HÀNG</Text>
            </TouchableOpacity>
            <View style={{ width: 4 }} />
            <TouchableOpacity style={styles.container_setting}>
              <Icons.FontAwesome name="commenting-o" size={24} />
              <Text style={styles.txtSetting}>DỊCH VỤ KHÁCH HÀNG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  const paymentFailed = () => {
    return (
      <View
        style={{
          paddingHorizontal: 16,
          backgroundColor: Colors.white,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={[styles.txt_title, { marginVertical: 16, fontSize: 18 }]}>Thanh toán</Text>
        <Image
          source={require('../../../assets/images/ic_error.png')}
          style={{ width: 104, height: 104, marginBottom: 16 }}
        />
        <Text style={[styles.txt_title, { textAlign: 'center', color: Colors.red, fontSize: 16 }]}>
          Thanh toán không thành công
        </Text>
        <TouchableOpacity
          onPress={() => {
            resetToScreen(navigation)
            resetProfileStack(navigation)
            navigation.navigate('ProfileStack', { screen: 'Profile' })
          }}
        >
          <Text style={styles.txt_title}>Đơn hàng đã bị hủy</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView styles={styles.container} showsVerticalScrollIndicator={false}>
      {orderSuccess ? paymentSuccessful() : paymentFailed()}
    </ScrollView>
  )
}

export default SendOrders

const styles = StyleSheet.create({
  txtSetting: {
    marginTop: 8,
    fontSize: 10,
    fontFamily: 'Montserrat-SemiBold',
    width: '100%',
    textAlign: 'center'
  },

  container_setting: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 36,
    flex: 1,
    borderRadius: 4
  },
  txtTitleProfile: {
    marginTop: 16,
    color: Colors.black,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12
  },
  txtUserName: {
    color: Colors.black,
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    marginTop: 4
  },
  container_oder: {
    backgroundColor: Colors.white,
    padding: 16
  },
  txt_description_carts: {
    color: Colors.black2,
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1
  },
  txt_description: {
    color: Colors.black2,
    fontFamily: 'Montserrat-Medium',
    fontSize: 10
  },
  txt_title: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.black2
  },
  container: {
    width: '100%',
    height: '100%'
  }
})
