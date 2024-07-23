import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { useStorage } from 'src/contexts/StorageProvider'
const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Favorites = props => {
  const { storageFavorites, setStorageFavorites } = useStorage()
  const { navigation } = props
  const BottomSheetRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const snapPoints = ['60%', '50%']

  useEffect(() => {
    const ok = storageFavorites.map(i => i._id)
    // console.log(...ok)
  }, [storageFavorites])

  const showToastDeleted = title => {
    Toast.show({
      type: 'info', // 'info' | 'error' | 'success'
      text1: 'Xóa sản phẩm thành công ✔',
      // text2: title + ' đã được xóa khỏi giỏ hàng',
      text1Style: { fontSize: 12, fontFamily: 'Montserrat-SemiBold', color: Colors.green },
      text2Style: { fontSize: 12, color: Colors.black, fontFamily: 'Montserrat-SemiBold' }
      //  text2: 'Đây là một cái gì đó '
    })
  }

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
        backgroundColor: Colors.white,
        bottom: 0,
        paddingVertical: 8,
        height: 54
        // position: 'absolute'
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
          paddingHorizontal: 16,
          backgroundColor: Colors.grayBg
        }}
      >
        <MyText style={{ fontSize: 12, fontWeight: '500' }}>
          Bạn chưa có sản phẩm yêu thích nào...
        </MyText>
        <MyText
          style={{
            marginTop: 24,
            fontSize: 12,
            maxWidth: '80%',
            textAlign: 'center'
          }}
        >
          Bạn chưa lưu sản phẩm nào. Đừng lo, rất đơn giản! Chỉ cần chọn biểu tượng trái tim trên
          cùng để lưu, các sản phẩm bạn yêu thích sẽ hiện ở đây.
        </MyText>
        <TouchableOpacity
          style={{
            marginTop: 32,
            backgroundColor: Colors.red,
            padding: 16,
            borderRadius: 4
          }}
          onPress={() => props.navigation.navigate('HomeStack')}
        >
          <MyText style={{ fontSize: 12, color: Colors.white, fontWeight: '700' }}>Xem ngay</MyText>
        </TouchableOpacity>
      </View>
    )
  }

  const handleDeleteFavorite = async item => {
    const { name, _id } = item

    const result = await AsyncStorage.getItem('my-favorites')
    let storage = []
    if (result !== null) {
      storage = JSON.parse(result)
    }
    const newStorage = storage.filter(s => s._id !== _id)
    console.log(_id)
    setStorageFavorites(newStorage)
    await AsyncStorage.setItem('my-favorites', JSON.stringify(newStorage))
    let title = name
    showToastDeleted(title)
  }

  const renderItemFavorite = ({ item }) => {
    const { images, name, base_price, color, size, _id } = item
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={{ width: windowWith / 2 }}>
          <View
            style={{
              backgroundColor: isOpen ? Colors.bgBottomSheet : Colors.grayBg
            }}
          >
            <Image
              style={{ width: '100%', height: windowHeight / 3, padding: 8, resizeMode: 'cover' }}
              source={{
                uri: images.url
              }}
            />
            <View style={{ position: 'absolute', right: 12, top: '62%' }}>
              <TouchableOpacity
                onPress={() => handleDeleteFavorite(item)}
                style={{
                  padding: 8,
                  backgroundColor: Colors.white,
                  borderRadius: 100
                }}
              >
                <Icons.Feather name={'trash-2'} size={20} color={Colors.black} />
              </TouchableOpacity>
            </View>
            <View style={{ width: 190, padding: 16 }}>
              <MyText numberOfLines={1} fontFamily={'Montserrat-SemiBold'}>
                {name}
              </MyText>
              <MyText
                numberOfLines={1}
                style={{ marginVertical: 4 }}
                fontFamily={'Montserrat-Medium'}
              >
                đ{base_price}
              </MyText>
              <MyText numberOfLines={1} style={styles.txt_title_product}>
                {/* {category} */}
              </MyText>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <MyText numberOfLines={1} style={styles.txt_title_product}>
                  Màu sắc:
                </MyText>
                <MyText numberOfLines={1} style={styles.txt_title_product}>
                  {color}
                </MyText>
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
              <MyText fontFamily={'Montserrat-SemiBold'}>Kích cỡ</MyText>
              <Icons.Entypo name={'chevron-down'} size={16} />
            </TouchableOpacity>

            <TouchableOpacity
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
    )
  }
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: 16,
            backgroundColor: Colors.grayBg,
            width: windowWith,
            height: windowHeight
          }}
        >
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{
              textAlign: 'center',
              fontSize: 24,
              fontWeight: '600',
              paddingVertical: 16
            }}
          >
            Sản Phẩm yêu thích
          </MyText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View />
            <MyText style={{ fontSize: 12, color: Colors.gray }}>
              {storageFavorites.length} sản phẩm
            </MyText>
          </View>
          <MyText
            style={{
              padding: 16,
              textAlign: 'center'
            }}
          >
            Lưu và xem lại các sản phẩm này bất cứ lúc nào trên mọi thiết bị bằng cách đăng nhập
            hoặc tạo tài khoản
          </MyText>
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            numColumns={numColum}
            key={numColum}
            renderItem={renderItemFavorite}
            data={storageFavorites}
            keyExtractor={item => item.id}
          />
          <View style={{ height: 100 }} />
        </ScrollView>
        <BottomSheetModal
          ref={BottomSheetRef}
          snapPoints={snapPoints}
          index={1}
          onDismiss={() => {
            setIsOpen(false) & setBottomBar()
          }}
        >
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
                      borderColor: Colors.gray,
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
                      <MyText
                        fontFamily={'Montserrat-SemiBold'}
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: Colors.black
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
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default Favorites

const styles = StyleSheet.create({
  txt_title_product: {
    fontSize: 11
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
