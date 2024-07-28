import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Toast from 'react-native-toast-message'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { formatCurrency, useStorage } from 'src/contexts/StorageProvider'
import UserContext from 'src/contexts/UserContext'
import OrderHTTP from 'src/utils/http/OrderHTTP'
const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const PayPage = props => {
  const {
    route: {
      params: { shippingFee }
    }
  } = props
  const navigation = useNavigation()
  const { storageData, setStorageData } = useStorage()
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const goBack = () => {
    navigation.goBack()
  }
  const { user } = useContext(UserContext)

  const allBasePrices = storageData.map(item => item.newPrice)
  const totalBasePrice = sumBasePrices(allBasePrices)
  console.log(totalBasePrice)
  function sumBasePrices(allBasePrices) {
    let total = 0
    for (const price of allBasePrices) {
      total += price
    }
    // const newStorage = { ...storageData, total: total, intoMoney: total + transportFee }
    // console.log(JSON.stringify(newStorage, null, 2))
    return total
  }

  // thành tiền
  const totalPrices = totalBasePrice + shippingFee

  // format phí ships
  const formattedShippingFee = formatCurrency(shippingFee)
  // format giá trị đơn hàng
  const formattedValueOfOrders = formatCurrency(totalBasePrice)
  // format thành tiền
  const formattedTotalPrices = formatCurrency(totalPrices)

  const [order, setOrder] = useState(null)
  const [shippingAddress, setShippingAddress] = useState('')

  const setBottomBar = () => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        backgroundColor: Colors.white,
        bottom: 0,
        paddingVertical: 8,
        height: 54
        // position: 'absolute'
      }
    })
  }
  useEffect(() => {
    if (storageData.length === 0) {
      goBack()
    } else {
      navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
    }

    setShippingAddress('143 Đào Duy Anh, Phường 9 Phú Phuận')
    setOrder({
      ...order,
      amount: totalPrices,
      carts: storageData,
      user: user
      // shipping: { shippingAddress }
    })
  }, [storageData])

  const showToastDeleted = title => {
    Toast.show({
      type: 'info', // 'info' | 'error' | 'success'
      text1: 'Xóa sản phẩm thành công ✔',
      // text2: title + ' đã được xóa khỏi giỏ hàng',
      text1Style: { fontSize: 12, fontFamily: 'Montserrat-SemiBold', color: Colors.green },
      text2Style: { fontSize: 12, color: Colors.black, fontFamily: 'Montserrat-SemiBold' }
      //  text2: 'Đây là một cái gì đó '
    })
  }

  // Logic: onClick delete Item from List
  const handleDeleteFromList = async (attributes, product_Name) => {
    const result = await AsyncStorage.getItem('my-cart')
    let storage = []
    if (result !== null) {
      storage = JSON.parse(result)
    }

    const newStorage = storage.filter(s => s.attributes !== attributes)
    setStorageData(newStorage)
    await AsyncStorage.setItem('my-cart', JSON.stringify(newStorage))
    let title = product_Name
    showToastDeleted(title)
  }

  const handleCheck = async () => {
    try {
      const body = {
        carts: storageData,
        user: user,
        amount: totalPrices
      }
      const res = await OrderHTTP.insert(body)
      console.log('>>>>', res)
      setOrder(res)
      navigation.navigate('MyChecks', { order: order })
      return res
    } catch (error) {
      // Kiểm tra phản hồi lỗi từ server
      console.log('Error response:', error)
    }
  }

  const itemShortList = ({ item, index }) => {
    const { image, attributes_id } = item

    return (
      <View style={{ marginTop: 16, marginHorizontal: 8 }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.white,
            borderRadius: 8
          }}
        >
          <View style={{ backgroundColor: Colors.grayBg }}>
            <Image
              style={{
                width: 104,
                height: 104,
                resizeMode: 'cover'
              }}
              source={{ uri: image }}
            />
            <TouchableOpacity
              onPress={() => console.log(attributes_id)}
              style={{
                position: 'absolute',
                bottom: 4,
                right: 4,
                backgroundColor: Colors.white,
                padding: 4,
                borderRadius: 50
              }}
            >
              <Icons.Feather name="trash-2" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  const shortlist = () => {
    return (
      <FlatList
        data={storageData}
        renderItem={itemShortList}
        scrollEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    )
  }

  // trường hợp có user
  const hasUser = () => {
    return (
      <View>
        <View style={{ backgroundColor: Colors.white, padding: 16 }}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>Thông tin của tôi</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ marginTop: 16 }}>
              <Text style={styles.txt_description}>{user.username}</Text>
              <Text style={[styles.txt_description, { marginTop: 8 }]}>{user.email}</Text>
            </View>
            <Icons.Feather name={'arrow-right'} size={24} color={Colors.black} />
          </View>
        </View>
        {/* <View style={{ backgroundColor: Colors.white, padding: 16, marginTop: 16 }}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>
            Địa chỉ thanh toán
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: Colors.black, padding: 16, marginVertical: 16 }}
          >
            <Text
              style={[
                styles.txt_description,
                {
                  textAlign: 'center',
                  color: Colors.white,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 14
                }
              ]}
            >
              Chọn
            </Text>
          </TouchableOpacity>
        </View> */}
        <View style={{ backgroundColor: Colors.white, padding: 16, marginTop: 16 }}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>Địa chỉ giao hàng</Text>
          {!user ? (
            <TouchableOpacity
              style={{ backgroundColor: Colors.black, padding: 16, marginVertical: 16 }}
            >
              <Text
                style={[
                  styles.txt_description,
                  {
                    textAlign: 'center',
                    color: Colors.white,
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 14
                  }
                ]}
              >
                Chọn
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 16,
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Icons.Ionicons name="location-outline" size={24} />
                <View style={{ marginStart: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.txt_title}>{user.username}</Text>
                    <Text style={[styles.txt_title, { marginStart: 8 }]}>(+84)988002974</Text>
                  </View>
                  <Text>143 Đào Duy Anh</Text>
                  <Text>Phường 9, Phú Nhuận, Hồ Chí Minh, Việt Nam</Text>
                </View>
              </View>
              <Icons.MaterialIcons name={'navigate-next'} size={20} />
            </View>
          )}
        </View>
        <View
          style={{
            padding: 16,
            backgroundColor: Colors.white,
            marginVertical: 16
          }}
        >
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Icons.Feather name={'box'} size={24} />
                <View style={{ marginStart: 16 }}>
                  <Text style={[styles.txt_title, { fontSize: 16 }]}>Bưu kiện</Text>
                  <Text style={[styles.txt_description, { fontSize: 12, marginTop: 8 }]}>
                    {storageData.length} sản phẩm
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setShowOrderDetails(!showOrderDetails)}
                style={{ flexDirection: 'row' }}
              >
                <Text style={[styles.txt_description, { fontSize: 14 }]}>Chi tiết đơn hàng</Text>
                <Icons.MaterialIcons name={'navigate-next'} size={20} style={{ marginStart: 8 }} />
              </TouchableOpacity>
            </View>
            {shortlist()}
          </View>
        </View>

        <View style={{ padding: 16, backgroundColor: Colors.white }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderColor: Colors.gray,
              paddingVertical: 16
            }}
          >
            <Text style={styles.txt_description}>Giá giảm</Text>
            <View>
              <Text
                style={[
                  styles.txt_description,
                  {
                    fontFamily: 'Montserrat-SemiBold',
                    borderBottomWidth: 1,
                    borderColor: Colors.black
                  }
                ]}
              >
                Thêm mã giảm giá
              </Text>
            </View>
          </View>
          <View style={{ borderBottomWidth: 1, borderColor: Colors.black }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 16
              }}
            >
              <Text style={styles.txt_description}>Giá trị đơn hàng</Text>
              <View>
                <Text style={[styles.txt_description]}>{formattedValueOfOrders}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 16
              }}
            >
              <Text style={styles.txt_description}>Phí vận chuyển</Text>
              <View>
                <Text style={[styles.txt_description]}>{formattedShippingFee}</Text>
              </View>
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 }}
          >
            <Text style={styles.txt_title}>Tổng ( {storageData.length} mặt hàng )</Text>
            <Text style={styles.txt_title}>{formattedTotalPrices}</Text>
          </View>
          <Text style={[styles.txt_description, { fontSize: 10 }]}>
            Bằng cách chọn "Hoàn Tất Ngay" phía bên dưới để đặt hàng, bạn đồng ý với các nội dung
            quy định và điều khoản chung của FwF
          </Text>
          <Text style={[styles.txt_description, { marginTop: 16, fontSize: 10 }]}>
            Bạn cũng đồng thời đồng ý với điều Khoản Bảo Mật của FwF và cho phép FwF chia sẻ, tiết
            lộ, chuyển giao thông tin cá nhân của tài khoản cho bên thứ ba theo điều khoản bảo mật
            của FwF
          </Text>
          <TouchableOpacity
            onPress={() => handleCheck()}
            style={{ padding: 16, backgroundColor: Colors.black, marginTop: 28 }}
          >
            <Text
              style={[styles.txt_title, { fontSize: 16, textAlign: 'center', color: Colors.white }]}
            >
              Hoàn tất thanh toán
            </Text>
          </TouchableOpacity>
          <Text style={[styles.txt_title, { marginTop: 28 }]}>Chăm sóc khách hàng</Text>
          <Text style={[styles.txt_description, { fontSize: 10 }]}>
            Bạn cần hỗ trợ?Vui lòng liên hệ với bộ phận chăm sóc khách hàng
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ReturnMethod')}
          style={{
            marginTop: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.white,
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icons.Feather name={'box'} size={24} />
            <Text style={[styles.txt_description, { marginStart: 16, fontSize: 10 }]}>
              Giao hàng và chọn phương thức đổi trả
            </Text>
          </View>
          <Icons.MaterialIcons name={'navigate-next'} size={24} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16
          }}
        >
          <Icons.MaterialIcons name="lock-outline" size={20} />
          <Text style={[styles.txt_description, { textAlign: 'center', fontSize: 10 }]}>
            Tất cả dữ liệu sẽ được mã hóa
          </Text>
        </View>
      </View>
    )
  }

  // không có user bắt đăng nhập
  const noUser = () => {
    return (
      <View style={{ padding: 16, backgroundColor: Colors.white, flex: 1 }}>
        <Text style={[styles.txt_title, { fontSize: 18 }]}>
          Bạn cần đăng nhập để tiếp tục thanh toán
        </Text>
        <Text style={[styles.txt_description, { marginTop: 16 }]}>
          Đăng nhập vào tài khoản của bạn muốn sử dụng khi thanh toán và chúng tôi sẽ kiểm tra bạn
          tài khoản của bạn có được liên kết với địa chỉ bạn cung cấp hay không
        </Text>
        <Text style={[styles.txt_description, { marginTop: 16 }]}>Đăng nhập ngay bây giờ *</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserNavigation', { screen: 'Login' })}
          style={{ backgroundColor: Colors.black, padding: 16, marginVertical: 16 }}
        >
          <Text
            style={[
              styles.txt_description,
              {
                textAlign: 'center',
                color: Colors.white,
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 14
              }
            ]}
          >
            Đăng Nhập
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const ItemCarts = ({ item, index }) => {
    const { product_Name, base_price, size, color, image, code, quantity, attributes } = item
    const newPrice = { ...item, newPrice: base_price * quantity }
    const formattedPriceProduct = formatCurrency(newPrice.newPrice)
    const formattedBasePriceProduct = formatCurrency(base_price)

    return (
      <SafeAreaView style={{ marginBottom: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.white,
            borderRadius: 8
          }}
        >
          <TouchableWithoutFeedback onPress={() => handlePressProductItem(item)}>
            <Image
              style={{
                width: 104,
                height: '100%',
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8
              }}
              source={{ uri: image }}
            />
          </TouchableWithoutFeedback>

          <View
            style={{
              width: windowWith / 2,
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: Colors.white
            }}
          >
            <Text style={[styles.txt_title, { fontSize: 14 }]}>{product_Name}</Text>
            <Text style={[styles.txt_description, { fontSize: 14, marginTop: 4 }]}>
              {formattedBasePriceProduct}
            </Text>
            <View
              style={{
                flexDirection: 'column',
                marginVertical: 8,
                justifyContent: 'space-between',
                flex: 1
              }}
            >
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                  <Text style={styles.txt_description_items}>Mã số :</Text>
                  <Text numberOfLines={1} style={styles.txt_description_items}>
                    {code}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.txt_description_items}>Màu sắc</Text>
                  <Text numberOfLines={1} style={styles.txt_description_items}>
                    {color}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.txt_description_items}>Size</Text>
                  <Text fontFamily={'Montserrat-SemiBold'} style={styles.txt_description_items}>
                    {size}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.txt_description_items}>Số lượng</Text>
                  <Text style={styles.txt_description_items}>{quantity}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.txt_description_items}>Tổng</Text>
                  <Text style={[styles.txt_description_items]}>{formattedPriceProduct}</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleStatusProduct(attributes)}
            style={{
              borderTopRightRadius: 8
            }}
          >
            <TouchableOpacity
              // onPress={() => handleDeleteFromList(attributes, product_Name)}
              onPress={() => handleDeleteFromList(attributes, product_Name)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                width: '100%',
                padding: 16
              }}
            >
              <Icons.Feather name={'trash-2'} size={20} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
  // render List product
  const ListItemCart = () => {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={storageData}
          renderItem={ItemCarts}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Colors.white,
            marginTop: 24,
            padding: 12,
            elevation: 2,
            shadowColor: Colors.gray
          }}
        ></View>
      </View>
    )
  }
  const orderDetails = () => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16 }}>
          <TouchableOpacity onPress={() => setShowOrderDetails(!showOrderDetails)}>
            <Icons.Feather name="x" size={32} />
          </TouchableOpacity>
          <Text style={[styles.txt_title, { marginStart: 16, fontSize: 20 }]}>
            Chi tiết đơn hàng
          </Text>
        </View>
        <View style={{ height: 8 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Icons.Feather name={'box'} size={24} />
            <View style={{ marginStart: 16 }}>
              <Text style={[styles.txt_title, { fontSize: 16 }]}>Bưu kiện</Text>
              <Text style={[styles.txt_description, { fontSize: 12, marginTop: 8 }]}>
                {storageData.length} sản phẩm
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.txt_description, { fontSize: 14 }]}>Vận chuyển bởi</Text>
            <Text style={[styles.txt_title, { marginStart: 8 }]}>FwF</Text>
          </View>
        </View>
        <View style={{ height: 16 }} />
        {ListItemCart()}
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {!showOrderDetails ? (
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => goBack()}>
              <Icons.Ionicons name={'arrow-back-sharp'} size={24} color={Colors.black} />
            </TouchableOpacity>
            <MyText fontFamily={'Montserrat-SemiBold'} style={{ marginStart: 16, fontSize: 16 }}>
              Thanh toán
            </MyText>
          </View>
          {user ? hasUser() : noUser()}
        </View>
      ) : (
        orderDetails()
      )}
    </ScrollView>
  )
}

export default PayPage

const styles = StyleSheet.create({
  txt_description: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium'
  },
  txt_description_items: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: Colors.black,
    flex: 1
  },
  txt_title: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold'
  },

  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.grayBg
  }
})
