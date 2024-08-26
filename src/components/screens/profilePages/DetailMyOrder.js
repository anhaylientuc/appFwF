import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from 'src/constants/Colors'
import Names from 'src/constants/Names'
import { formatCurrency } from 'src/contexts/StorageProvider'
const DetailMyOrder = ({ route }) => {
  const navigation = useNavigation()
  const { myOrder } = route.params || {}
  const [transportFee, setTransportFee] = useState('')

  const [carts, setCarts] = useState([])
  useEffect(() => {
    const fetchData = () => {
      try {
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ backgroundColor: Colors.skyBlue, padding: 28 }}>
        <Text style={styles.txt_title}>Đơn hàng của bạn đã bị hủy vào {'date..'} </Text>
        <Text
          style={[styles.txt_description, { marginTop: 4, fontSize: 12, textAlign: 'justify' }]}
        >
          Bạn sẽ được hoàn tiền theo phương thức thanh toán ban đầu. Nếu bạn thanh toán qua các cổng
          thanh toán online thì khoản tiền hoàn sẽ được chuyển vào tài khoản ngân hàng của bạn.
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          backgroundColor: Colors.grayBg
        }}
      >
        <View>
          <Text style={styles.txt_title}>Mã đơn hàng</Text>
        </View>
        <View>
          <Text Text style={styles.txt_title}>
            Ngày đặt hàng
          </Text>
        </View>
      </View>
      <View style={{ padding: 16, backgroundColor: Colors.white }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.txt_title}>Phương thức giao hàng: </Text>
          <Text>ok</Text>
        </View>
        <Text style={[styles.txt_title, { fontSize: 18, textAlign: 'center', marginVertical: 24 }]}>
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
                  style={{ width: '100%', height: 176, flex: 2.2, resizeMode: 'cover' }}
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
              <TouchableOpacity style={{ paddingVertical: 16, marginVertical: 16, borderWidth: 1 }}>
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 }}>
          <Text style={[styles.txt_title, { fontSize: 14 }]}>Tổng</Text>
          <Text style={[styles.txt_title, { fontSize: 14 }]}>{formattedAmount}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default DetailMyOrder

const styles = StyleSheet.create({
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
