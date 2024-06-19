import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useRef, useState } from 'react'
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import { DaTaSale } from 'src/constants/Databases'
import MyText from 'src/constants/FontsStyle'
import { getProducts } from 'src/utils/http/NewHTTP'
import ItemListNew from '../../homePages/ItemListNews'
const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const ProductWomen = props => {
  const {
    navigation,
    route: {
      params: {
        _id,
        product_id,
        product_Name,
        images,
        base_price,
        category_id,

        description,
        code
      }
    }
  } = props

  const sheetRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
  }, [])
  const handlePresentModal = () => {
    sheetRef.current?.present()
    setTimeout(() => {
      setIsOpen(true)
    }, 300)
  }

  const [activated, setActivated] = useState(0)
  change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    )
    if (slide != activated) {
      setActivated(slide)
    }
  }

  const [addFavorite, setAddFavorite] = useState(false)
  const handleAddFavorite = () => {
    setAddFavorite(!addFavorite)
  }

  const handleAddToCart = async () => {
    const valueToSave = {
      product_id,
      product_Name,
      images,
      base_price,
      category_id,
      vaLueSelectSize,
      description,
      code
    }
    const stringifiedValue = JSON.stringify(valueToSave)

    try {
      Alert.alert('Add successfully')
      await AsyncStorage.setItem('my-cart', stringifiedValue)
        .then(() => console.log('Value stored successfully'))
        .catch(error => console.error('Error saving value:', error))
      setTimeout(() => {
        props.navigation.navigate('BagPage')
      }, 2000)
      // console.log(stringifiedValue)
    } catch (error) {
      console.log('Lỗi rồi cu')
    }
  }

  const snapPoints = ['30%', '60%']
  const handleOnBack = () => {
    {
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: 'flex',
          borderTopEndRadius: 12,
          borderTopStartRadius: 12,
          paddingTop: 10,
          paddingBottom: 10,
          height: 68,
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute'
        }
      })
      props.navigation.goBack()
    }
  }
  const [thumbs, setthumbs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const version = 2
      const product_id = product_id
      try {
        const thumb = await getProducts({ version, product_id })
        // console.log('Fetched thumb:', thumb)
        setthumbs(thumb)
      } catch (error) {
        console.error('Error:', error)
        // Handle errors appropriately in your application
      }
    }
    fetchData()
  }, [])

  const [selected, setSelected] = useState()
  console.log('Lồn mẹ nó ' + selected)

  const [vaLueSelectSize, setVaLueSelectSize] = useState()
  const handelPresenProductId = item => {
    ;(async () => {
      try {
        const filteredData = item.attributes.filter(item => item.key === 'Size')
        console.log('>>>>>>>>>', ...filteredData)
        await setSelected(filteredData)
      } catch (error) {
        console.error('Error:', error)
        // Handle errors appropriately in your application
      }
    })()
  }
  // const filteredData = attributes.filter(item => item.key === 'Size')

  // console.log(filteredData)
  const handleSelect = (item, index) => {
    // Update selected items efficiently
    const updatedSelected = selected.map(selectedItem => ({
      ...selectedItem, // Preserve existing properties
      selected: selectedItem._id === item._id ? true : false // Toggle selection based on ID
    }))

    // Update state and value
    setSelected(updatedSelected)
    setVaLueSelectSize(item.value) // Assuming this sets the size value

    // Close the sheet if desired
    sheetRef.current?.close() // Use optional chaining to handle potential null reference
  }

  const [isInfoProduct, setIsInfoProduct] = useState(false)
  const infoProduct = () => {
    return (
      <View style={{ marginHorizontal: 16 }}>
        <MyText style={{ fontSize: 14 }}>{description}</MyText>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <MyText style={{ fontSize: 12, color: Colors.black }}>
            Mã số sản phẩm:
          </MyText>
          <Text style={{ fontSize: 12, color: Colors.black }}>1012</Text>
        </View>
        <View style={{ marginTop: 16 }}>
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{ fontSize: 15, fontWeight: '500', color: Colors.black }}
          >
            Kích cỡ:
          </MyText>

          <MyText style={{ fontSize: 14 }}>
            Tay áo: Chiều dài: 66.5 cm (Kích cỡ L/L), Mặt sau: Chiều dài: 79.0
            cm (Kích cỡ L/L)
          </MyText>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ fontSize: 15, fontWeight: '500', color: Colors.black }}
            >
              Chiều cao:
            </MyText>
            <MyText> Chiều dài bình thường</MyText>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ fontSize: 15, fontWeight: '500', color: Colors.black }}
            >
              Chiều dài tay áo:
            </MyText>
            <MyText> Tay dài</MyText>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ fontSize: 15, fontWeight: '500', color: Colors.black }}
            >
              Độ vừa vặn:
            </MyText>
            <MyText> Chiều dài bình thường</MyText>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ fontSize: 15, fontWeight: '500', color: Colors.black }}
            >
              Cổ cao:
            </MyText>
            <MyText> Cổ áo cài khuy</MyText>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ fontSize: 15, fontWeight: '500', color: Colors.black }}
            >
              Mô tả:
            </MyText>
            <MyText> Màu be, Màu trơn</MyText>
          </View>
        </View>
      </View>
    )
  }

  const [isProductCare, setIsProductCare] = useState(false)
  const ProductCare = () => {
    return (
      <View style={{ marginHorizontal: 16 }}>
        <MyText style={{ fontSize: 14 }}>
          Bạn cũng có thể giúp bảo vệ môi trường cho một tương lai thời trang
          bền vững hơn. Hãy mang đem bao quần áo cũ / hàng dệt may bất kỳ không
          sử dụng nữa đến các cửa hàng H&amp;M tham gia tái chế thời trang.
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

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: Colors.grayBg
          }}
        >
          <View style={styles.container_header}>
            <TouchableOpacity onPress={() => handleOnBack()}>
              <Icons.Ionicons name={'chevron-back-outline'} size={24} />
            </TouchableOpacity>
            <MyText fontFamily={'Montserrat-SemiBold'} style={{ fontSize: 16 }}>
              {/* {product_Name} */}
            </MyText>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('BagPage')}
            >
              <Icons.SimpleLineIcons name={'handbag'} size={24} />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 16
              }}
            >
              <MyText style={{ textAlign: 'center' }}>
                {/* Nam / Áo sơ mi / Dài tay / */}
              </MyText>
              <MyText style={styles.txt_category_name}>
                Giảm đền 50% cho hàng ngàn sản phẩm
              </MyText>
            </View>

            <View>
              <FlatList
                pagingEnabled
                onScroll={this.change}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ width: windowWith }}
                data={images}
                renderItem={({ item, index }) => (
                  <Pressable>
                    <Image
                      resizeMode="cover"
                      key={index}
                      style={{ width: windowWith, height: 600 }}
                      source={{ uri: item.url }}
                    />
                  </Pressable>
                )}
              />

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
                {images.map((i, k) => (
                  <Text
                    key={k}
                    style={
                      k == activated
                        ? { color: Colors.white, margin: 3 }
                        : { color: Colors.gray, margin: 3 }
                    }
                  >
                    ⬤
                  </Text>
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={styles.product.container_ic_add_favorite}
              onPress={() => handleAddFavorite()}
            >
              <Icons.MaterialIcons
                style={{
                  textAlign: 'center'
                }}
                name={!addFavorite ? 'favorite-outline' : 'favorite'}
                size={24}
                color={!addFavorite ? Colors.gray : Colors.red}
              />
            </TouchableOpacity>

            <View
              style={{ marginTop: 22, marginHorizontal: 16, marginBottom: 10 }}
            >
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <MyText
                  fontFamily={'Montserrat-SemiBold'}
                  style={styles.txt_price}
                >
                  {product_Name}
                </MyText>
                <MyText
                  // fontFamily={'Montserrat-Regular'}
                  style={styles.txt_price}
                >
                  {base_price} VND
                </MyText>
              </View>

              <View style={styles.product.wrapper_container_size_color}>
                <MyText style={styles.product.txt_size}>Màu be</MyText>

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={thumbs}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => handelPresenProductId(item)}
                      style={{ marginHorizontal: 4 }}
                    >
                      <Image
                        style={{ width: 57, height: 86 }}
                        source={{ uri: item.images[0].url }}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>

              <View
                style={{ flexDirection: 'row', marginEnd: 20, marginTop: 16 }}
              >
                <Icons.FontAwesome5 name={'shopify'} size={16} />
                <MyText
                  style={{ fontSize: 14, fontWeight: 500, marginStart: 8 }}
                >
                  Giá sản phẩm đã bao gồm VAT, không bao gồm phí giao hàng. Thời
                  gian giao hàng dự kiến 3-7 ngày làm việc. Mọi thắc mắc vui
                  lòng xem thêm tại trang Dịch vụ khách hàng. Tất cả hàng hóa
                  trên website này đều do Công ty TNHH H&amp;M Hennes
                  &amp;Mauritz Việt Nam (trụ sở 235 Đồng Khởi, Bến Nghé, Quận 1,
                  TPHCM) chịu trách nhiệm.
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
                  style={
                    !isInfoProduct
                      ? styles.txt_shipping_info
                      : styles.txt_shipping_info_active
                  }
                >
                  Mô tả & độ vừa vặn
                </MyText>
                <TouchableOpacity
                  onPress={() => setIsInfoProduct(!isInfoProduct)}
                >
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
              {isInfoProduct ? infoProduct() : null}

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
                  style={
                    !isProductCare
                      ? styles.txt_shipping_info
                      : styles.txt_shipping_info_active
                  }
                >
                  Hướng dẫn chăm sóc sản phẩm
                </MyText>
                <TouchableOpacity
                  onPress={() => setIsProductCare(!isProductCare)}
                >
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
                {images[0] && (
                  <Image
                    style={{ width: '100%', height: 600 }}
                    source={{
                      uri: images[0].url
                    }}
                  />
                )}

                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                  <Image
                    style={{ width: '100%', height: 300, flex: 1 }}
                    source={{
                      uri: images[1].url
                    }}
                  />
                  <View style={{ width: 4 }} />
                  {images[3] && (
                    <Image
                      style={{ width: '100%', height: 300, flex: 1 }}
                      source={{
                        uri: images[3].url
                      }}
                    />
                  )}
                </View>
                {images[4] && (
                  <Image
                    style={{ width: '100%', height: 600, marginTop: 4 }}
                    source={{
                      uri: images[4].url
                    }}
                  />
                )}
                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                  {images[2] && (
                    <Image
                      style={{ width: '100%', height: 300, flex: 1 }}
                      source={{
                        uri: images[2].url
                      }}
                    />
                  )}
                  <View style={{ width: 4 }} />
                  {images[3] && (
                    <Image
                      style={{ width: '100%', height: 300, flex: 1 }}
                      source={{
                        uri: images[3].url
                      }}
                    />
                  )}
                </View>
              </View>
              <View style={{ marginHorizontal: 16, marginTop: 16 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <MyText
                    fontFamily={'Montserrat-SemiBold'}
                    style={{ fontSize: 18, fontWeight: '500', lineHeight: 22 }}
                  >
                    You can also like this
                  </MyText>
                  <MyText style={styles.txt_review}>12 items</MyText>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {DaTaSale.map((item, index) => (
                  <ItemListNew key={item._id} data={item} />
                ))}
              </ScrollView>
            </View>
            <View style={{ height: 50 }} />
          </ScrollView>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 16,
              marginVertical: 20,
              backgroundColor: Colors.grayBg
            }}
          >
            <TouchableOpacity
              style={styles.product.container_txt_size}
              onPress={() => handlePresentModal()}
            >
              <MyText
                fontFamily={'Montserrat-SemiBold'}
                style={{ textAlign: 'center', left: 8, fontWeight: '500' }}
              >
                {vaLueSelectSize ? vaLueSelectSize : <Text>Kích cỡ</Text>}
              </MyText>

              <Icons.Entypo
                name={'chevron-small-down'}
                size={20}
                style={{ right: 8 }}
              />
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity
              style={styles.add_to_cart.btn_container}
              onPress={() => handleAddToCart()}
            >
              <Icons.SimpleLineIcons
                name={'handbag'}
                size={16}
                color={Colors.white}
              />
              <MyText
                fontFamily={'Montserrat-SemiBold'}
                style={styles.txt_addToCart}
              >
                Thêm
              </MyText>
            </TouchableOpacity>
          </View>

          <BottomSheetModal
            // bottom sheet
            ref={sheetRef}
            snapPoints={snapPoints}
            index={0}
            backgroundStyle={{
              backgroundColor: Colors.white,
              borderRadius: 34
            }}
            onDismiss={() => {
              setIsOpen(false)
            }}
          >
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{
                color: Colors.black,
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '500'
              }}
            >
              Chọn kích cỡ
            </MyText>
            <View style={{ marginHorizontal: 16 }}>
              <FlatList
                // render Item Data Sort by
                style={{ marginVertical: 22 }}
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
                        width: 100,
                        padding: 10,
                        marginEnd: 22,
                        borderColor: Colors.gray,
                        marginBottom: 22
                      }}
                      onPress={() => {
                        handleSelect(item, index)
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: Colors.white
                        }}
                      >
                        <MyText
                          fontFamily={'Montserrat-SemiBold'}
                          style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: Colors.black,
                            lineHeight: 20
                          }}
                        >
                          {item.value}
                        </MyText>
                      </View>
                    </TouchableOpacity>
                  )
                }}
              />
              <TouchableOpacity
                onPress={() => props.navigation.navigate('SizeInfo')}
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row'
                }}
              >
                <MyText>Hướng dẫn chọn kích cỡ</MyText>

                <Icons.MaterialIcons name={'navigate-next'} size={20} />
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default ProductWomen

