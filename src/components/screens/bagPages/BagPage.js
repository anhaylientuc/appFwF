import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRef, useState } from 'react'
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
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
import { useStorage } from 'src/contexts/StorageProvider'
import Icons from '../../icons/Icon'
const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const BagPage = props => {
  const {
    navigation: { goBack }
  } = props
  // sate selected code sale off
  const [selected, setSelected] = useState(DataCodeSale)
  const [selectedCodeSale, setSelectedCodeSale] = useState()
  const { storageData, setStorageData } = useStorage()
  const [visiblePopupMenu, setVisiblePopupMenu] = useState(null)
  const [addFavorite, setAddFavorite] = useState(null)
  const BottomSheetRef = useRef(null)
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState()
  const [isOpen, setIsOpen] = useState(false)

  const handleStatusProduct = _id => {
    setVisiblePopupMenu(_id)
    console.log(_id)
  }
  const snapPoints = ['60%', '80%']
  // set sate Bottom sheet to useRef
  // Logic: onclick Open Bottom Sheet Modal
  const handlePresentModal = () => {
    props.navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
    BottomSheetRef.current?.present()
    setTimeout(() => {
      setIsOpen(true)
    }, 300)
  }

  // Logic: onclick show Bottom bar
  const setBottomBar = () => {
    props.navigation.getParent().setOptions({
      tabBarStyle: {
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

  const handleAddFavorites = () => {
    ;setAddFavorite(!addFavorite) &
      console.log('Thêm vào yêu thích') &
      setTimeout(() => {
        setVisiblePopupMenu(false)
      }, 2000)
  }

  // Logic: onClick delete Item from List
  const handleDeleteFromList = async _id => {
    const result = await AsyncStorage.getItem('my-cart')
    let storage = []
    if (result !== null) {
      storage = JSON.parse(result)
    }

    const newStorage = storage.filter(s => s._id !== visiblePopupMenu)
    setStorageData(newStorage)
    await AsyncStorage.setItem('my-cart', JSON.stringify(newStorage))
  }

  // Menu popup Item
  const popupMenu = ({ _id }) => {
    return (
      <View
        style={{
          backgroundColor: isOpen ? Colors.gray : Colors.white,
          elevation: 16,
          shadowColor: Colors.black,
          right: 32,
          position: 'absolute',
          borderRadius: 8,
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          onPress={() => handleAddFavorites(_id)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',

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
          <MyText style={{ textAlign: 'center', marginStart: 8 }}>Yêu thích</MyText>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.5,
            width: '100%',
            borderColor: Colors.gray
          }}
        />
        <TouchableOpacity
          onPress={() => handleDeleteFromList(_id)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            width: '100%',
            padding: 16
          }}
        >
          <Icons.Feather name={'trash-2'} size={24} />

          <MyText style={{ textAlign: 'center', marginStart: 8 }}>Xóa khỏi danh sách</MyText>
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
              fontSize: 20,
              fontWeight: '600'
            }}
          >
            Không có sản phẩm trong giỏ hàng của bạn
          </MyText>

          <TouchableOpacity style={{ backgroundColor: Colors.red, paddingVertical: 16 }}>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{
                color: Colors.white,
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 16
              }}
            >
              Đăng Nhập
            </MyText>
          </TouchableOpacity>
        </View>
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
          style={{
            backgroundColor: Colors.white,
            paddingVertical: 16,
            marginHorizontal: 16,
            borderWidth: 1
          }}
        >
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{
              color: Colors.black,
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16
            }}
          >
            Tạo tài khoản mới
          </MyText>
        </TouchableOpacity>
      </View>
    )
  }

  const ItemCart = ({ item, index }) => {
    const { product_Name, base_price, category_id, size, selectedName, _id, color, image, code } =
      item

    const handlePlus = () => {
      setQuantity(quantity + 1)
      setPrice(base_price * quantity)
    }
    const handleMinus = () => {
      if (quantity >= 2) {
        setQuantity(quantity - 1)
        setPrice(base_price * quantity)
      }
    }

    return (
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
              backgroundColor: isOpen ? Colors.gray : Colors.white
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
                <MyText fontFamily={'Montserrat-SemiBold'} style={{ color: Colors.gray }}>
                  Màu sắc:
                </MyText>
                <Text
                  numberOfLines={1}
                  style={{
                    color: Colors.black,
                    marginStart: 8,
                    fontWeight: '500',
                    fontFamily: 'Montserrat-SemiBold'
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
                <MyText fontFamily={'Montserrat-SemiBold'} style={{ color: Colors.gray }}>
                  Size:
                </MyText>
                <MyText
                  fontFamily={'Montserrat-SemiBold'}
                  style={{ color: Colors.black, marginStart: 8 }}
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
                  onPress={() => handlePlus()}
                  style={{
                    padding: 6,
                    backgroundColor: isOpen ? Colors.gray : Colors.white,
                    borderRadius: 50,
                    elevation: 8,
                    shadowColor: Colors.gray
                  }}
                >
                  <Icons.AntDesign name={'plus'} size={18} />
                </TouchableOpacity>
                <MyText
                  fontFamily={'Montserrat-SemiBold'}
                  style={{ textAlign: 'center', marginHorizontal: 15 }}
                >
                  {quantity}
                </MyText>
                <TouchableOpacity
                  onPress={() => handleMinus()}
                  style={{
                    padding: 6,
                    backgroundColor: isOpen ? Colors.gray : Colors.white,
                    borderRadius: 50,
                    elevation: 8,
                    shadowColor: Colors.gray
                  }}
                >
                  <Icons.AntDesign name={'minus'} size={18} />
                </TouchableOpacity>
              </View>
              <MyText style={{ fontSize: 14, fontWeight: '500' }}>{price} VND</MyText>
            </View>
            {visiblePopupMenu === _id ? popupMenu(_id) : null}
          </View>
          <TouchableOpacity
            onPress={() => handleStatusProduct(_id)}
            style={{
              borderTopRightRadius: 8
            }}
          >
            {visiblePopupMenu === _id ? (
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
            backgroundColor: isOpen ? Colors.gray : Colors.white,
            marginTop: 24,
            padding: 12,

            elevation: 4,
            shadowColor: Colors.gray
          }}
        >
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{
              marginStart: 8,
              color: Colors.black,
              fontWeight: '600',
              fontSize: 14
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
                  fontSize: 14,
                  borderBottomWidth: 1
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
                  fontSize: 14
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 28,
            marginHorizontal: 16
          }}
        >
          <MyText fontFamily={'Montserrat-SemiBold'} style={{ color: Colors.gray }}>
            Thành tiền:
          </MyText>
          <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_price}>
            299.000 đ
          </MyText>
        </View>

        <TouchableOpacity
          style={{
            paddingVertical: 16,
            backgroundColor: Colors.red,
            borderRadius: 25,
            marginHorizontal: 16,
            marginTop: 24
          }}
        >
          <MyText
            style={{
              color: Colors.white,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: 14
            }}
          >
            Tiến hành thanh toán
          </MyText>
        </TouchableOpacity>
      </View>
    )
  }
  // render item list Product
  const renderItem = ({ item, index }) => {
    const { id, name_saleOff, image_saleOff, date_saleOff, code_saleOff, subject } = item
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
                fontSize: 14
              }}
            >
              {name_saleOff}
            </MyText>
            <MyText style={{ marginTop: 4, color: Colors.black, fontSize: 14 }}>
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
    <BottomSheetModalProvider>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: isOpen ? Colors.gray : Colors.grayBg
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()}>
            <Icons.Ionicons name={'arrow-back-sharp'} size={24} color={Colors.black} />
          </TouchableOpacity>
          <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_header}>
            Giỏ hàng của tôi
          </MyText>
        </View>
        <MyText style={{ textAlign: 'center', marginVertical: 32 }}>
          Miễn phí giao hàng cho Member với đơn từ 499k
        </MyText>
        {/* {noCart()} */}
        {storageData ? ListItemCart() : noCart()}
        <View style={{ marginVertical: 16 }}>
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{
              fontWeight: '500',
              color: Colors.black,
              fontSize: 14,
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
              <MyText style={{ textAlign: 'center' }}>Thanh toán khi</MyText>
              <MyText style={{ textAlign: 'center' }}>nhận hàng</MyText>
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
              paddingVertical: 16,
              paddingHorizontal: 16
            }}
          >
            <MyText style={{ fontSize: 12 }}>
              Giá cả và chi phí giao hàng này chưa phải là cuối cùng cho đến khi bạn tới phần thanh
              toán.
            </MyText>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <MyText style={{ fontSize: 12 }}>Miễn phí trả hàng trong 30 ngày.</MyText>
              <MyText style={{ borderBottomWidth: 0.5, marginStart: 4, fontSize: 12 }}>
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
              <MyText style={{ marginStart: 16, fontWeight: '500' }}>
                Giao hàng và chọn phương thức đổi trả
              </MyText>
            </View>
            <Icons.MaterialIcons name={'navigate-next'} size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomSheetModal
        snapPoints={snapPoints}
        index={0}
        style={{ backgroundColor: Colors.grayBg, borderRadius: 32 }}
        ref={BottomSheetRef}
        onDismiss={() => setBottomBar() & setIsOpen(!isOpen)}
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
              onPress={() => BottomSheetRef.current.close() & setBottomBar()}
            >
              <Icons.Feather name={'arrow-right'} size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ marginTop: 32, marginHorizontal: 16 }}>
            <MyText fontFamily={'Montserrat-SemiBold'} style={{ fontSize: 18, fontWeight: '500' }}>
              Mã khuyến mãi của bạn
            </MyText>

            <BottomSheetFlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              data={DataCodeSale}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default BagPage

const styles = StyleSheet.create({
  txt_price: {
    fontSize: 14,
    fontWeight: '500'
  },
  txt_header: {
    marginStart: 32,
    fontWeight: '600',
    fontSize: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginTop: 32,
    marginStart: 16
  },
  btn_apply_txt: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500'
  },
  btn_apply: {
    backgroundColor: Colors.red,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25
  },
  wrapper_btn_apply: {
    marginEnd: 14,
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
