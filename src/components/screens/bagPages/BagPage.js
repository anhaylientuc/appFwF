import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import { useRef, useState } from 'react'
import {
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
import Icons from '../../icons/Icon'

const BagPage = props => {
  const {
    navigation: { goBack }
  } = props
  // sate selected code sale off
  const [selected, setSelected] = useState(DataCodeSale)
  const [selectedCodeSale, setSelectedCodeSale] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const snapPoints = ['60%']
  // set sate Bottom sheet to useRef
  const BottomSheetRef = useRef(null)
  // Logic: onclick Open Bottom Sheet Modal
  const handlePresentModal = () => {
    props.navigation
      .getParent()
      .setOptions({ tabBarStyle: { display: 'none' } })
    BottomSheetRef.current?.present()
    setTimeout(() => {
      setIsOpen(true)
    }, 300)
  }

  // PopupMenu
  const [visiblePopupMenu, setVisiblePopupMenu] = useState(false)
  // Logic: onclick addFavorite
  const [addFavorite, setAddFavorite] = useState(false)
  const handleAddFavorites = () => {
    ;setAddFavorite(!addFavorite) &
      console.log('Thêm vào yêu thích') &
      setTimeout(() => {
        setVisiblePopupMenu(false)
      }, 2000)
  }
  // Logic: onClick delete Item from List
  const [deleteFromList, setDeleteFromList] = useState(false)
  const handleDeleteFromList = () => {
    ;setDeleteFromList(!deleteFromList) &
      console.log('delete From List') &
      setVisiblePopupMenu(false)
  }

  // Menu popup Item
  const popupMenu = () => {
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
          onPress={() => handleAddFavorites()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            width: '100%',
            padding: 16
          }}
        >
          <View>
            {addFavorite ? (
              <Icons.MaterialIcons
                name={'favorite'}
                size={24}
                color={Colors.red}
              />
            ) : (
              <Icons.MaterialIcons name={'favorite-border'} size={24} />
            )}
          </View>
          <Text style={{ textAlign: 'center', marginStart: 8 }}>Yêu thích</Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.5,
            width: '100%',
            borderColor: Colors.gray
          }}
        />
        <TouchableOpacity
          onPress={() => handleDeleteFromList()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            width: '100%',
            padding: 16
          }}
        >
          <Icons.Feather name={'trash-2'} size={24} />

          <Text style={{ textAlign: 'center', marginStart: 8 }}>
            Xóa khỏi danh sách
          </Text>
        </TouchableOpacity>
      </View>
    )
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

  // No cart to Bag
  const noCart = () => {
    return (
      <View>
        <View style={{ backgroundColor: Colors.white, paddingHorizontal: 16 }}>
          <Text
            style={{
              textAlign: 'center',
              padding: 24,
              fontSize: 20,
              fontWeight: '600'
            }}
          >
            Không có sản phẩm trong giỏ hàng của bạn
          </Text>

          <TouchableOpacity
            style={{ backgroundColor: Colors.red, paddingVertical: 16 }}
          >
            <Text
              style={{
                color: Colors.white,
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 16
              }}
            >
              Đăng Nhập
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{ textAlign: 'left', marginTop: 16, marginHorizontal: 16 }}
        >
          Đăng nhập để sử dụng các ưu đãi cá nhân!
        </Text>
        <View
          style={{
            paddingVertical: 24,
            marginHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              backgroundColor: Colors.gray,
              flex: 1,
              height: 1,
              textAlign: 'center'
            }}
          />
          <Text style={{ textAlign: 'center', marginHorizontal: 10 }}>
            Hoặc
          </Text>
          <Text
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
          <Text
            style={{
              color: Colors.black,
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16
            }}
          >
            Tạo tài khoản mới
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Item list product
  const ItemCart = ({ item }) => {
    const { id, image, product_name, color, size, price } = item
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
              paddingVertical: 12
            }}
          >
            <Text style={styles.txt_price}>{product_name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: Colors.gray }}>Màu sắc:</Text>
                <Text style={{ color: Colors.black }}> {color}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginStart: 13, color: Colors.gray }}>
                  Size:
                </Text>
                <Text style={{ color: Colors.black }}> {size}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 12
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
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
                <Text style={{ textAlign: 'center', marginHorizontal: 15 }}>
                  99
                </Text>
                <TouchableOpacity
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
              <Text style={{ fontSize: 16, fontWeight: '500' }}>
                {price}.000đ
              </Text>
            </View>
            {visiblePopupMenu ? popupMenu() : null}
          </View>
          <TouchableOpacity
            onPress={() => setVisiblePopupMenu(!visiblePopupMenu)}
            style={{
              borderTopRightRadius: 8
            }}
          >
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
          data={DataMyBag}
          keyExtractor={item => item.id}
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

            elevation: 4,
            shadowColor: Colors.gray
          }}
        >
          <Text
            style={{
              marginStart: 8,
              color: Colors.black,
              fontWeight: '600',
              fontSize: 16
            }}
          >
            Giá giảm:
          </Text>
          {!selectedCodeSale ? (
            <TouchableOpacity onPress={() => handlePresentModal()}>
              <Text
                style={{
                  color: Colors.black,
                  fontWeight: '600',
                  fontSize: 16,
                  borderBottomWidth: 1
                }}
              >
                Thêm mã giảm giá
              </Text>
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
              <Text
                style={{
                  color: Colors.red,
                  fontWeight: '600',
                  fontSize: 16
                }}
              >
                {selectedCodeSale}
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedCodeSale(!selectedCodeSale)}
              >
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
          <Text style={{ color: Colors.gray }}>Thành tiền:</Text>
          <Text style={styles.txt_price}>299.000 đ</Text>
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
          <Text
            style={{
              color: Colors.white,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: 16
            }}
          >
            Tiến hành thanh toán
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Logic: onclick item code sale
  const handleSelectCodeSale = (item, index) => {
    const updatedSelected = [...selected]

    // Efficiently update the selected property using find and spread
    const updatedItem = updatedSelected.find(
      selectedItem => selectedItem.id === item.id
    )
    if (updatedItem) {
      updatedItem.selected = true
      console.log(updatedItem.code_saleOff)
    }
    const selectedCodeSale = updatedItem.code_saleOff

    // Update state with the modified array
    setSelected(updatedSelected)
    setSelectedCodeSale(selectedCodeSale)
  }
  // render item list Product
  const renderItem = ({ item, index }) => {
    const {
      id,
      name_saleOff,
      image_saleOff,
      date_saleOff,
      code_saleOff,
      subject
    } = item
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
            <Text
              style={{
                color: Colors.black,
                fontWeight: '600',
                fontSize: 16
              }}
            >
              {name_saleOff}
            </Text>
            <Text style={{ marginTop: 4, color: Colors.black, fontSize: 14 }}>
              {code_saleOff}
            </Text>
          </View>

          <View style={styles.wrapper_btn_apply}>
            <Text style={{ color: Colors.gray, textAlign: 'center' }}>
              còn {date_saleOff} ngày
            </Text>
            <View style={{ height: 10 }} />
            <TouchableOpacity
              style={styles.btn_apply}
              onPress={() => {
                handleSelectCodeSale(item, index)
              }}
            >
              {subject}
              <Text style={styles.btn_apply_txt}>Áp dụng</Text>
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
          backgroundColor: Colors.grayBg
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()}>
            <Icons.Ionicons
              name={'arrow-back-sharp'}
              size={24}
              color={Colors.black}
            />
          </TouchableOpacity>
          <Text style={styles.txt_header}>Giỏ hàng của tôi</Text>
        </View>
        <Text style={{ textAlign: 'center', marginVertical: 32 }}>
          Miễn phí giao hàng cho Member với đơn từ 499k
        </Text>
        {noCart()}
        {ListItemCart()}
        <View style={{ marginVertical: 16 }}>
          <Text
            style={{
              fontWeight: '500',
              color: Colors.black,
              fontSize: 16,
              marginHorizontal: 16
            }}
          >
            Chúng tôi chấp nhận
          </Text>
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
              <Text style={{ textAlign: 'center' }}>Thanh toán khi</Text>
              <Text style={{ textAlign: 'center' }}>nhận hàng</Text>
            </View>

            <Image
              style={{ width: 120, height: 36 }}
              source={require('@assets/logo_primary.png')}
            />
            <Image
              style={{ width: 36, height: 36 }}
              source={require('@assets/ic_momo.png')}
            />
            <Image
              style={{ width: 52, height: 32 }}
              source={require('@assets/ic_master_card.png')}
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
            <Text>
              Giá cả và chi phí giao hàng này chưa phải là cuối cùng cho đến khi
              bạn tới phần thanh toán.
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Text>Miễn phí trả hàng trong 30 ngày.</Text>
              <Text style={{ borderBottomWidth: 0.5, marginStart: 4 }}>
                trả hàng và hoàn tiền
              </Text>
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
              <Text style={{ marginStart: 16, fontWeight: '500' }}>
                Giao hàng và chọn phương thức đổi trả
              </Text>
            </View>
            <Icons.MaterialIcons name={'navigate-next'} size={32} />
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomSheetModal
        snapPoints={snapPoints}
        index={0}
        style={{ backgroundColor: Colors.grayBg, borderRadius: 32 }}
        ref={BottomSheetRef}
        onDismiss={() => setBottomBar()}
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
              <Icons.Feather
                name={'arrow-right'}
                size={24}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 32, marginHorizontal: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>
              Mã khuyến mãi của bạn
            </Text>

            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              data={DataCodeSale}
              keyExtractor={item => item.id}
            />

            <View style={{ height: 100 }} />
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default BagPage

const styles = StyleSheet.create({
  txt_price: {
    fontSize: 16,
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

const DataMyBag = [
  {
    id: 1,
    category_name: 'Bordy',
    product_name: 'Rigler',
    color: 'Black',
    size: 'M',
    price: 12,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/b8/3d/b83db12f18a434b25bddc027d4b3bf3b329b2e36.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  },
  {
    id: 2,
    category_name: 'Bordy',
    product_name: 'Rigler',
    review: 1,
    color: 'Black',
    size: 'M',
    price: 12,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/b8/3d/b83db12f18a434b25bddc027d4b3bf3b329b2e36.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  },
  {
    id: 3,
    category_name: 'Talbert',
    product_name: 'Presidey',
    review: 2,
    color: 'Black',
    size: 'M',
    price: 20,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/b8/54/b8547cb07c52deb4a896206184c63c0a50429c20.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  },
  {
    id: 4,
    category_name: 'Bogey',
    product_name: 'Lawly',
    review: 3,
    color: 'Black',
    size: 'M',
    price: 30,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/f6/7a/f67afb0615e9deecb932ae28402005b90ec0204e.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  }
]

const DataCodeSale = [
  {
    id: 1,
    image_saleOff: require('@assets/sale10%.png'),
    name_saleOff: 'Ưu đãi cá nhân',
    code_saleOff: 'giam10%',
    date_saleOff: 6,
    selected: false
  },
  {
    id: 2,
    image_saleOff: require('@assets/bg_sale15%.png'),
    name_saleOff: 'Summer sales',
    code_saleOff: 'giam15%',
    date_saleOff: 21,
    selected: false
  },
  {
    id: 3,
    image_saleOff: require('@assets/sale_50%.png'),
    name_saleOff: 'Ưu đãi cá nhân',
    code_saleOff: 'giam50%',
    date_saleOff: 6,
    selected: false
  }
]
