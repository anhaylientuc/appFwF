import { CommonActions, useNavigation } from '@react-navigation/native'
import qs from 'qs'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { formatCurrency } from 'src/contexts/StorageProvider'
import UserContext from 'src/contexts/UserContext'
import OrderHTTP from 'src/utils/http/OrderHTTP'

const MyOder = () => {
  const navigation = useNavigation()
  const { user } = useContext(UserContext)
  const [myoder, setmyoder] = useState([])
  const [transportFee, setTransportFee] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const query = {}
      query.user_id = user._id
      const queryString = qs.stringify(query)
      const res = await OrderHTTP.get(queryString)
      console.log(res.length)
      setmyoder(res)
      if (res.amount <= 499000) {
        setTransportFee(49000)
      } else {
        setTransportFee(0)
      }
    }
    fetchData()
  }, [navigation])

  function resetToScreen(navigation, item) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Vị trí của màn hình bạn muốn hiển thị sau khi reset
        routes: [
          {
            name: 'BagStack', // Đặt tên cho stack chứa PayPage
            params: {
              // Truyền params cho stack nếu cần thiết
              screen: 'PayPage', // Chỉ định màn hình 'PayPage' trong stack
              params: {
                orders: item // Truyền tham số 'orders' cho PayPage
              }
            }
          }
        ]
      })
    )
  }

  const handlePayPage = async item => {
    resetToScreen(navigation, item) // Reset stack và điều hướng đến 'PayPage'
    navigation.navigate('BagStack', {
      screen: 'PayPage',
      params: {
        orders: item // Truyền tham số 'orders'
      }
    })
  }

  const renderOrder = ({ item }) => {
    const { carts, amount, status } = item
    const formattedCurrency = formatCurrency(amount)
    return (
      <View
        style={{ marginVertical: 8, padding: 16, backgroundColor: Colors.white, paddingBottom: 32 }}
      >
        {status === '00' && <Text style={styles.txt_title}>Đã thanh toán</Text>}
        {status === '01' && (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text style={styles.txt_title}>Đang chờ thanh toán</Text>
            <TouchableOpacity onPress={() => handlePayPage(item)}>
              <Text style={[styles.txt_title, { borderBottomWidth: 1 }]}>Thanh toán ngay</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ marginVertical: 8 }}>
          <Text style={styles.txt_description}>{formattedCurrency}</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 16 }}
        >
          {carts.map((ordercarts, index) => (
            <View key={index}>
              <Image
                style={{ width: 104, height: 144, resizeMode: 'cover', marginStart: 8 }}
                source={{ uri: ordercarts.image }}
              />
            </View>
          ))}
        </ScrollView>
        <Text style={[styles.txt_title, { fontSize: 12, marginVertical: 8 }]}>
          {carts.length} sản phẩm
        </Text>
        <TouchableOpacity>
          <Text style={styles.txt_title}>XEM ĐƠN HÀNG</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const noOrder = () => {
    return (
      <View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 24,
              textAlign: 'center',
              padding: 16
            }}
          >
            Hiện tại không có lượt mua sắm nào để hiển thị
          </Text>
          <MyText
            style={{
              textAlign: 'center',
              fontSize: 14,
              textAlign: 'center',
              padding: 16
            }}
          >
            Khi mua một sản phẩm trực tuyến, bạn sẽ thấy sản phẩm đó ở đây.
          </MyText>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: Colors.black, margin: 24 }}
          onPress={() => navigation.navigate('HomeStack')}
        >
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
              textAlign: 'center',
              padding: 16,
              color: Colors.white
            }}
          >
            Bắt đầu khám phá
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 16,
            alignItems: 'center',
            width: '100%'
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons.AntDesign name="arrowleft" size={24} style={{ flex: 1 }} />
          </TouchableOpacity>
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{ marginStart: 16, fontSize: 20, textAlign: 'center', flex: 2 }}
          >
            Đơn hàng của tôi
          </MyText>
          <View style={{ flex: 1 }} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            width: '100%'
          }}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              borderBottomWidth: 2,
              paddingVertical: 16,
              borderBlockColor: Colors.red
            }}
          >
            <Text style={{ textAlign: 'center' }}>Trực tuyến ({myoder.length})</Text>
          </View>
          <View style={{ flex: 1, width: '100%', borderBottomWidth: 0, paddingVertical: 16 }}>
            <Text style={{ textAlign: 'center' }}>Tại cửa hàng (0)</Text>
          </View>
        </View>

        {myoder.length === 0 ? (
          noOrder()
        ) : (
          <View style={{ padding: 16, height: '100%' }}>
            <FlatList data={myoder} renderItem={renderOrder} showsVerticalScrollIndicator={false} />
            <View style={{ height: 94 }} />
          </View>
        )}
      </View>
    </View>
  )
}

export default MyOder

const styles = StyleSheet.create({
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
