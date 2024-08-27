import {
  CommonActions,
  useFocusEffect,
  useIsFocused,
  useNavigation
} from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import qs from 'qs'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { formatCurrency } from 'src/contexts/StorageProvider'
import UserContext from 'src/contexts/UserContext'
import OrderHTTP from 'src/utils/http/OrderHTTP'

const MyOder = () => {
  const navigation = useNavigation()

  const { user } = useContext(UserContext)
  const [myoder, setMyoder] = useState([])
  const [transportFee, setTransportFee] = useState()
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()
  const [refresh, setRefresh] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefresh(prev => !prev)
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (navigation) {
        navigation.getParent().setOptions({
          tabBarStyle: {
            backgroundColor: Colors.white,
            bottom: 0,
            paddingVertical: 8,
            height: 54
          }
        })
      }
    }, [navigation])
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const query = { user_id: user._id }
        const queryString = qs.stringify(query)
        const res = await OrderHTTP.get(queryString)
        const reversedArray = res.reverse()
        setMyoder(reversedArray)

        if (res.amount <= 499000) {
          setTransportFee(49000)
        } else {
          setTransportFee(0)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (isFocused || refresh) {
      fetchData()
    }
  }, [isFocused, refresh, user._id])

  function resetToScreen(navigation, item) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Profile' }]
      })
    )
  }

  const handlePayPage = item => {
    resetToScreen(navigation, item)
    navigation.navigate('BagStack', {
      screen: 'PayPage',
      params: { orders: item }
    })
  }

  const renderOrder = ({ item }) => {
    const { carts, amount, status, created_at } = item
    const formattedCurrency = formatCurrency(amount)
    return (
      <View
        style={{ marginVertical: 8, padding: 16, backgroundColor: Colors.white, paddingBottom: 32 }}
      >
        {status === '00' && <Text style={[styles.txt_title, { fontSize: 16 }]}>Đã thanh toán</Text>}
        {status === '04' && <Text style={[styles.txt_title, { fontSize: 16 }]}>Đã hủy</Text>}
        {status === '01' && (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text style={[styles.txt_title, { fontSize: 14 }]}>Đang chờ thanh toán</Text>
            <TouchableOpacity onPress={() => handlePayPage(item)}>
              <Text style={[styles.txt_title, { borderBottomWidth: 1 }]}>Thanh toán ngay</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ marginVertical: 8 }}>
          <Text
            style={[
              styles.txt_description,
              status === '04'
                ? { fontSize: 12, textDecorationLine: 'line-through' }
                : { fontSize: 12, textDecorationLine: 'none' }
            ]}
          >
            {created_at}
          </Text>
          <View style={{ height: 4 }} />
          <Text
            style={[
              styles.txt_description,
              status === '04'
                ? { fontSize: 12, textDecorationLine: 'line-through' }
                : { fontSize: 12, textDecorationLine: 'none' }
            ]}
          >
            {formattedCurrency}
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 16 }}
        >
          {carts.map((orderCarts, index) => (
            <View key={index}>
              <Image
                style={{ width: 104, height: 144, resizeMode: 'cover', marginStart: 8 }}
                source={{ uri: orderCarts.image }}
              />
            </View>
          ))}
        </ScrollView>
        <Text style={[styles.txt_title, { fontSize: 12, marginVertical: 8 }]}>
          {carts.length} sản phẩm
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('DetailMyOrder', { myOrder: item })}>
          <Text style={styles.txt_title}>XEM ĐƠN HÀNG</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const noOrder = () => (
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
        <MyText style={{ textAlign: 'center', fontSize: 14, padding: 16 }}>
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

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 16,
          alignItems: 'center',
          width: '100%',
          backgroundColor: Colors.grayBg
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
          width: '100%',
          backgroundColor: Colors.white
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
          <Text style={[styles.txt_title, { textAlign: 'center' }]}>
            Trực tuyến ({myoder.length})
          </Text>
        </View>
        <View style={{ flex: 1, width: '100%', borderBottomWidth: 0, paddingVertical: 16 }}>
          <Text style={[styles.txt_title, { textAlign: 'center' }]}>Tại cửa hàng (0)</Text>
        </View>
      </View>

      {loading ? (
        <LinearGradient
          colors={[Colors.transparent08, Colors.transparent06, Colors.transparent08]}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            bottom: 0,
            top: 0,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.red} />
          </View>
        </LinearGradient>
      ) : (
        <View style={{ padding: 16, height: '100%' }}>
          {myoder.length > 0 ? (
            <FlatList data={myoder} renderItem={renderOrder} showsVerticalScrollIndicator={false} />
          ) : (
            noOrder()
          )}
          <View style={{ height: 94 }} />
        </View>
      )}
    </View>
  )
}

export default MyOder

const styles = StyleSheet.create({
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
    flex: 1,
    backgroundColor: Colors.grayBg
  }
})
