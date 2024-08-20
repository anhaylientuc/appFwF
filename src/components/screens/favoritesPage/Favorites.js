import BottomSheet from '@devvie/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { formatCurrency, useStorage } from 'src/contexts/StorageProvider'
import UserContext from 'src/contexts/UserContext'
const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Favorites = () => {
  const navigation = useNavigation()
  const { storageFavorites, setStorageFavorites } = useStorage()
  const { storageData, setStorageData } = useStorage()
  const { user } = useContext(UserContext)
  const sheetRef = useRef(null)
  const [vaLueSelectSize, setVaLueSelectSize] = useState(null)
  const [cnt, setcnt] = useState()
  const [attributes_id, setattributes_id] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [modalAddToCart, setModalAddToCart] = useState(false)
  const [selected, setSelected] = useState()
  const [itemStates, setItemStates] = useState()
  const numColum = 2
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const scale = new Animated.Value(1)

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

  useFocusEffect(
    useCallback(() => {
      if (navigation) {
        setBottomBar()
      }
    }, [navigation])
  )

  const showToastDeleted = title => {
    Toast.show({
      type: 'info', // 'info' | 'error' | 'success'
      text1: 'Xóa sản phẩm khỏi yêu thích ✔',
      text1Style: { fontSize: 12, fontFamily: 'Montserrat-SemiBold', color: Colors.green }
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
  const showToastSuccess = title => {
    setTimeout(() => {
      Toast.show({
        type: 'success', // 'info' | 'error' | 'success'
        text1: 'Đã thêm vào giỏ hàng ✔',
        text2: '' + title.product_Name,
        text1Style: { fontSize: 16, fontFamily: 'Montserrat-SemiBold', color: Colors.green },
        text2Style: { fontSize: 12, color: Colors.black, fontFamily: 'Montserrat-SemiBold' },
        //  text2: 'Đây là một cái gì đó '
        onPress: () => {
          navigation.navigate('BagStack')
        }
      })
    }, 3000)
  }

  useEffect(() => {
    if (modalAddToCart == true) {
      position.setValue({ x: 0, y: 0 })
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 0, // Thu nhỏ modal
            duration: 400, // Thời gian thu nhỏ (400ms)
            useNativeDriver: true
          }),
          Animated.timing(position, {
            toValue: { x: windowWith - 300, y: windowHeight - 300 }, // Di chuyển modal về góc trên cùng tay phải (giá trị điều chỉnh theo yêu cầu)
            duration: 800, // Thời gian di chuyển (400ms)
            useNativeDriver: true
          })
        ]).start(() => handleOffModalCart())
      }, 400)
    }
  }, [modalAddToCart])
  const handleOffModalCart = () => {
    setModalAddToCart(false)
  }
  const showModalAddToCart = () => {
    const { product_Name, image, base_price } = itemStates
    const formattedBasePrice = formatCurrency(base_price)
    return (
      <Modal isVisible={modalAddToCart}>
        <Animated.View
          style={{
            backgroundColor: Colors.white,
            paddingVertical: 16,
            height: '16%',
            width: '100%',
            transform: [{ translateX: position.x }, { translateY: position.y }, { scale: scale }]
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, paddingHorizontal: 16 }}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />
              )}
            </View>
            <View style={{ flex: 3 }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>
                {product_Name}
              </Text>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, marginTop: 8 }}>
                {formattedBasePrice}
              </Text>
            </View>
          </View>
        </Animated.View>
      </Modal>
    )
  }

  const handleSelectAndPresentModal = (item, index = null) => {
    //Đóng tab bar
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
    // Xử lý khi mở BottomSheet
    if (index === null) {
      // Xử lý khi mở BottomSheet lần đầu
      const filteredDataSize = item.attributes.filter(attr => attr.key === 'Size')
      setTimeout(() => {
        sheetRef.current?.open()
      }, 50) // Adjust the delay as needed
      setSelected(filteredDataSize)
      setItemStates(item)
    } else {
      // Xử lý khi chọn thuộc tính
      setQuantity(1)
      setVaLueSelectSize(item.value)
      setcnt(item.cnt)
      setattributes_id(item._id)
    }
  }

  // Logic AddToCart
  const handleAddToCart = async () => {
    const {
      _id,
      product_Name,
      product_id,
      color,
      base_price,
      image,
      code,
      discount_price,
      attributes
    } = itemStates

    const existingProductIndex = storageData.findIndex(obj => obj.attributes_id === attributes_id)
    if (existingProductIndex !== -1) {
      const updatedStorage = storageData.map((obj, index) => {
        if (index === existingProductIndex) {
          if (obj.quantity + quantity <= cnt) {
            const newQuantity = obj.quantity + quantity
            const newPrice = base_price * newQuantity
            const title = { product_Name, newPrice }

            setTimeout(() => {
              setModalAddToCart(!modalAddToCart)
            }, 500)
            sheetRef.current?.close()
            showToastSuccess(title)
            setTimeout(() => {
              handleDeleteFavorite(itemStates)
            }, 2000)
            setBottomBar()
            return {
              ...obj,
              quantity: newQuantity,
              newPrice: newPrice
            }
          } else {
            let title = 'Số lượng tồn kho không đủ'
            showToastError(title)
            return obj // Return unchanged if stock limit reached
          }
        } else {
          return obj // Return other items unchanged
        }
      })
      await setStorageData(updatedStorage)
    } else {
      const newProduct = {
        _id: _id,
        product_Name: product_Name,
        product_id: product_id,
        base_price: base_price,
        color: color,
        size: vaLueSelectSize,
        image: image,
        code: code,
        discount_price: discount_price,
        attributes_id: attributes_id,
        attributes: attributes,
        newPrice: base_price * quantity,
        quantity: quantity,
        cnt: cnt
      }
      const updatedStorage = [...storageData, newProduct]
      setStorageData(updatedStorage)
      await AsyncStorage.setItem('my-cart', JSON.stringify(updatedStorage))
      setTimeout(() => {
        setModalAddToCart(!modalAddToCart)
      }, 500)
      sheetRef.current?.close()
      const title = { product_Name: product_Name }
      showToastSuccess(title)
      setTimeout(() => {
        handleDeleteFavorite(itemStates)
      }, 2000)
      setBottomBar()
    }
  }

  // xử lý ẩn bottomSheet
  const handleCloseBottomSheet = () => {
    setVaLueSelectSize(null)
    setattributes_id(null)
    setQuantity(1)
    setTimeout(() => {
      setBottomBar()
    }, 450)
  }

  // xử lí logic + quantity
  const handlePlus = () => {
    if (quantity < 20 && quantity < cnt) {
      if (attributes_id == null) {
        let title = 'Vui lòng chọn kích cỡ'
        showToastError(title)
      } else {
        setQuantity(quantity + 1)
      }
    } else if (quantity == cnt) {
      let title = 'Chọn tối đa ' + cnt + ' sản phẩm'
      showToastError(title)
    } else {
      let title = 'Số lượng sản phẩm trong kho đạt tối đa'
      showToastError(title)
    }
  }

  // xử lý logic - quantity
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    } else if (attributes_id == null) {
      let title = 'Vui lòng chọn kích cỡ'
      showToastError(title)
    } else {
      let title = 'Chọn tối thiểu 1 sản phẩm'
      showToastError(title)
    }
  }

  // màn hình khi FavoritesStorage = []
  const noFavorite = () => {
    return (
      <View style={styles.container_noFavorites}>
        <Text
          fontFamily={'Montserrat-SemiBold'}
          style={[
            styles.txt_title,
            { textAlign: 'center', fontSize: 20, fontWeight: '600', paddingVertical: 16 }
          ]}
        >
          Sản phẩm yêu thích
        </Text>
        <Text style={[styles.txt_description, { textAlign: 'center', fontSize: 12 }]}>
          Miễn phí giao hàng cho Member với đơn từ 499k
        </Text>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
        >
          <Text style={[styles.txt_title, { textAlign: 'center' }]}>
            Bạn chưa có sản phẩm yêu thích nào...
          </Text>
          <Text
            style={[
              styles.txt_description,
              {
                marginTop: 16,
                fontSize: 12,
                maxWidth: '90%',
                textAlign: 'center'
              }
            ]}
          >
            Bạn chưa lưu sản phẩm nào. Đừng lo, rất đơn giản! Chỉ cần chọn biểu tượng trái tim trên
            cùng để lưu, các sản phẩm bạn yêu thích sẽ hiện ở đây.
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 32,
              backgroundColor: Colors.red,
              padding: 16,
              borderRadius: 4
            }}
            onPress={() => navigation.navigate('HomeStack')}
          >
            <Text
              style={[
                styles.txt_title,
                {
                  textAlign: 'center',
                  borderBottomWidth: 1,
                  color: Colors.white,
                  borderColor: Colors.white
                }
              ]}
            >
              Xem ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // xử lí xóa Item Favorites
  const handleDeleteFavorite = async item => {
    const { product_Name, _id } = item
    const result = await AsyncStorage.getItem('my-favorites')
    let storage = []
    if (result !== null) {
      storage = JSON.parse(result)
    }
    const newStorage = storage.filter(s => s._id !== _id)
    setStorageFavorites(newStorage)
    await AsyncStorage.setItem('my-favorites', JSON.stringify(newStorage))
    let title = product_Name
    if (attributes_id === null) {
      showToastDeleted(title)
    }
  }

  const handleClickItem = item => {
    const { _id, product_id } = item
    navigation.navigate('ProductDetail', {
      _id: _id,
      product_id: product_id
    })
  }

  // renderItem
  const renderItemFavorite = ({ item }) => {
    const { image, product_Name, base_price, color, nameCategoryById } = item
    const formattedBasePrice = formatCurrency(base_price)
    return (
      <TouchableOpacity onPress={() => handleClickItem(item)}>
        <KeyboardAvoidingView style={{ flexDirection: 'row' }}>
          <View style={{ width: windowWith / 2 }}>
            <View
              style={{
                backgroundColor: Colors.grayBg
              }}
            >
              <Image
                style={{ width: '100%', height: windowHeight / 3, resizeMode: 'contain' }}
                source={{
                  uri: image
                }}
              />
              <View style={{ position: 'absolute', right: 16, top: '62%' }}>
                <TouchableOpacity
                  onPress={() => handleDeleteFavorite(item)}
                  style={{
                    padding: 4,
                    backgroundColor: Colors.white,
                    borderRadius: 100
                  }}
                >
                  <Icons.Feather name={'trash-2'} size={20} color={Colors.black} />
                </TouchableOpacity>
              </View>
              <View style={{ padding: 16 }}>
                <Text
                  numberOfLines={1}
                  style={[styles.txt_title, { fontSize: 14, marginBottom: 4 }]}
                >
                  {product_Name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.txt_title, { fontSize: 14, marginBottom: 4 }]}
                >
                  {formattedBasePrice}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 4
                  }}
                >
                  <MyText numberOfLines={1} style={styles.txt_description}>
                    Loại trang phục:
                  </MyText>
                  <Text numberOfLines={1} style={[styles.txt_title, { fontSize: 10 }]}>
                    {nameCategoryById}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <MyText numberOfLines={1} style={styles.txt_description}>
                    Màu sắc:
                  </MyText>
                  <Text numberOfLines={1} style={[styles.txt_title, { fontSize: 10 }]}>
                    {color}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 8 }}>
              <TouchableOpacity
                onPress={() => handleSelectAndPresentModal(item)}
                style={{
                  backgroundColor: Colors.black,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  padding: 16,
                  alignItems: 'center'
                }}
              >
                <Icons.FontAwesome name={'shopping-bag'} size={16} color={Colors.white} />
                <MyText
                  fontFamily={'Montserrat-SemiBold'}
                  style={{
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: '600',
                    marginStart: 8
                  }}
                >
                  Thêm
                </MyText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    )
  }

  return (
    <KeyboardAvoidingView>
      {!storageFavorites.length == [] ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: Colors.grayBg,
            width: windowWith,
            height: windowHeight
          }}
        >
          <View>
            <Text
              style={[
                styles.txt_title,
                {
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '600',
                  paddingVertical: 16
                }
              ]}
            >
              Sản phẩm yêu thích
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 16
              }}
            >
              <View />
              <MyText style={{ fontSize: 12, color: Colors.gray }}>
                {storageFavorites.length} sản phẩm
              </MyText>
            </View>
            {!user ? (
              <MyText
                style={{
                  padding: 16,
                  textAlign: 'center'
                }}
              >
                Lưu và xem lại các sản phẩm này bất cứ lúc nào trên mọi thiết bị bằng cách đăng nhập
                hoặc tạo tài khoản
              </MyText>
            ) : null}
            <View style={{ height: 16 }} />
            {itemStates ? showModalAddToCart() : null}
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              numColumns={numColum}
              renderItem={renderItemFavorite}
              data={storageFavorites}
            />
          </View>
        </ScrollView>
      ) : (
        noFavorite()
      )}
      <BottomSheet
        height={480}
        style={{ backgroundColor: Colors.white }}
        ref={sheetRef}
        onClose={() => handleCloseBottomSheet()}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16
          }}
        >
          <View />
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{
              color: Colors.black,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '500'
            }}
          >
            Chọn kích cỡ
          </MyText>
          <TouchableOpacity onPress={() => handleCloseBottomSheet()}></TouchableOpacity>
        </View>
        <View
          showsVerticalScrollIndicator={false}
          style={{ width: '100%', height: 360, justifyContent: 'space-between' }}
        >
          <View
            style={{
              marginTop: 8,
              marginHorizontal: 16
            }}
          >
            <FlatList
              scrollEnabled={false}
              style={{ marginTop: 16 }}
              data={selected}
              numColumns={3}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      width: 94,
                      padding: 12,
                      marginEnd: 16,
                      marginBottom: 16,
                      borderColor: item._id === attributes_id ? Colors.red : Colors.gray,
                      backgroundColor: item._id === attributes_id ? Colors.red : Colors.white
                    }}
                    onPress={() => {
                      handleSelectAndPresentModal(item, index)
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Montserrat-SemiBold',
                          color: item._id === attributes_id ? Colors.white : Colors.black2
                        }}
                      >
                        {item.value}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 16
              }}
            >
              <MyText style={{ textAlign: 'center', fontSize: 12 }}>Số lượng</MyText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
                  onPress={() => handleMinus(quantity)}
                  style={{
                    padding: 6,
                    backgroundColor: Colors.white,
                    borderRadius: 50,
                    elevation: 4,
                    shadowColor: Colors.gray,
                    borderWidth: 0.5,
                    borderColor: Colors.gray
                  }}
                >
                  <Icons.AntDesign name={'minus'} size={18} />
                </TouchableOpacity>
                <MyText
                  fontFamily={'Montserrat-SemiBold'}
                  style={{ textAlign: 'center', marginHorizontal: 16, fontSize: 12 }}
                >
                  {quantity}
                </MyText>
                <TouchableOpacity
                  onPress={() => handlePlus(quantity)}
                  style={{
                    padding: 6,
                    backgroundColor: Colors.white,
                    borderRadius: 50,
                    elevation: 4,
                    shadowColor: Colors.gray,
                    borderWidth: 0.5,
                    borderColor: Colors.gray
                  }}
                >
                  <Icons.AntDesign name={'plus'} size={18} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ShopStack', {
                  screen: 'SizeInfo'
                })
              }
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingVertical: 16
              }}
            >
              <MyText style={{ fontSize: 12 }}>Hướng dẫn chọn kích cỡ</MyText>
              <Icons.MaterialIcons name={'navigate-next'} size={24} />
            </TouchableOpacity>
          </View>

          {vaLueSelectSize ? (
            <View style={{ marginHorizontal: 16 }}>
              <TouchableOpacity
                onPress={() => handleAddToCart(itemStates)}
                style={{
                  backgroundColor: Colors.red,
                  paddingVertical: 16,
                  borderRadius: 8,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  left: 0
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: Colors.white,
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 16
                  }}
                >
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
  )
}

export default Favorites

const styles = StyleSheet.create({
  txt_description: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium'
  },
  container_noFavorites: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: Colors.grayBg
  },
  txt_title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12
  }
})
