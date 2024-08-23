import { CommonActions, useNavigation } from '@react-navigation/native'
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
import { formatCurrency } from 'src/contexts/StorageProvider'
import UserContext from 'src/contexts/UserContext'
import OrderHTTP from 'src/utils/http/OrderHTTP'
const windowWith = Dimensions.get('window').width
const PayPage = props => {
  const {
    route: {
      params: { orders }
    }
  } = props

  const navigation = useNavigation()
  const { user } = useContext(UserContext)
  const [shipping, setshipping] = useState({})
  const [shippingFee, setshippingFee] = useState(0)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  function resetToScreen(navigation) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Vị trí của màn hình bạn muốn hiển thị sau khi reset
        routes: [{ name: 'BagPage' }] // Tên của màn hình mà bạn muốn điều hướng đến
      })
    )
  }
  const goBack = async () => {
    if (orders.status === '03') {
      const res = await OrderHTTP.remove(orders._id)
      console.log('Đã xóa hóa đơn tạm')
    }

    // Quay trở lại màn hình trước đó
    resetToScreen(navigation)

    // Cập nhật lại tabBarStyle của parent (nếu cần thiết)
    navigation.getParent().setOptions({
      tabBarStyle: {
        backgroundColor: Colors.white,
        bottom: 0,
        paddingVertical: 8,
        height: 54
      }
    })
  }

  useEffect(() => {
    const fetchData = () => {
      if (user) {
        user.shipping.map(item => {
          if (item.selected == true) {
            setshipping(item)
          }
        })
        if (orders.carts.length === 0) {
          goBack()
        } else {
          navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
        }
        if (orders.amount < 499000) {
          setshippingFee(49000)
        } else {
          setshippingFee(0)
        }
      }
    }
    fetchData()
  }, [orders])

  const allBasePrices = orders.carts.map(item => {
    const ok = item.base_price * item.quantity

    return ok
  })

  const totalBasePrice = sumBasePrices(allBasePrices)
  function sumBasePrices(allBasePrices) {
    let total = 0
    for (const price of allBasePrices) {
      total += price
    }
    return total
  }
  console.log(totalBasePrice)

  // format phí ships
  const formattedShippingFee = formatCurrency(shippingFee)
  // format giá trị đơn hàng
  const formattedValueOfOrders = formatCurrency(totalBasePrice)
  // format thành tiền
  const formattedTotalPrices = formatCurrency(orders.amount)

  const showToastDeleted = title => {
    Toast.show({
      type: 'info', // 'info' | 'error' | 'success'
      text1: 'Xóa thành công ✔',
      text2: title,
      text1Style: { fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: Colors.green },
      text2Style: { fontSize: 12, color: Colors.black, fontFamily: 'Montserrat-SemiBold' }
      //  text2: 'Đây là một cái gì đó '
    })
  }

  // Logic: onClick delete Item from List
  const handleDeleteFromList = async (attributes_id, product_Name, item) => {
    // if (storageData) {
    //   const result = await AsyncStorage.getItem('my-cart')
    //   let storage = []
    //   if (result !== null) {
    //     storage = JSON.parse(result)
    //   }

    //   const newStorage = storage.filter(s => s.attributes_id !== attributes_id)
    //   setStorageData(newStorage)
    //   await AsyncStorage.setItem('my-cart', JSON.stringify(newStorage))
    //   let title = product_Name
    //   showToastDeleted(title)
    // } else {
    // }
    if (item) {
    }
  }

  const handleCheck = async () => {
    // try {
    //   const body = {
    //     user: user,
    //     amount: amount ? amount : totalPrices,
    //     carts: cart ? cart : storageData
    //   }
    //   const res = await OrderHTTP.insert(body)
    //   setOrder(res)

    //   return res
    // } catch (error) {
    //   // Kiểm tra phản hồi lỗi từ server
    //   console.log('Error response:', error)
    // }
    navigation.navigate( 'MyChecks', { order: orders, orderId: orders._id })
    console.log('order: ', orders)
    console.log('orderId: ', orders._id)
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
          <View style={{ backgroundColor: Colors.white }}>
            <Image
              style={{
                width: 104,
                height: 104,
                resizeMode: 'center'
              }}
              source={{ uri: image }}
            />
          </View>
        </View>
      </View>
    )
  }
  const shortlist = () => {
    return (
      <FlatList
        data={orders.carts}
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
          <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Thông tin của tôi</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ marginTop: 16 }}>
              <Text style={styles.txt_description}>{user.username}</Text>
              <Text style={[styles.txt_description, { marginTop: 8 }]}>{user.email}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileStack', { screen: 'SettingProfile' })}
            >
              <Icons.Feather name={'arrow-right'} size={24} color={Colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ backgroundColor: Colors.white, padding: 16, marginTop: 16 }}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Địa chỉ giao hàng</Text>
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
                    <Text style={[styles.txt_title, { marginStart: 8 }]}>
                      (84+) {user.phoneNumber}
                    </Text>
                  </View>
                  <View>
                    <View style={{ height: 4 }} />
                    <Text style={styles.txt_description}>{shipping.name}</Text>
                    <View style={{ height: 4 }} />
                    <Text style={styles.txt_description}>{shipping.address}</Text>
                    <View style={{ height: 4 }} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      <Text style={[styles.txt_description, { marginEnd: 4 }]}>
                        {shipping.ward}
                      </Text>
                      <Text style={[styles.txt_description, { marginEnd: 4 }]}>
                        {shipping.district}
                      </Text>
                      <Text style={[styles.txt_description, { marginEnd: 4 }]}>
                        {shipping.city}
                      </Text>
                    </View>
                    <Text style={styles.txt_description}>{shipping.zipCode}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileStack', { screen: 'MyAddress' })}
              >
                <Icons.MaterialIcons name={'navigate-next'} size={20} />
              </TouchableOpacity>
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
                  <Text style={[styles.txt_title, { fontSize: 14 }]}>Bưu kiện</Text>
                  <Text style={[styles.txt_description, { fontSize: 12, marginTop: 8 }]}>
                    {orders.carts.length} sản phẩm
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setShowOrderDetails(!showOrderDetails)}
                style={{ flexDirection: 'row' }}
              >
                <Text style={[styles.txt_description, { fontSize: 12 }]}>Chi tiết đơn hàng</Text>
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
                {shippingFee === 0 ? (
                  <Text style={[styles.txt_description]}>Miễn Phí</Text>
                ) : (
                  <Text style={[styles.txt_description]}>{formattedShippingFee}</Text>
                )}
              </View>
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 }}
          >
            <Text style={styles.txt_title}>Tổng ( {orders.carts.length} mặt hàng )</Text>
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
              style={[styles.txt_title, { fontSize: 12, textAlign: 'center', color: Colors.white }]}
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
    const { product_Name, base_price, size, color, image, code, quantity, attributes_id } = item
    const { _id } = item
    const newPrice = { ...item, newPrice: base_price * quantity }
    const formattedPriceProduct = formatCurrency(newPrice.newPrice)
    const formattedBasePriceProduct = formatCurrency(base_price)

    return (
      <SafeAreaView style={{ marginBottom: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.white,
            borderRadius: 8,
            justifyContent: 'space-between'
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
              paddingHorizontal: 8,
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
            onPress={() => handleStatusProduct(attributes_id)}
            style={{
              borderTopRightRadius: 8
            }}
          >
            {/* <TouchableOpacity
              onPress={() => handleDeleteFromList(attributes_id, product_Name, item, index)}
              style={{
                alignItems: 'center',
                width: '100%',
                padding: 16
              }}
            >
              <Icons.Feather name={'trash-2'} size={20} />
            </TouchableOpacity> */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
  // render List product
  const ListItemCart = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        data={orders.carts}
        renderItem={ItemCarts}
      />
    )
  }
  const orderDetails = () => {
    return (
      <View style={{ width: '100%', height: '100%', paddingHorizontal: 16 }}>
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
                {orders.carts.length} sản phẩm
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
        // orderDetails()
        <View>{orderDetails()}</View>
      )}
    </ScrollView>
  )
}

export default PayPage

const styles = StyleSheet.create({
  txt_description: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium'
  },
  txt_description_items: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: Colors.black,
    flex: 1
  },
  txt_title: {
    fontSize: 12,
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
