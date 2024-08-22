import BottomSheet from '@devvie/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useContext, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Toast from 'react-native-toast-message'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { formatCurrency, useStorage } from 'src/contexts/StorageProvider'
import OrderHTTP from 'src/utils/http/OrderHTTP'
import UserContext from '../../../contexts/UserContext'
import Icons from '../../icons/Icon'
const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const BagPage = props => {
  const { user } = useContext(UserContext)
  const sheetRef = useRef(null)
  const navigation = useNavigation()
  const { storageData, setStorageData } = useStorage()
  const { storageFavorites, setStorageFavorites } = useStorage()
  const [selected, setSelected] = useState(DataCodeSale)
  const [selectedCodeSale, setSelectedCodeSale] = useState()
  const [myOrder, setMyOrder] = useState(null)
  const [visiblePopupMenu, setVisiblePopupMenu] = useState(null)
  const [addFavorite, setAddFavorite] = useState(null)
  const [price, setPrice] = useState()
  const [transportFee, setTransportFee] = useState('')
  const [cart, setCart] = useState([])
  const [favoritesIds, setFavoritesIds] = useState([])
  const [oderUser, setoderUser] = useState([])

  const setBottomBar = () => {
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
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('my-favorites')
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites)
        setFavoritesIds(favorites.map(favorite => favorite._id))
      }
    }
    loadFavorites()
  }, [storageFavorites, navigation])
  // duyệt mảng lấy tất cả giá tiền
  const allBasePrices = storageData.map(item => item.newPrice)
  const totalBasePrice = sumBasePrices(allBasePrices)
  // tính tổng cần thanh toán -> { tổng giá trị đơn hàng + phí ship }
  const totalPrices = totalBasePrice + transportFee

  useEffect(() => {
    const fetchData = () => {
      if (user) {
        const shippingOrder = user.shipping.filter(s => s.selected === true)
        setoderUser({ ...user, shipping: shippingOrder })
      }

      setCart(...storageData)
      setPrice(totalBasePrice)
      if (totalBasePrice < 499000) {
        setTransportFee(49000)
      } else {
        setTransportFee(0)
      }
      const filteredData = storageData.map(item => {
        const { attributes, ...rest } = item // Loại bỏ thuộc tính 'attributes'
        return rest // Trả về đối tượng mới mà không có 'attributes'
      })

      setMyOrder({
        ...myOrder,
        user: oderUser,
        carts: filteredData,
        amount: totalPrices
      })
    }
    fetchData()
  }, [storageData])

  const showToastDeleted = title => {
    Toast.show({
      type: 'info', // 'info' | 'error' | 'success'
      text1: 'Xóa sản phẩm ✔',
      text2: title,
      text1Style: { fontSize: 16, fontFamily: 'Montserrat-SemiBold', color: Colors.green },
      text2Style: { fontSize: 12, color: Colors.black, fontFamily: 'Montserrat-SemiBold' }
      //  text2: 'Đây là một cái gì đó '
    })
  }

  const showToastSuccess = title => {
    Toast.show({
      type: 'success', // 'info' | 'error' | 'success'
      text1: 'Thêm vào yêu thích ✔',
      text2: '' + title,
      text1Style: { fontSize: 16, fontFamily: 'Montserrat-SemiBold', color: Colors.green },
      text2Style: { fontSize: 12, color: Colors.black, fontFamily: 'Montserrat-SemiBold' },
      //  text2: 'Đây là một cái gì đó '
      onPress: () => {
        navigation.navigate('FavoriteStack')
        setBottomBar()
      }
    })
  }

  const showToastError = title => {
    Toast.show({
      type: 'error', // 'info' | 'error' | 'success'
      text1: 'Thông báo ♲',
      text2: title,
      text1Style: { fontSize: 16, fontFamily: 'Montserrat-SemiBold', color: Colors.red },
      text2Style: { fontSize: 12, color: Colors.black, fontFamily: 'Montserrat-SemiBold' }
      //  text2: 'Đây là một cái gì đó '
    })
  }

  // onClick title itemProduct set attributes_id
  const handleStatusProduct = attributes_id => {
    // set attributes_id to PopupMenu
    setVisiblePopupMenu(attributes_id)
  }

  // Example usage
  // đơn giá
  const formattedCurrency = formatCurrency(price)
  // phí ship
  const formattedTransportfee = formatCurrency(transportFee)
  // thành tiền
  const formattedTotalPrices = formatCurrency(totalPrices)

  // hàm tính tổng các giá trị đơn hàng
  function sumBasePrices(allBasePrices) {
    let total = 0
    for (const price of allBasePrices) {
      total += price
    }

    return total
  }

  const handlePayPage = async () => {
    try {
      const filteredData = storageData.map(item => {
        const { attributes, ...rest } = item // Loại bỏ thuộc tính 'attributes'
        return rest // Trả về đối tượng mới mà không có 'attributes'
      })

      const body = {
        user: oderUser,
        carts: filteredData,
        amount: totalPrices
      }
      const res = await OrderHTTP.insert(body)
      setMyOrder(res)
      navigation.navigate('PayPage', { orders: res })

      return res
    } catch (error) {
      // Kiểm tra phản hồi lỗi từ server
      // console.log('Error response:', error)
    }
  }

  // Logic: onclick Open Bottom Sheet Modal
  const handlePresentModal = () => {
    sheetRef.current?.open()
    setTimeout(() => {}, 300)
  }

  // Logic: onclick item code sale
  const handleSelectCodeSale = (item, index) => {
    const updatedSelected = [...selected]

    const updatedItem = updatedSelected.find(selectedItem => selectedItem.id === item.id)
    if (updatedItem) {
      updatedItem.selected = true
    }
    const selectedCodeSale = updatedItem.code_saleOff
    // Update state with the modified array
    setSelected(updatedSelected)
    setSelectedCodeSale(selectedCodeSale)
  }

  // PopupMenu

  const handleAddFavorites = async item => {
    const {
      _id,
      image,
      product_Name,
      base_price,
      color,
      product_id,
      category_id,
      code,
      discount_price,
      nameCategoryById,
      attributes
    } = item
    const newFavoritesProduct = {
      _id: _id,
      image: image,
      product_id: product_id,
      product_Name: product_Name,
      color: color,
      category_id: category_id,
      code: code,
      base_price: base_price,
      discount_price: discount_price,
      nameCategoryById: nameCategoryById,
      attributes: attributes
    }

    // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích chưa
    const isDuplicate = storageFavorites.some(favorite => favorite._id === _id)
    if (!isDuplicate) {
      const updateFavorites = [...storageFavorites, newFavoritesProduct]
      setStorageFavorites(updateFavorites)
      await AsyncStorage.setItem('my-favorites', JSON.stringify(updateFavorites))
      handleDeleteFromList(product_Name, _id)
    } else {
      handleDeleteFromList(product_Name, _id)
    }
  }

  // Logic: onClick delete Item from List
  const handleDeleteFromList = async (product_Name, _id) => {
    const result = await AsyncStorage.getItem('my-cart')
    let storage = []
    if (result !== null) {
      storage = JSON.parse(result)
    }

    const newStorage = storage.filter(s => s.attributes_id !== visiblePopupMenu)
    setStorageData(newStorage)
    await AsyncStorage.setItem('my-cart', JSON.stringify(newStorage))
    let title = product_Name
    if (_id) {
      showToastSuccess(title)
    } else showToastDeleted(title)
  }

  // Menu popup Item
  const popupMenu = item => {
    const { product_Name } = item

    return (
      <View
        style={{
          backgroundColor: Colors.white,
          elevation: 16,
          shadowColor: Colors.black,
          right: 32,
          position: 'absolute',
          borderRadius: 8,
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          onPress={() => handleAddFavorites(item)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: 16
          }}
        >
          <View>
            {addFavorite ? (
              <Icons.MaterialIcons name={'favorite'} size={24} color={Colors.red} />
            ) : (
              <Icons.MaterialIcons name={'favorite-border'} size={24} />
            )}
          </View>

          <MyText style={{ textAlign: 'center', flex: 1, fontSize: 12 }}>Yêu thích</MyText>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.5,
            width: '100%',
            borderColor: Colors.gray
          }}
        />
        <TouchableOpacity
          onPress={() => handleDeleteFromList(product_Name)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: 16
          }}
        >
          <Icons.Feather name={'trash-2'} size={24} />

          <MyText style={{ textAlign: 'center', marginStart: 8, fontSize: 12 }}>
            Xóa khỏi danh sách
          </MyText>
        </TouchableOpacity>
      </View>
    )
  }

  // No cart to Bag
  const noCart = () => {
    return (
      <View>
        <View style={{ backgroundColor: Colors.white, paddingHorizontal: 16 }}>
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{
              textAlign: 'center',
              padding: 24,
              fontSize: 16,
              fontWeight: '600'
            }}
          >
            Không có sản phẩm trong giỏ hàng của bạn
          </MyText>

          {!user ? (
            <TouchableOpacity
              style={{ backgroundColor: Colors.black2, paddingVertical: 16 }}
              onPress={() => navigation.navigate('UserNavigation', { screen: 'Login' })}
            >
              <Text
                style={{
                  color: Colors.white,
                  textAlign: 'center',
                  fontSize: 14,
                  fontFamily: 'Montserrat-SemiBold'
                }}
              >
                Đăng Nhập
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {!user ? (
          <View>
            <MyText style={{ textAlign: 'left', marginTop: 16, marginHorizontal: 16 }}>
              Đăng nhập để sử dụng các ưu đãi cá nhân!
            </MyText>
            <View
              style={{
                paddingVertical: 24,
                marginHorizontal: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <MyText
                style={{
                  backgroundColor: Colors.gray,
                  flex: 1,
                  height: 1,
                  textAlign: 'center'
                }}
              />
              <MyText style={{ textAlign: 'center', marginHorizontal: 10 }}>Hoặc</MyText>
              <MyText
                style={{
                  backgroundColor: Colors.gray,
                  flex: 1,
                  height: 1,
                  textAlign: 'center'
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserNavigation', { screen: 'Register' })}
              style={{
                backgroundColor: Colors.white,
                paddingVertical: 16,
                marginHorizontal: 16,
                borderWidth: 1
              }}
            >
              <Text
                style={{
                  color: Colors.black,
                  textAlign: 'center',
                  fontSize: 14,
                  fontFamily: 'Montserrat-SemiBold'
                }}
              >
                Tạo tài khoản mới
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    )
  }

  const handlePlus = item => {
    const { quantity, attributes_id, cnt, base_price } = item
    const newQuantity = quantity + 1
    const newPrice = base_price * newQuantity
    const newStorageData = storageData.map((val, index) => {
      if (val.attributes_id === attributes_id && newQuantity < val.cnt) {
        return {
          ...val,
          quantity: newQuantity,
          base_price: base_price,
          newPrice: newPrice
        }
      } else {
        if (newQuantity == cnt) {
          let title = 'Chọn tối đa ' + cnt
          showToastError(title)
        }
        return val
      }
    })
    setStorageData(newStorageData)
  }

  // Số lượng giảm
  const handleMinus = item => {
    const { quantity, attributes_id, cnt, base_price } = item
    const newQuantity = quantity - 1
    let newPrice = base_price * newQuantity
    const newStorageData = storageData.map((val, index) => {
      if (val.attributes_id === attributes_id && newQuantity >= 1) {
        return { ...val, quantity: newQuantity, base_price: base_price, newPrice: newPrice }
      } else {
        if (newQuantity < 1) {
          let title = 'Chọn tối thiểu 1'
          showToastError(title)
        }
        return val
      }
    })
    setStorageData(newStorageData)
  }

  const handleClickItem = item => {
    const { _id, product_id } = item
    navigation.navigate('ProductDetail', {
      _id: _id,
      product_id: product_id
    })
  }

  const ItemCart = ({ item, index }) => {
    const { product_Name, base_price, size, color, image, quantity, attributes_id } = item
    const priceProduct = base_price
    const newPrice = { ...item, newPrice: base_price * quantity }
    const formattedPriceProduct = formatCurrency(newPrice.newPrice)

    return (
      <TouchableOpacity onPress={() => handleClickItem(item)}>
        <SafeAreaView style={{ marginBottom: 24 }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.white,
              borderRadius: 8,
              marginHorizontal: 16
            }}
          >
            <Image
              style={{
                width: 104,
                height: '100%',
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8
              }}
              source={{ uri: image }}
            />

            <View
              style={{
                flex: 1,
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: Colors.white
              }}
            >
              <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_price}>
                {product_Name}
              </MyText>
              <View
                style={{
                  flexDirection: 'column',
                  marginVertical: 8,
                  justifyContent: 'space-between'
                }}
              >
                <View style={{ flexDirection: 'row', width: windowWith / 2.2 }}>
                  <MyText
                    fontFamily={'Montserrat-SemiBold'}
                    style={{ color: Colors.gray, fontSize: 12 }}
                  >
                    Màu sắc:
                  </MyText>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: Colors.black,
                      marginStart: 8,
                      fontWeight: '500',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12
                    }}
                  >
                    {color}
                  </Text>
                </View>
                <View style={{ height: 8 }} />
                <View
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  <MyText
                    fontFamily={'Montserrat-SemiBold'}
                    style={{ color: Colors.gray, fontSize: 12 }}
                  >
                    Size:
                  </MyText>
                  <MyText
                    fontFamily={'Montserrat-SemiBold'}
                    style={{ color: Colors.black, marginStart: 8, fontSize: 12 }}
                  >
                    {size}
                  </MyText>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 16
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handlePlus(item, priceProduct)}
                    style={{
                      padding: 6,
                      backgroundColor: Colors.white,
                      borderRadius: 50,
                      elevation: 8,
                      shadowColor: Colors.gray
                    }}
                  >
                    <Icons.AntDesign name={'plus'} size={18} />
                  </TouchableOpacity>
                  <MyText
                    fontFamily={'Montserrat-SemiBold'}
                    style={{ textAlign: 'center', marginHorizontal: 16, fontSize: 12 }}
                  >
                    {quantity}
                  </MyText>
                  <TouchableOpacity
                    onPress={() => handleMinus(item)}
                    style={{
                      padding: 6,
                      backgroundColor: Colors.white,
                      borderRadius: 50,
                      elevation: 8,
                      shadowColor: Colors.gray
                    }}
                  >
                    <Icons.AntDesign name={'minus'} size={18} />
                  </TouchableOpacity>
                </View>
                <MyText style={{ fontSize: 12, fontWeight: '500' }}>{formattedPriceProduct}</MyText>
              </View>
              {visiblePopupMenu === attributes_id ? popupMenu(item) : null}
            </View>
            <TouchableOpacity
              onPress={() => handleStatusProduct(attributes_id)}
              style={{
                borderTopRightRadius: 8
              }}
            >
              {visiblePopupMenu === attributes_id ? (
                <TouchableOpacity onPress={() => setVisiblePopupMenu(!visiblePopupMenu)}>
                  <Icons.Feather
                    name={'x'}
                    size={18}
                    color={Colors.red}
                    style={{
                      position: 'absolute',
                      right: 0,
                      padding: 8,
                      borderTopRightRadius: 8
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <Icons.Entypo
                  name={'dots-three-vertical'}
                  size={18}
                  color={Colors.gray}
                  style={{
                    position: 'absolute',
                    right: 0,
                    padding: 8,
                    borderTopRightRadius: 8
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
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
          renderItem={ItemCart}
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
        >
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{
              marginStart: 8,
              color: Colors.black,
              fontWeight: '600',
              fontSize: 12
            }}
          >
            Mã giảm giá:
          </MyText>

          {!selectedCodeSale ? (
            <TouchableOpacity onPress={() => handlePresentModal()}>
              <MyText
                style={{
                  color: Colors.black,
                  fontWeight: '600',
                  fontSize: 12,
                  borderBottomWidth: 1,
                  fontSize: 12
                }}
              >
                Thêm mã giảm giá
              </MyText>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 100
              }}
            >
              <MyText
                style={{
                  color: Colors.red,
                  fontWeight: '600',
                  fontSize: 12
                }}
              >
                {selectedCodeSale}
              </MyText>
              <TouchableOpacity onPress={() => setSelectedCodeSale(!selectedCodeSale)}>
                <Icons.Feather name={'x'} size={24} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {user ? null : (
          <View style={{ paddingHorizontal: 16 }}>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ textAlign: 'left', fontSize: 12, marginTop: 16, fontSize: 12 }}
            >
              Đăng nhập để sử dụng các ưu đãi cá nhân!
            </MyText>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserNavigation', { screen: 'Login' })}
              style={{
                backgroundColor: Colors.white,
                paddingVertical: 16,

                borderWidth: 1,
                marginTop: 16
              }}
            >
              <MyText
                fontFamily={'Montserrat-SemiBold'}
                style={{
                  color: Colors.black,
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: 12
                }}
              >
                Đăng Nhập
              </MyText>
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: Colors.gray,
            marginVertical: 16,
            paddingVertical: 8,
            marginHorizontal: 16,
            justifyContent: 'space-between'
          }}
        >
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <MyText style={{ fontSize: 12 }}>Giá trị đơn hàng</MyText>
            <MyText fontFamily={'Montserrat-SemiBold'} style={{ fontSize: 10 }}>
              {formattedCurrency}
            </MyText>
          </View>
          <View style={{ height: 8 }} />
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <MyText style={{ fontSize: 12 }}>Phí giao hàng</MyText>
            {transportFee == 0 ? (
              <MyText fontFamily={'Montserrat-SemiBold'} style={{ fontSize: 10 }}>
                Miễn Phí
              </MyText>
            ) : (
              <MyText fontFamily={'Montserrat-SemiBold'} style={{ fontSize: 10 }}>
                {formattedTransportfee}
              </MyText>
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 16
          }}
        >
          <MyText fontFamily={'Montserrat-SemiBold'} style={{ color: Colors.black, fontSize: 12 }}>
            Thành tiền:
          </MyText>
          <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_price}>
            {formattedTotalPrices}
          </MyText>
        </View>
      </View>
    )
  }
  // render item list Product
  const renderItem = ({ item, index }) => {
    const { name_saleOff, image_saleOff, date_saleOff, code_saleOff, subject } = item
    return (
      <View style={styles.wrapper_promoCodes}>
        <View style={styles.image_promoCodes}>
          <Image
            style={{
              width: '100%',
              height: '100%',

              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8
            }}
            source={image_saleOff}
          />
        </View>
        <View style={styles.wrapper_ContentCodes}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}
          >
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{
                color: Colors.black,
                fontWeight: '600',
                fontSize: 12
              }}
            >
              {name_saleOff}
            </MyText>
            <MyText style={{ marginTop: 4, color: Colors.black, fontSize: 12 }}>
              {code_saleOff}
            </MyText>
          </View>

          <View style={styles.wrapper_btn_apply}>
            <MyText style={{ color: Colors.gray, textAlign: 'center' }}>
              còn {date_saleOff} ngày
            </MyText>
            <View style={{ height: 10 }} />
            <TouchableOpacity
              style={styles.btn_apply}
              onPress={() => {
                handleSelectCodeSale(item, index)
              }}
            >
              {subject}
              <MyText fontFamily={'Montserrat-SemiBold'} style={styles.btn_apply_txt}>
                Áp dụng
              </MyText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: Colors.grayBg
      }}
    >
      <View style={[styles.header]}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons.Ionicons name={'arrow-back-sharp'} size={24} color={Colors.black} />
          </TouchableOpacity>
          <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_header}>
            Giỏ hàng của tôi
          </MyText>
        </View>
        {cart ? (
          <TouchableOpacity
            onPress={() => handlePayPage()}
            style={{
              paddingVertical: 16,
              backgroundColor: Colors.black2,

              marginTop: 16
            }}
          >
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{
                color: Colors.white,
                textAlign: 'center',
                fontWeight: '500',
                fontSize: 12
              }}
            >
              Tiếp tục thanh toán
            </MyText>
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: Colors.grayBg }}>
        <MyText style={{ textAlign: 'center', padding: 16, fontSize: 12 }}>
          Miễn phí giao hàng cho Member với đơn từ 499k
        </MyText>
        {/* {noCart()} */}
        {cart ? ListItemCart() : noCart()}
        <View style={{ height: 20 }} />
        <View style={{ marginVertical: 16 }}>
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{
              fontWeight: '500',
              color: Colors.black,
              fontSize: 12,
              marginHorizontal: 16
            }}
          >
            Chúng tôi chấp nhận
          </MyText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 16,
              marginVertical: 16,
              backgroundColor: Colors.white
            }}
          >
            <View>
              <MyText style={{ textAlign: 'center', color: Colors.black, fontSize: 10 }}>
                Thanh toán khi
              </MyText>
              <MyText style={{ textAlign: 'center', color: Colors.black, fontSize: 10 }}>
                nhận hàng
              </MyText>
            </View>

            <Image
              style={{ width: 120, height: 36 }}
              source={require('@assets/images/logo_primary.png')}
            />
            <Image
              style={{ width: 36, height: 36 }}
              source={require('@assets/images/ic_momo.png')}
            />
            <Image
              style={{ width: 52, height: 32 }}
              source={require('@assets/images/ic_master_card.png')}
            />
            <View />
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 16,
              width: windowWith
            }}
          >
            <MyText style={{ fontSize: 10 }}>
              Giá cả và chi phí giao hàng này chưa phải là cuối cùng cho đến khi bạn tới phần thanh
              toán.
            </MyText>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
                width: windowWith - 16
              }}
            >
              <MyText style={{ fontSize: 10 }}>Miễn phí trả hàng trong 30 ngày.</MyText>
              <MyText style={{ borderBottomWidth: 0.5, marginStart: 4, fontSize: 10 }}>
                trả hàng và hoàn tiền
              </MyText>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ReturnMethod')}
            style={{
              marginTop: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: Colors.white,
              paddingHorizontal: 20,
              paddingVertical: 12
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icons.Feather name={'box'} size={32} />
              <MyText style={{ marginStart: 16, fontWeight: '500', fontSize: 10 }}>
                Giao hàng và chọn phương thức đổi trả
              </MyText>
            </View>
            <Icons.MaterialIcons name={'navigate-next'} size={24} />
          </TouchableOpacity>
        </View>
        {/* <View style={{ height: 32 }} /> */}
      </ScrollView>
      <BottomSheet
        height={windowHeight / 1.6}
        style={{ backgroundColor: Colors.white }}
        ref={sheetRef}
        // onDismiss={() => setBottomBar()}
      >
        <View>
          <View
            style={styles.wrapper}
            // wrapper Modal PromoCode
          >
            <TextInput
              style={{
                marginStart: 20,
                color: Colors.black,
                borderColor: 'gray'
              }}
              placeholder="Thêm mã giảm giá"
            >
              {selectedCodeSale}
            </TextInput>

            <TouchableOpacity
              style={styles.btn_discountCode}
              onPress={() => sheetRef.current.close() & setBottomBar()}
            >
              <Icons.Feather name={'arrow-right'} size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 32, marginHorizontal: 16 }}
          >
            <MyText fontFamily={'Montserrat-SemiBold'} style={{ fontSize: 16, fontWeight: '500' }}>
              Mã khuyến mãi của bạn
            </MyText>

            <FlatList scrollEnabled={false} renderItem={renderItem} data={DataCodeSale} />
            <View style={{ height: windowHeight / 3 }} />
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  )
}

