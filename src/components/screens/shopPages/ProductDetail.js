import BottomSheet from '@devvie/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import ImageView from 'react-native-image-viewing'
import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import Names from 'src/constants/Names'
import { formatCurrency, useStorage } from 'src/contexts/StorageProvider'
import { getProducts } from 'src/utils/http/NewHTTP'

const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const ProductDetail = props => {
  const {
    route: {
      params: { _id, product_id, nameCategoryById }
    }
  } = props
  const navigation = useNavigation()
  const { storageData, setStorageData } = useStorage()
  const { storageFavorites, setStorageFavorites } = useStorage()
  const sheetRef = useRef(null)
  const [thumbs, setthumbs] = useState([])
  const [selected, setSelected] = useState()
  const [wallPaper, setwallPaper] = useState([])
  const [selectedId, setselectedId] = useState(null)
  const [selectedName, setselectedName] = useState(null)
  const [vaLueSelectSize, setVaLueSelectSize] = useState(null)
  const [isInfoProduct, setIsInfoProduct] = useState(false)
  const [cnt, setcnt] = useState()
  const [attributes_id, setattributes_id] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activated, setActivated] = useState(0)
  const [modalAddToCart, setModalAddToCart] = useState(false)
  const [favoritesIds, setFavoritesIds] = useState([])
  const [product_Name, setproduct_Name] = useState(null)
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const scale = new Animated.Value(1)
  const scrollY = useRef(new Animated.Value(0)).current
  const [headerBg, setHeaderBg] = useState('transparent')
  const [elevationBg, setElevationBg] = useState(0)
  const [base_price, setbase_price] = useState(null)
  const [description, setdescription] = useState(null)
  const [code, setcode] = useState(null)
  const [discount_price, setdiscount_price] = useState(null)
  const [category_id, setcategory_id] = useState(null)
  const [attributes, setattributes] = useState()
  const [attributesMap, setattributesMap] = useState(new Map())
  const [visible, setVisible] = useState(false)
  const showModelImageRv = () => setVisible(true)
  const [validWallPaper, setvalidWallPaper] = useState([])
  const scaleAnim = useRef(new Animated.Value(1)).current
  const [animatedItemId, setAnimatedItemId] = useState(null)

  useFocusEffect(
    useCallback(() => {
      if (navigation) {
        navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
      }
      const loadFavorites = async () => {
        const storedFavorites = await AsyncStorage.getItem('my-favorites')
        if (storedFavorites) {
          const favorites = JSON.parse(storedFavorites)
          setFavoritesIds(favorites.map(favorite => favorite._id))
        }
      }
      loadFavorites()
    }, [navigation, storageFavorites])
  )
  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value > windowHeight / 2) {
        setHeaderBg(Colors.white)
        setElevationBg(8)
      } else {
        setHeaderBg('transparent')
        setElevationBg(0)
      }
    })

    return () => {
      scrollY.removeListener(listener)
    }
  }, [scrollY])

  useEffect(() => {
    const fetchData = async () => {
      const version = 2
      const product_id = props.route.params.product_id

      try {
        const thumb = await getProducts({ version, product_id })
        setthumbs(thumb)
        thumb.map(item => {
          if (item._id == _id) {
            var newAttrColor = item.attributes
            newAttrColor = newAttrColor.filter(attr => attr.key == 'Màu sắc')
            var newAttrSize = item.attributes
            newAttrSize = newAttrSize.filter(attr => attr.key == 'Kích cỡ')
            setSelected(newAttrSize)
            setselectedName(newAttrColor[0].value)
            setbase_price(item.base_price)
            setdescription(item.description)
            setcode(item.code)
            setdiscount_price(item.discount_price)
            setcategory_id(item.category_id)
            setproduct_Name(item.name)
            setwallPaper(item.images)
            setselectedId(item._id)
            setattributes(item.attributes)

            const map = new Map()
            item.attributes.map(attr => {
              const { key, value } = attr
              if (!map.has(key)) {
                map.set(key, [value])
              } else {
                map.get(key).push(value)
              }
              setattributesMap(map)
            })
          }
        })
      } catch (error) {
        console.error('Error1:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (wallPaper) {
      const imagesWithUri = wallPaper
        .filter(item => item.url && item.url.trim() !== '') // Ensure the URL is not empty or null
        .map(item => ({
          id: item.id,
          uri: item.url
        }))

      setvalidWallPaper(imagesWithUri)
    }
  }, [wallPaper])

  const triggerJumpAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 2, // Phóng to
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Thu nhỏ về kích thước ban đầu
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 2, // Phóng to lần 2
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Thu nhỏ về kích thước ban đầu lần 2
        duration: 400,
        useNativeDriver: true
      })
    ]).start()
  }

  const handleFavoriteToggle = () => {
    triggerJumpAnimation()
  }

  const showToastError = title => {
    Toast.show({
      type: 'error', // 'info' | 'error' | 'success'
      text1: 'Thông báo ♲',
      text2: title,
      text1Style: { fontSize: 16, fontFamily: 'Montserrat-SemiBold', color: Colors.red },
      text2Style: { fontSize: 12, color: Colors.black, fontFamily: 'Montserrat-SemiBold' }
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

        onPress: () => {
          handleGoBag()
        }
      })
    }, 1500)
  }
  // quantity khởi tạo mặc định

  const handleAddToCart = async () => {
    // Check if product already exists in storage
    const existingProductIndex = storageData.findIndex(obj => obj.attributes_id === attributes_id)

    if (existingProductIndex !== -1) {
      // Update quantity if product exists
      const updatedStorage = storageData.map((obj, index) => {
        if (index === existingProductIndex) {
          // Check stock before updating
          if (obj.quantity + quantity <= cnt) {
            const newQuantity = obj.quantity + quantity
            const newPrice = base_price * newQuantity
            const title = { product_Name, newPrice }
            setModalAddToCart(!modalAddToCart)
            showToastSuccess(title)
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
    } else if (attributes_id == null && vaLueSelectSize == null) {
      // console.log('Vui lòng chọn thông số')
    } else {
      // Add new product if it doesn't exist
      const newProduct = {
        _id: selectedId,
        product_Name: product_Name,
        product_id: product_id,
        base_price: base_price,
        color: selectedName,
        size: vaLueSelectSize,
        image: wallPaper[0].url,
        code: code,
        newPrice: base_price * quantity,
        quantity: quantity,
        cnt: cnt,
        discount_price: discount_price,
        attributes_id: attributes_id,
        nameCategoryById: nameCategoryById,
        category_id: category_id,
        attributes: attributes
      }

      const updatedStorage = [...storageData, newProduct]
      setStorageData(updatedStorage)
      // console.log(JSON.stringify(updatedStorage, null, 2))
      await AsyncStorage.setItem('my-cart', JSON.stringify(updatedStorage))
      sheetRef.current?.close()
      setModalAddToCart(!modalAddToCart)
      const title = { product_Name: product_Name }
      showToastSuccess(title)
    }
  }

  useEffect(() => {
    if (modalAddToCart == true) {
      position.setValue({ x: 0, y: 0 })
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 0, // Thu nhỏ modal
            duration: 400, // Thời gian thu nhỏ (500ms)
            useNativeDriver: true
          }),
          Animated.timing(position, {
            toValue: { x: windowWith, y: -windowHeight }, // Di chuyển modal về góc trên cùng tay phải (giá trị điều chỉnh theo yêu cầu)
            duration: 800, // Thời gian di chuyển (500ms)
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
              {wallPaper[0] && (
                <Image
                  source={{ uri: wallPaper[0].url }}
                  style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />
              )}
            </View>
            <View style={{ flex: 3 }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>
                {product_Name}
              </Text>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, marginTop: 8 }}>
                {formattedCurrency}
              </Text>
            </View>
          </View>
        </Animated.View>
      </Modal>
    )
  }

  const handelPresenProductId = item => {
    try {
      const { attributes } = item
      const filteredData = item.attributes.filter(item => item.key === 'Kích cỡ')
      const filteredImages = item.images
      const filterName = item.attributes.filter(item => item.key === 'Màu sắc')

      const map = new Map()
      attributes.map(item => {
        const { key, value } = item
        if (!map.has(key)) {
          map.set(key, [value])
        } else {
          map.get(key).push(value)
        }
        setattributesMap(map)
      })
      setselectedId(item._id)
      setSelected(filteredData)
      setwallPaper(filteredImages)
      setselectedName(filterName[0].value)
      setVaLueSelectSize(null)
      setQuantity(1)
      // console.log('id sản phẩm: ', selectedId)
    } catch (error) {
      console.error('Error:', error)
      // Handle errors appropriately in your application
    }
  }

  const handleGoBag = () => {
    navigation.navigate('BagStack', {
      screen: 'BagPage'
    })
  }

  // xử lí logic selected attributes
  const handleSelect = (item, index) => {
    // Update selected items efficiently
    setQuantity(1)
    setVaLueSelectSize(item.value)
    setcnt(item.cnt)
    setattributes_id(item._id)
  }

  // xử lí logic + quantity
  const handlePlus = () => {
    if (quantity < 20 && quantity < cnt) {
      setQuantity(quantity + 1)
    } else if (attributes_id == null) {
      let title = 'Vui lòng chọn kích cỡ'
      showToastError(title)
    } else if (quantity == cnt) {
      let title = 'Chọn tối đa ' + cnt + ' sản phẩm'
      showToastError(title)
    } else {
      let title = 'Chọn tối đa 20 sản phẩm'
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

  // show Bottom Sheet
  const handlePresentModal = () => {
    sheetRef.current?.open()
  }

  // format base_price

  const formattedCurrency = formatCurrency(base_price)
  // Output: 499.000,00 VND

  change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
    if (slide != activated) {
      setActivated(slide)
    }
  }

  const handleAddFavorite = async () => {
    console.log(JSON.stringify(thumbs._id, null, 2))

    const newFavoritesProduct = {
      _id: _id,
      image: wallPaper[0].url,
      product_Name: product_Name,
      base_price: base_price,
      color: selectedName,
      product_id: product_id,
      category_id: category_id,
      code: code,
      discount_price: discount_price,
      nameCategoryById: nameCategoryById,
      attributes: attributes
    }
    setAnimatedItemId(_id)
    handleFavoriteToggle()
    // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích chưa
    const isDuplicate = storageFavorites.some(favorite => favorite._id === _id)
    if (!isDuplicate) {
      const updateFavorites = [...storageFavorites, newFavoritesProduct]
      setStorageFavorites(updateFavorites)
      await AsyncStorage.setItem('my-favorites', JSON.stringify(updateFavorites))
    } else {
      // check nếu _id đã tồn tại trong giỏ hàng thì xóa khỏi storageFavorites
      const result = await AsyncStorage.getItem('my-favorites')
      let storage = []
      if (result !== null) {
        storage = JSON.parse(result)
      }
      const newStorage = storage.filter(s => s._id !== _id)
      setStorageFavorites(newStorage)
      await AsyncStorage.setItem('my-favorites', JSON.stringify(newStorage))
    }
  }

  // Nút back
  const handleOnBack = () => {
    {
      navigation.getParent().setOptions({
        tabBarStyle: {
          backgroundColor: Colors.white,
          bottom: 0,
          paddingVertical: 8,
          height: 54
          // position: 'absolute'
        }
      })
      props.navigation.goBack()
    }
  }

  // thông tin sản phẩm
  const infoProduct = () => {
    return Array.from(attributesMap)
      .filter(([key, value]) => key != 'Kích cỡ')
      .map(([key, value], index) => {
        const newValue = value.map(item => {
          if (Names[item]) {
            return Names[item]
          } else {
            return item
          }
        })
        return (
          <View key={index} style={{ flexDirection: 'row' }}>
            <Text style={styles.txt_title}>{key}:</Text>
            <View style={{ width: 8 }} />
            <Text style={[styles.txt_description, { fontSize: 12 }]}>{newValue.join(', ')}</Text>
          </View>
        )
      })
  }
  const [isProductCare, setIsProductCare] = useState(false)
  const ProductCare = () => {
    return (
      <View style={{ marginHorizontal: 16 }}>
        <MyText style={{ fontSize: 14 }}>
          Bạn cũng có thể giúp bảo vệ môi trường cho một tương lai thời trang bền vững hơn. Hãy mang
          đem bao quần áo cũ / hàng dệt may bất kỳ không sử dụng nữa đến các cửa hàng H&amp;M tham
          gia tái chế thời trang.
        </MyText>
        {/* <MyText
          style={{
            marginTop: 8,
            fontSize: 14,
            borderBottomWidth: 1,
            width: '90%'
          }}
        >
          Đọc về cách bạn có thể giữ cho quần áo bền lâu hơn
        </MyText> */}
        <MyText
          fontFamily={'Montserrat-SemiBold'}
          style={{ marginTop: 8, fontSize: 16, fontWeight: '500' }}
        >
          Hướng dẫn chăm sóc sản phẩm
        </MyText>
        <View style={{ flexDirection: 'row' }}>
          <Icons.Entypo name={'dot-single'} size={20} />
          <MyText>Phơi khô</MyText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icons.Entypo name={'dot-single'} size={20} />
          <MyText>Chỉ tẩy bằng chất không chứa clo khi cần</MyText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icons.Entypo name={'dot-single'} size={20} />
          <MyText>Giặt máy ở 40°</MyText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icons.Entypo name={'dot-single'} size={20} />
          <MyText>Có thể giặt khô</MyText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icons.Entypo name={'dot-single'} size={20} />
          <MyText>Giặt chung với màu tương tự</MyText>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          <Icons.Entypo name={'dot-single'} size={20} />
          <MyText>Là ủi nhiệt độ cao</MyText>
        </View>
      </View>
    )
  }

  // Nội dung trang
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: Colors.grayBg
      }}
    >
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false
        })}
        scrollEventThrottle={16}
      >
        <View>
          <FlatList
            keyExtractor={item => item.url}
            pagingEnabled
            onScroll={this.change}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{ width: windowWith, height: windowHeight / 1.2 }}
            data={wallPaper}
            renderItem={({ item, index }) => {
              return (
                item.url != '' && (
                  <Pressable onPress={showModelImageRv}>
                    <Image
                      resizeMode="cover"
                      style={{ width: windowWith, height: windowHeight / 1.2 }}
                      source={{ uri: item.url }}
                    />
                  </Pressable>
                )
              )
            }}
          />
          {thumbs ? showModalAddToCart() : null}

          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              bottom: 4,
              alignSelf: 'center',
              elevation: 8,
              shadowColor: Colors.black
            }}
          >
            {wallPaper.map((i, k) => (
              <Text
                key={k}
                style={
                  k == activated
                    ? { color: Colors.white, margin: 3 }
                    : { color: Colors.gray, margin: 3 }
                }
              ></Text>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 16, marginHorizontal: 16 }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_price}>
              {product_Name}
            </MyText>
            <MyText
              // fontFamily={'Montserrat-Regular'}
              style={styles.txt_price}
            >
              {formattedCurrency}
            </MyText>
          </View>

          <View style={styles.product.wrapper_container_size_color}>
            <MyText style={styles.product.txt_size}>{Names[selectedName]}</MyText>

            <FlatList
              keyExtractor={item => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={thumbs}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => handelPresenProductId(item)}
                    style={{ marginHorizontal: 4 }}
                  >
                    <Image
                      style={
                        selectedId === item._id
                          ? {
                              width: 57,
                              height: 86,
                              borderColor: Colors.black,
                              borderWidth: 1.4
                            }
                          : { width: 57, height: 86 }
                      }
                      source={{ uri: item.images[0].url }}
                    />
                  </TouchableOpacity>
                )
              }}
            />
          </View>

          <View style={{ flexDirection: 'row', marginEnd: 20, marginTop: 16 }}>
            <Icons.FontAwesome5 name={'shopify'} size={16} />
            <MyText style={{ fontSize: 14, fontWeight: 500, marginStart: 8 }}>
              Giá sản phẩm đã bao gồm VAT, không bao gồm phí giao hàng. Thời gian giao hàng dự kiến
              3-7 ngày làm việc. Mọi thắc mắc vui lòng xem thêm tại trang Dịch vụ khách hàng. Tất cả
              hàng hóa trên website này đều do Công ty TNHH H&amp;M Hennes &amp;Mauritz Việt Nam
              (trụ sở 235 Đồng Khởi, Bến Nghé, Quận 1, TPHCM) chịu trách nhiệm.
            </MyText>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ReviewProduct')}
            style={{
              flexDirection: 'row',
              height: 48,
              alignItems: 'center',
              marginTop: 32
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require('@assets/images/activated.png')}
            />
            <Image
              style={{ width: 20, height: 20 }}
              source={require('@assets/images/activated.png')}
            />
            <Image
              style={{ width: 20, height: 20 }}
              source={require('@assets/images/activated.png')}
            />
            <MyText style={styles.txt_review}>(10 đánh giá)</MyText>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 32,
              borderBlockColor: Colors.black,
              borderTopWidth: 0.1,
              borderBottomWidth: 0.1,
              padding: 16
            }}
          >
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={!isInfoProduct ? styles.txt_shipping_info : styles.txt_shipping_info_active}
            >
              Mô tả & độ vừa vặn
            </MyText>
            <TouchableOpacity onPress={() => setIsInfoProduct(!isInfoProduct)}>
              <Icons.AntDesign
                name={!isInfoProduct ? 'down' : 'up'}
                size={16}
                color={!isInfoProduct ? Colors.black : Colors.red}
              />
            </TouchableOpacity>
          </View>
          {/**
           * Show info product
           */}
          {isInfoProduct ? (
            <View style={{ paddingHorizontal: 16 }}>
              <MyText style={{ fontSize: 12 }}>{description}</MyText>

              <View style={{ flexDirection: 'row', marginVertical: 16 }}>
                <MyText style={{ fontSize: 12, color: Colors.black }}>Mã số sản phẩm: </MyText>
                <Text style={styles.txt_title}> {code}</Text>
              </View>
              {infoProduct()}
            </View>
          ) : null}

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 16,
              borderTopWidth: 0.1,
              borderBottomWidth: 0.1,
              borderBlockColor: Colors.black,
              padding: 16
            }}
          >
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={!isProductCare ? styles.txt_shipping_info : styles.txt_shipping_info_active}
            >
              Hướng dẫn chăm sóc sản phẩm
            </MyText>
            <TouchableOpacity onPress={() => setIsProductCare(!isProductCare)}>
              <Icons.AntDesign
                name={!isProductCare ? 'down' : 'up'}
                size={16}
                color={Colors.black}
              />
            </TouchableOpacity>
          </View>

          {isProductCare ? ProductCare() : null}

          {/**
           * image product
           */}
          <View>
            {wallPaper[0] && wallPaper[0].url ? (
              <Image
                style={{ width: '100%', height: windowHeight }}
                source={{
                  uri: wallPaper[0].url
                }}
              />
            ) : null}

            <View style={{ flexDirection: 'row', marginTop: 4, height: windowHeight / 2 }}>
              {wallPaper[1] && wallPaper[1].url ? (
                <Image
                  style={{ width: '100%', height: windowHeight / 2, flex: 1 }}
                  source={{
                    uri: wallPaper[1].url
                  }}
                />
              ) : null}
              <View style={{ width: 4 }} />
              {wallPaper[2] && wallPaper[2].url ? (
                <Image
                  style={{ width: '100%', height: windowHeight / 2, flex: 1 }}
                  source={{
                    uri: wallPaper[2].url
                  }}
                />
              ) : null}
            </View>
            {wallPaper[3] && wallPaper[3].url ? (
              <Image
                style={{ width: '100%', height: windowHeight, marginTop: 4 }}
                source={{
                  uri: wallPaper[3].url
                }}
              />
            ) : null}
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              {wallPaper[4] && wallPaper[4].url ? (
                <Image
                  style={{ width: '100%', height: windowHeight / 2, flex: 1 }}
                  source={{
                    uri: wallPaper[4].url
                  }}
                />
              ) : null}
              <View style={{ width: 4 }} />
              {wallPaper[5] && wallPaper[5].url ? (
                <Image
                  style={{ width: '100%', height: windowHeight / 2, flex: 1 }}
                  source={{
                    uri: wallPaper[5].url
                  }}
                />
              ) : null}
            </View>
            {wallPaper[6] && wallPaper[6].url ? (
              <Image
                style={{ width: '100%', height: windowHeight / 2, marginTop: 4 }}
                source={{
                  uri: wallPaper[6].url
                }}
              />
            ) : null}
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              {wallPaper[7] && wallPaper[7].url ? (
                <Image
                  style={{ width: '100%', height: windowHeight / 2, flex: 1 }}
                  source={{
                    uri: wallPaper[7].url
                  }}
                />
              ) : null}
              <View style={{ width: 4 }} />
              {wallPaper[8] && wallPaper[8].url ? (
                <Image
                  style={{ width: '100%', height: windowHeight / 2, flex: 1 }}
                  source={{
                    uri: wallPaper[8].url
                  }}
                />
              ) : null}
            </View>
          </View>
        </View>
        <View style={{ height: 50 }} />
      </Animated.ScrollView>

      <Animated.View
        style={[styles.container_header, { backgroundColor: headerBg, elevation: elevationBg }]}
      >
        <TouchableOpacity onPress={() => handleOnBack()} style={styles.ic_bg}>
          <Icons.AntDesign name={'arrowleft'} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleGoBag()} style={styles.ic_bg}>
          <Icons.Feather name={'shopping-bag'} size={24} />
          {storageData.length ? (
            <View
              style={{
                backgroundColor: Colors.red,
                borderRadius: 100,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                right: 0,
                top: 0,
                width: 16,
                height: 16
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 10,
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                {storageData.length}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.product.container_ic_add_favorite}
        onPress={() => handleAddFavorite(thumbs)}
      >
        <View>
          {favoritesIds.includes(_id) ? (
            <Animated.View
              style={{ transform: [{ scale: _id === animatedItemId ? scaleAnim : 1 }] }}
            >
              <Icons.MaterialIcons name="favorite" size={24} color="red" />
            </Animated.View>
          ) : (
            <Icons.MaterialIcons name="favorite-border" size={24} color="gray" />
          )}
        </View>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingVertical: 20,
          backgroundColor: Colors.white,
          elevation: 8,
          shadowColor: Colors.white
        }}
      >
        <TouchableOpacity
          style={styles.product.container_txt_size}
          onPress={() => handlePresentModal()}
        >
          <MyText fontFamily={'Montserrat-SemiBold'} style={{ left: 8, fontWeight: '500' }}>
            {vaLueSelectSize ? vaLueSelectSize : <Text>Kích cỡ</Text>}
          </MyText>

          <Icons.Entypo name={'chevron-small-down'} size={24} style={{ right: 8 }} />
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <TouchableOpacity
          style={styles.add_to_cart.btn_container}
          onPress={() =>
            attributes_id && vaLueSelectSize ? handleAddToCart() : handlePresentModal()
          }
        >
          <Icons.SimpleLineIcons name={'handbag'} size={16} color={Colors.white} />
          <Text style={styles.txt_addToCart}>Thêm</Text>
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: '#000' }}>
        <ImageView
          animationType="slide"
          images={validWallPaper}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      </View>

      <BottomSheet
        // bottom sheet
        ref={sheetRef}
        index={0}
        style={{
          backgroundColor: Colors.white
        }}
        height={450}
        onDismiss={() => {
          handlePresentModal()
        }}
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
          <TouchableOpacity onPress={() => sheetRef.current?.close()}>
            <Icons.Feather name="x" size={20} />
          </TouchableOpacity>
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
              keyExtractor={item => item.value}
              scrollEnabled={false}
              style={{ marginTop: 16 }}
              data={selected}
              numColumns={3}
              renderItem={({ item, index }) => {
                const { cnt, value } = item
                return (
                  <TouchableOpacity
                    disabled={cnt == 0 ? true : false}
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
                      backgroundColor: item._id === attributes_id ? Colors.red : Colors.white,
                      opacity: cnt == 0 ? 0.3 : 1
                    }}
                    onPress={() => {
                      handleSelect(item, index)
                    }}
                  >
                    <View>
                      <MyText
                        fontFamily={'Montserrat-SemiBold'}
                        style={{
                          fontSize: 16,
                          fontWeight: '500',
                          color: item._id === attributes_id ? Colors.white : Colors.black2
                        }}
                      >
                        {item.value}
                      </MyText>
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
              <MyText style={{ textAlign: 'center' }}>Số lượng</MyText>
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
                    elevation: 8,
                    shadowColor: Colors.gray,
                    borderWidth: 0.5,
                    borderColor: Colors.gray
                  }}
                >
                  <Icons.AntDesign name={'minus'} size={18} />
                </TouchableOpacity>
                <MyText
                  fontFamily={'Montserrat-SemiBold'}
                  style={{ textAlign: 'center', marginHorizontal: 15 }}
                >
                  {quantity}
                </MyText>
                <TouchableOpacity
                  onPress={() => handlePlus(quantity)}
                  style={{
                    padding: 6,
                    backgroundColor: Colors.white,
                    borderRadius: 50,
                    elevation: 8,
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
              onPress={() => props.navigation.navigate('SizeInfo')}
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingVertical: 16
              }}
            >
              <MyText>Hướng dẫn chọn kích cỡ</MyText>

              <Icons.MaterialIcons name={'navigate-next'} size={24} />
            </TouchableOpacity>
          </View>

          {attributes_id && vaLueSelectSize ? (
            <View style={{ marginHorizontal: 16 }}>
              <TouchableOpacity
                onPress={() => handleAddToCart()}
                style={{
                  backgroundColor: Colors.red,
                  paddingVertical: 16,
                  borderRadius: 8
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
    </View>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  product: {
    image: { height: 413 },
    container_ic_add_favorite: {
      backgroundColor: Colors.white,
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 36,
      elevation: 4,
      shadowColor: '#52006A',
      position: 'absolute',
      right: 16,
      top: 68
    },
    wrapper_container_size_color: {
      marginHorizontal: 16,
      alignItems: 'center'
    },
    container_txt_size: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      backgroundColor: Colors.white,
      height: 50,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.gray
    },
    container_txt_color: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.black,
      width: 140
    },
    txt_size: {
      fontSize: 14,
      color: Colors.black,
      marginVertical: 15,
      fontWeight: '500'
    }
  },
  add_to_cart: {
    container: {
      position: 'relative',
      width: '100%'
    },
    btn_container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      backgroundColor: Colors.black2,
      borderRadius: 8,

      flex: 1
    }
  },
  txt_shipping_info: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '500'
  },
  txt_shipping_info_active: {
    fontSize: 16,
    color: Colors.red,
    fontWeight: '500'
  },
  txt_addToCart: {
    color: Colors.white,
    marginStart: 8,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center'
  },
  txt_category_name: {
    fontSize: 14,
    color: Colors.red,
    fontWeight: '500',
    textAlign: 'center'
  },
  txt_review: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    marginStart: 4
  },
  txt_price: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '500',
    lineHeight: 28.8
  },

  txt_header: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.black
  },
  icons: {
    width: 24,
    height: 24
  },
  container_header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'absolute',
    width: '100%',

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  ic_bg: {
    backgroundColor: Colors.white,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
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
  }
})