const styles = StyleSheet.create({
  product: {
    image: { height: 413 },
    container_ic_add_favorite: {
      backgroundColor: Colors.white,
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 36,
      elevation: 4,
      shadowColor: '#52006A',
      position: 'absolute',
      right: 16,
      top: '2.5%'
    },
    wrapper_container_size_color: {
      marginTop: 12,
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
      backgroundColor: Colors.red,
      borderRadius: 8,
      elevation: 8,
      flex: 1,
      shadowColor: Colors.gray
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
    fontSize: 12,
    fontWeight: '500',
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
    padding: 16,
    marginTop: 24,
    backgroundColor: Colors.grayBg,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
})

const DataSize = [
  {
    id: 1,
    subject: 'XS',
    selected: false
  },
  {
    id: 2,
    subject: 'S',
    selected: false
  },
  {
    id: 3,
    subject: 'M',
    selected: false
  },
  {
    id: 4,
    subject: 'L',
    selected: false
  },
  {
    id: 5,
    subject: 'XL',
    selected: false
  }
]
const DataImgeColors = [
  {
    id: 1,
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F2f%2Fd4%2F2fd49e1d4ed15f740a9874b59758e025921fee7b.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]'
  },
  {
    id: 2,
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fe0%2F91%2Fe091d36cead2efe5cf4b3fd8bf96252e56ab79af.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]'
  },
  {
    id: 3,
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fe0%2F91%2Fe091d36cead2efe5cf4b3fd8bf96252e56ab79af.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]'
  },
  {
    id: 4,
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fe0%2F91%2Fe091d36cead2efe5cf4b3fd8bf96252e56ab79af.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]'
  },
  {
    id: 5,
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fe0%2F91%2Fe091d36cead2efe5cf4b3fd8bf96252e56ab79af.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]'
  },
  {
    id: 6,
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fe0%2F91%2Fe091d36cead2efe5cf4b3fd8bf96252e56ab79af.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]'
  },
  {
    id: 7,
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fe0%2F91%2Fe091d36cead2efe5cf4b3fd8bf96252e56ab79af.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]'
  }
]
