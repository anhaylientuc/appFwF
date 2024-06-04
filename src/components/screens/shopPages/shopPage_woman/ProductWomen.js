import BottomSheet from '@devvie/bottom-sheet'
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
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import { DaTaSale } from 'src/constants/Databases'
import ItemListNew from '../../homePages/ItemListNews'
const ProductWomen = props => {
  const { navigation } = props
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
  }, [])

  const handleOnBack = () => {
    {
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: 'flex',
          borderTopEndRadius: 12,
          borderTopStartRadius: 12,
          paddingTop: 10,
          paddingBottom: 10,
          height: '10%',
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute'
        }
      })
      props.navigation.goBack()
    }
  }
  const sheetRef = useRef(null)
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
        <Text style={{ fontSize: 16 }}>
          Áo sơ mi dáng vừa vải cotton Oxford có cổ áo cài khuy, nẹp khuy kiểu
          truyền thống, cầu vai phía sau và một túi ngực mở. Tay dài với măng
          sét cài khuy và nẹp tay áo có khuy nối. Vạt hơi tròn.
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text style={{ fontSize: 12, color: Colors.black }}>
            Mã số sản phẩm:
          </Text>
          <Text style={{ fontSize: 12, color: Colors.black }}>1012</Text>
        </View>
        <View style={{ marginTop: 16 }}>
          <Text
            style={{ fontSize: 15, fontWeight: '500', color: Colors.black }}
          >
            Kích cỡ:
          </Text>

          <Text>
            Tay áo: Chiều dài: 66.5 cm (Kích cỡ L/L), Mặt sau: Chiều dài: 79.0
            cm (Kích cỡ L/L)
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Text
              style={{ fontSize: 15, fontWeight: '500', color: Colors.black }}
            >
              Chiều cao:
            </Text>
            <Text> Chiều dài bình thường</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Text
              style={{ fontSize: 15, fontWeight: '500', color: Colors.black }}
            >
              Chiều dài tay áo:
            </Text>
            <Text> Tay dài</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Text
              style={{ fontSize: 15, fontWeight: '500', color: Colors.black }}
            >
              Độ vừa vặn:
            </Text>
            <Text> Chiều dài bình thường</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Text
              style={{ fontSize: 15, fontWeight: '500', color: Colors.black }}
            >
              Cổ cao:
            </Text>
            <Text> Cổ áo cài khuy</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Text
              style={{ fontSize: 15, fontWeight: '500', color: Colors.black }}
            >
              Mô tả:
            </Text>
            <Text> Màu be, Màu trơn</Text>
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
        backgroundColor: Colors.white
      }}
    >
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => handleOnBack()}>
          <Image style={styles.icons} source={require('@assets/ic_back.png')} />
        </TouchableOpacity>
        <Text>Short dress</Text>
        <Image
          style={styles.icons}
          source={require('@assets/ic_baseline_share.png')}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={styles.product.image}
            source={{
              uri: 'https://lp2.hm.com/hmgoepprod?set=source[/2f/d4/2fd49e1d4ed15f740a9874b59758e025921fee7b.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
            }}
          />
        </View>
        <View style={styles.product.wrapper_container_size_color}>
          <TouchableOpacity style={styles.product.container_txt_color}>
            <Text style={styles.product.txt_size}>Black</Text>
            <Icons.Entypo
              name={'chevron-small-down'}
              size={20}
              style={{ right: 8 }}
            />
          </TouchableOpacity>
          <View style={styles.product.container_ic_add_favorite}>
            <Image
              style={{
                width: 34,
                height: 34
              }}
              source={require('@assets/ic_add_favorite.png')}
            />
          </View>
        </View>
        <View style={{ marginTop: 22, marginHorizontal: 16, marginBottom: 10 }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Text style={styles.txt_price}>H&M</Text>
            <Text style={styles.txt_price}>$19.99</Text>
          </View>
          <Text style={styles.txt_category_name}>Short black dress</Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 16,
              alignItems: 'center'
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require('@assets/activated.png')}
            />
            <Image
              style={{ width: 20, height: 20 }}
              source={require('@assets/activated.png')}
            />
            <Image
              style={{ width: 20, height: 20 }}
              source={require('@assets/activated.png')}
            />
            <Text style={styles.txt_review}>(10)</Text>
          </View>
          <Text>
            Short dress in soft cotton jersey with decorative buttons down the
            front and a wide, frill-trimmed square neckline with concealed
            elastication. Elasticated seam under the bust and short puff sleeves
            with a small frill trim.
          </Text>
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
            <Text style={styles.txt_shipping_info}>Shipping info</Text>
            <TouchableOpacity onPress={() => setIsInfoProduct(!isInfoProduct)}>
              <Icons.MaterialIcons
                name={'navigate-next'}
                size={20}
                color={Colors.black}
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
            <Text style={styles.txt_shipping_info}>Support</Text>
            <TouchableOpacity>
              <Icons.MaterialIcons
                name={'navigate-next'}
                size={20}
                color={Colors.black}
              />
            </TouchableOpacity>
          </View>

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
              <Text style={{ fontSize: 18, fontWeight: '500', lineHeight: 22 }}>
                You can also like this
              </Text>
              <Text style={styles.txt_review}>12 items</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DaTaSale.map((item, index) => (
              <ItemListNew key={item._id} data={item} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View></View>
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
          onPress={() => {
            sheetRef.current?.open()
          }}
        >
          <Text style={styles.product.txt_size}>Size</Text>

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
          <Text style={styles.txt_addToCart}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
      <View>
        <BottomSheet
          // bottom sheet
          ref={sheetRef}
          height={'50%'}
          style={{
            backgroundColor: Colors.white
          }}
        >
          <Text
            style={{
              color: Colors.black,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '500'
            }}
          >
            Select size
          </Text>
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
                      borderWidth: 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      width: 100,
                      height: 40,
                      padding: 10,
                      marginEnd: 22,
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
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: Colors.black
                        }}
                      >
                        {item.subject}
                      </Text>
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
              <Text>Size selection guide</Text>

              <Icons.MaterialIcons name={'navigate-next'} size={20} />
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
    </View>
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
      shadowColor: '#52006A'
    },
    wrapper_container_size_color: {
      marginTop: 12,
      marginHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      left: 12,
      fontSize: 14,
      color: Colors.black,
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
    fontWeight: '400,'
  },
  txt_addToCart: {
    color: Colors.white,
    marginStart: 8,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center'
  },
  txt_category_name: {
    fontSize: 16,
    color: Colors.gray
  },
  txt_review: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center'
  },
  txt_price: {
    fontSize: 24,
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
    backgroundColor: Colors.white,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
})
// <View style={styles.hmBreadcrumbsNavBreadcr}>
//   <View style={[styles.item, styles.itemPosition]}>
//     <View style={styles.linkFlexBox}>
//       <Text style={[styles.hmcom, styles.textFlexBox]}>HM.com</Text>
//     </View>
//     <Text style={[styles.text, styles.textFlexBox]}>/</Text>
//   </View>
//   <View style={[styles.item1, styles.itemPosition]}>
//     <View style={styles.linkFlexBox}>
//       <Text style={[styles.hmcom, styles.textFlexBox]}>Nam</Text>
//     </View>
//     <Text style={[styles.text, styles.textFlexBox]}>/</Text>
//   </View>
//   <View style={[styles.item2, styles.itemPosition]}>
//     <View style={styles.linkFlexBox}>
//       <Text
//         style={[styles.hmcom, styles.textFlexBox]}
//       >{`Áo & Áo thun`}</Text>
//     </View>
//     <Text style={[styles.text, styles.textFlexBox]}>/</Text>
//   </View>
//   <View style={[styles.item3, styles.itemPosition]}>
//     <View style={styles.linkFlexBox}>
//       <Text
//         style={[styles.hmcom, styles.textFlexBox]}
//       >{`Áo thun in hình & hoạ tiết`}</Text>
//     </View>
//     <Text style={[styles.text, styles.textFlexBox]}>/</Text>
//   </View>
//   <View style={[styles.item4, styles.linkFlexBox]}>
//     <View style={styles.heading4}>
//       <Text style={[styles.oBaL, styles.textFlexBox]}>
//         Áo ba lỗ in hình Loose Fit
//       </Text>
//     </View>
//   </View>
// </View>

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
