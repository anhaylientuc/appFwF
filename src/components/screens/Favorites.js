<<<<<<< Updated upstream
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
=======
import Colors from 'src/constants/Colors'
>>>>>>> Stashed changes

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React, { useRef, useState } from 'react'
import { FlatList, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Icons from 'src/components/icons/Icon'

const Favorites = props => {
  const { navigation } = props
  const BottomSheetRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const snapPoints = ['60%', '50%']
  const handlePresentModal = () => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
    BottomSheetRef.current?.present()
    setTimeout(() => {
      setIsOpen(true)
    }, 300)
  }
  const setBottomBar = () => {
    navigation.getParent().setOptions({
      tabBarStyle: {
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
    BottomSheetRef.current.close()
    setBottomBar()
  }

  const numColum = 2
  const noFavorite = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          backgroundColor: Colors.grayBg
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: '500' }}>Bạn chưa có sản phẩm yêu thích nào...</Text>
        <Text style={{ marginTop: 24, fontSize: 14, maxWidth: '80%', textAlign: 'center' }}>
          Bạn chưa lưu sản phẩm nào. Đừng lo, rất đơn giản! Chỉ cần chọn biểu tượng trái tim trên cùng để lưu, các sản
          phẩm bạn yêu thích sẽ hiện ở đây.
        </Text>
        <TouchableOpacity
          style={{ marginTop: 32, backgroundColor: Colors.red, padding: 16, borderRadius: 4 }}
          onPress={() => props.navigation.navigate('HomeStack')}
        >
          <Text style={{ fontSize: 16, color: Colors.white, fontWeight: '700' }}>Xem ngay</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderItemFavorite = ({ item }) => {
    const { id, image, name_product, category, price, color } = item
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={{ width: 190, marginTop: 17, marginBottom: 12 }}>
          <View style={{ backgroundColor: isOpen ? Colors.bgBottomSheet : Colors.grayBg }}>
            <Image
              style={{ width: '100%', height: 284, padding: 8 }}
              source={{
                uri: image
              }}
            />
            <View style={{ position: 'absolute', right: 12, top: '62%' }}>
              <TouchableOpacity style={{ padding: 8, backgroundColor: Colors.white, borderRadius: 100 }}>
                <Icons.Feather name={'trash-2'} size={20} color={Colors.black} />
              </TouchableOpacity>
            </View>
            <View style={{ width: 190, padding: 16 }}>
              <Text numberOfLines={1}>{name_product}</Text>
              <Text numberOfLines={1} style={{ marginVertical: 4 }}>
                đ{price}.000
              </Text>
              <Text numberOfLines={1} style={styles.txt_title_product}>
                {category}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text numberOfLines={1} style={styles.txt_title_product}>
                  Màu sắc:
                </Text>
                <Text numberOfLines={1} style={styles.txt_title_product}>
                  {color}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ width: 190, padding: 8 }}>
            <TouchableOpacity
              onPress={() => handlePresentModal()}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                borderWidth: 0.5,
                marginVertical: 8,
                backgroundColor: Colors.white,
                borderColor: Colors.gray
              }}
            >
              <Text>Chọn kích cỡ</Text>
              <Icons.Entypo name={'chevron-down'} size={16} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.red,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 16,

                alignItems: 'center'
              }}
            >
              <Icons.FontAwesome name={'shopping-bag'} size={16} color={Colors.white} />
              <Text style={{ color: Colors.white, fontSize: 16, fontWeight: '600', marginStart: 8 }}>Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
  return (
<<<<<<< Updated upstream
    <View style={{ justifyContent: 'center', width: '100%', height: '100%' }}>
      <Text style={{ textAlign: 'center' }}>Favorites</Text>
    </View>
=======
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: 16,
            backgroundColor: isOpen ? Colors.bgBottomSheet : Colors.grayBg,
            width: '100%',
            height: '100%'
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: '600', marginTop: 44 }}>Yêu thích</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View />
            <Text style={{ fontSize: 14, color: Colors.gray }}>1 sản phẩm</Text>
          </View>
          <Text style={{ marginVertical: 16, textAlign: 'center', paddingHorizontal: 50 }}>
            Lưu và xem lại các sản phẩm này bất cứ lúc nào trên mọi thiết bị bằng cách đăng nhập hoặc tạo tài khoản
          </Text>
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            numColumns={numColum}
            key={numColum}
            renderItem={renderItemFavorite}
            data={DataFavorite}
            keyExtractor={item => item.id}
          />
          <View style={{ height: 100 }} />
        </ScrollView>
        <BottomSheetModal
          ref={BottomSheetRef}
          snapPoints={snapPoints}
          index={1}
          backgroundStyle={{
            backgroundColor: Colors.white,
            borderRadius: 34
          }}
          onDismiss={() => {
            setIsOpen(false) & setBottomBar()
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
              <Text>Size info</Text>
              <Icons.MaterialIcons name={'navigate-next'} size={20} />
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
>>>>>>> Stashed changes
  )
}

export default Favorites

<<<<<<< Updated upstream
const styles = StyleSheet.create({})
=======
const styles = StyleSheet.create({
  txt_size: {
    color: Colors.white,
    fontWeight: '500'
  },
  btn_size: {
    backgroundColor: Colors.red,
    borderRadius: 8,
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 10
  },
  txt_body_parameters: { flex: 1, paddingVertical: 10 },
  txt_size_parameters: { textAlign: 'center', flex: 1 },
  container_size_parameters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFEFD5',
    flex: 3
  },
  container_size_parameters_pink: {
    backgroundColor: '#FFCCCC'
  }
})

const DataFavorite = [
  {
    id: 1,
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F44%2F42%2F4442fbac4e3080ec20b2f14e353fea267249b0dd.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/mobilefullscreen]',
    name_product: 'Áo thun in hình',
    price: 249,
    category: 'hàng mới về',
    color: 'Màu đen/LA'
  },
  {
    id: 2,
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fd4%2Fcf%2Fd4cf10035a11c97ac60aa1d32476b6ca84ade92c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/mobilefullscreen]',
    name_product: 'Áo thun in hình Fit',
    price: 249,
    category: 'hàng mới về',
    color: 'Màu đen/LA'
  },
  {
    id: 3,
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F1c%2F9f%2F1c9fe0d0d6161e795a4b9385e1ec50f591cac1a1.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/mobilefullscreen]',
    name_product: 'Áo thun in hình Fit',
    price: 249,
    category: 'hàng mới về',
    color: 'Màu đen/LA'
  },
  {
    id: 4,
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F44%2F42%2F4442fbac4e3080ec20b2f14e353fea267249b0dd.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/mobilefullscreen]',
    name_product: 'Áo thun in hình Fit',
    price: 249,
    category: 'hàng mới về',
    color: 'Màu đen/LA'
  },
  {
    id: 5,
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F44%2F42%2F4442fbac4e3080ec20b2f14e353fea267249b0dd.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/mobilefullscreen]',
    name_product: 'Áo thun in hình Fit',
    price: 249,
    category: 'hàng mới về',
    color: 'Màu đen/LA'
  }
]

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
>>>>>>> Stashed changes