export default BagPage

const styles = StyleSheet.create({
  txt_price: {
    fontSize: 12,
    fontWeight: '500'
  },
  txt_header: {
    marginStart: 32,
    fontWeight: '600',
    fontSize: 16
  },
  header: {
    backgroundColor: Colors.white,
    padding: 16
  },
  btn_apply_txt: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500'
  },
  btn_apply: {
    backgroundColor: Colors.red,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25
  },
  wrapper_btn_apply: {
    marginEnd: 12,
    justifyContent: 'space-between',
    marginVertical: 20
  },
  wrapper_ContentCodes: {
    paddingStart: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    flex: 1,
    borderRadius: 8
  },
  image_promoCodes: {
    width: 104,
    backgroundColor: Colors.white
  },
  wrapper_promoCodes: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    elevation: 4,
    shadowColor: Colors.black,
    borderRadius: 8,
    height: 104
  },
  btn_discountCode: {
    padding: 8,
    backgroundColor: Colors.black,
    borderRadius: 50,
    position: 'absolute',
    right: 0
  },
  wrapper: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginTop: 24,
    paddingVertical: 12,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 8,
    elevation: 4,
    shadowColor: Colors.gray
  }
})

const DataCodeSale = [
  {
    id: 1,
    image_saleOff: require('@assets/images/sale10%.png'),
    name_saleOff: 'Ưu đãi cá nhân',
    code_saleOff: 'giam 10%',
    date_saleOff: 6,
    selected: false
  },
  {
    id: 2,
    image_saleOff: require('@assets/images/bg_sale15%.png'),
    name_saleOff: 'Summer sales',
    code_saleOff: 'giam 15%',
    date_saleOff: 21,
    selected: false
  },
  {
    id: 3,
    image_saleOff: require('@assets/images/sale_50%.png'),
    name_saleOff: 'Ưu đãi cá nhân',
    code_saleOff: 'giam 50%',
    date_saleOff: 6,
    selected: false
  },
  {
    id: 4,
    image_saleOff: require('@assets/images/sale_50%.png'),
    name_saleOff: 'Ưu đãi cá nhân',
    code_saleOff: 'giam 50%',
    date_saleOff: 6,
    selected: false
  },
  {
    id: 5,
    image_saleOff: require('@assets/images/sale_50%.png'),
    name_saleOff: 'Ưu đãi cá nhân',
    code_saleOff: 'giam 50%',
    date_saleOff: 6,
    selected: false
  }
]
