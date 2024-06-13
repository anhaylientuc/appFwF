import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import { useEffect, useRef, useState } from 'react'
import {
  FlatList,
  Image,
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
import ItemListNew from '../../homePages/ItemListNews'
const ProductWomen = props => {
  const { navigation } = props
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

  const [addFavorite, setAddFavorite] = useState(false)
  const handleAddFavorite = () => {
    setAddFavorite(!addFavorite)
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
  const [selected, setSelected] = useState(DataSize)

  const handleSelect = (item, index) => {
    const newItem = selected.map((e, index) => {
      if (e.id == item.id) {
        console.log('selectItem: ', item.subject)
        return { ...e, selected: true }
      } else {
        return { ...e, selected: false }
      }
    })

    setSelected(newItem)
    sheetRef.current.close()
  }

  const [isInfoProduct, setIsInfoProduct] = useState(false)
  const infoProduct = () => {
    return (
      <View style={{ marginHorizontal: 16 }}>
        <MyText style={{ fontSize: 14 }}>
          Áo sơ mi dáng vừa vải cotton Oxford có cổ áo cài khuy, nẹp khuy kiểu
          truyền thống, cầu vai phía sau và một túi ngực mở. Tay dài với măng
          sét cài khuy và nẹp tay áo có khuy nối. Vạt hơi tròn.
        </MyText>
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
              <Icons.Ionicons name={'chevron-back-outline'} size={28} />
            </TouchableOpacity>
            <MyText>Short dress</MyText>
            <Icons.Ionicons name={'share-social-sharp'} size={28} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 8,
                paddingHorizontal: 16,
                paddingVertical: 24
              }}
            >
              <MyText style={{ textAlign: 'center' }}>
                Nam / Áo sơ mi / Dài tay /
              </MyText>
              <MyText style={styles.txt_category_name}>
                Short black dress
              </MyText>
            </View>

            <View>
              <Image
                style={styles.product.image}
                source={{
                  uri: 'https://lp2.hm.com/hmgoepprod?set=source[/2f/d4/2fd49e1d4ed15f740a9874b59758e025921fee7b.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
                }}
              />
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
                  Áo sơ mi Oxford Regular Fit
                </MyText>
                <MyText
                  // fontFamily={'Montserrat-Regular'}
                  style={styles.txt_price}
                >
                  đ499.000
                </MyText>
              </View>

              <View style={styles.product.wrapper_container_size_color}>
                <MyText style={styles.product.txt_size}>Màu be</MyText>

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={DataImgeColors}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity>
                      <Image
                        style={{ width: 57, height: 86 }}
                        source={{ uri: item.image }}
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
              <View style={{ marginHorizontal: 16 }}>
                <Image
                  style={{ width: '100%', height: 600 }}
                  source={{
                    uri: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Faa%2Ff2%2Faaf2b7e60e78bbd721c7726a30aaa8fec442b21e.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]'
                  }}
                />

                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                  <Image
                    style={{ width: '100%', height: 300, flex: 1 }}
                    source={{
                      uri: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6b%2F76%2F6b76d7f1979b559b3e45c00f27cd1afa2519da22.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]'
                    }}
                  />
                  <View style={{ width: 4 }} />
                  <Image
                    style={{ width: '100%', height: 300, flex: 1 }}
                    source={{
                      uri: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F4b%2F13%2F4b130c86a2fd47f2e86bcf70a3b3745a444d8d3c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]'
                    }}
                  />
                </View>
                <Image
                  style={{ width: '100%', height: 600, marginTop: 4 }}
                  source={{
                    uri: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F91%2F3a%2F913a28d48aa6c96e9ddc4f08fbb5bb31360362bb.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]'
                  }}
                />
                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                  <Image
                    style={{ width: '100%', height: 300, flex: 1 }}
                    source={{
                      uri: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F2f%2Fd4%2F2fd49e1d4ed15f740a9874b59758e025921fee7b.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]'
                    }}
                  />
                  <View style={{ width: 4 }} />
                  <Image
                    style={{ width: '100%', height: 300, flex: 1 }}
                    source={{
                      uri: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ffa%2F89%2Ffa89efa371a8fce072f4431fe8fc4028544225f4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVEDETAIL%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]'
                    }}
                  />
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
                Kích cỡ
              </MyText>

              <Icons.Entypo
                name={'chevron-small-down'}
                size={20}
                style={{ right: 8 }}
              />
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity style={styles.add_to_cart.btn_container}>
              <Icons.SimpleLineIcons
                name={'handbag'}
                size={16}
                color={Colors.white}
              />
              <MyText
                fontFamily={'Montserrat-SemiBold'}
                style={styles.txt_addToCart}
              >
                Thêm vào giỏ hàng
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
                keyExtractor={item => item.id}
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
                          {item.subject}
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
    padding: 8,
    marginTop: 44,
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
