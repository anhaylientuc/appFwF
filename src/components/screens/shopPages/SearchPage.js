import qs from 'qs'
import React, { useEffect, useState } from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import NewHTTP from 'src/utils/http/NewHTTP'
import Icons from '../../icons/Icon'

const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const SearchPage = props => {
  const { navigation } = props
  const [keyword, setkeyword] = useState('')
  const [debouncedKeyword, setdebouncedKeyword] = useState(keyword)
  const [suggest, setsuggest] = useState([])

  const position = new Animated.ValueXY({ x: 0, y: 0 })

  // Chỉ thực hiện hoạt ảnh khi màn hình được hiển thị lần đầu tiên
  useEffect(() => {
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 500,
      useNativeDriver: true
    }).start()
  }, []) // [] đảm bảo rằng hoạt ảnh chỉ chạy một lần khi màn hình được render lần đầu

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log(keyword)
      setdebouncedKeyword(keyword)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [keyword])

  useEffect(() => {
    if (debouncedKeyword) {
      console.log(debouncedKeyword)
      const fetchData = async () => {
        const query = {}
        query.keyword = debouncedKeyword
        const queryString = qs.stringify(query)
        const response = await NewHTTP.search(queryString)
        setsuggest(response)
      }
      fetchData()
    } else {
      setsuggest([])
    }
  }, [debouncedKeyword])

  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
  }, [])

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

  return (
    <Animated.View
      style={{
        backgroundColor: Colors.grayBg,
        width: windowWith,
        height: windowHeight,
        transform: [{ translateX: position.x }, { translateY: position.y }]
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          backgroundColor: Colors.white,
          paddingVertical: 8
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack() & setBottomBar()}>
          <Icons.MaterialIcons name="arrow-back" size={28} />
        </TouchableOpacity>
        <TextInput
          placeholder="Tìm kiếm sản phẩm"
          fontFamily="Montserrat-SemiBold"
          style={{
            marginStart: 32,
            fontSize: 14,
            fontWeight: '600',
            color: Colors.black,
            width: windowWith - 100
          }}
          onChangeText={text => setkeyword(text)}
        />
      </View>
      <View
        style={{
          backgroundColor: Colors.white,
          marginTop: 32,
          paddingHorizontal: 16,
          paddingVertical: 16
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ color: Colors.black, fontFamily: 'Montserrat-SemiBold' }}>
            Lịch sử tìm kiếm
          </Text>
          <Text style={{ color: Colors.black, fontFamily: 'Montserrat-SemiBold' }}>Xóa</Text>
        </View>
        {suggest.map((item, index) => {
          const { keyword } = item
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.replace('SearchDetail', { keyword: keyword })
              }}
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 32
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icons.EvilIcons name="search" size={32} />
                <MyText fontFamily="Montserrat-SemiBold" style={{ marginStart: 16 }}>
                  {keyword}
                </MyText>
              </View>
              <Icons.AntDesign name="arrowright" size={24} />
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={{ position: 'absolute', bottom: 32 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            width: '100%'
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Icons.Ionicons name="camera-outline" size={32} />
            <Text style={{ textAlign: 'center' }}>Chụp ảnh</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Icons.MaterialIcons name="qr-code-scanner" size={32} />
            <Text style={{ textAlign: 'center' }}>Quét mã</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Icons.Ionicons name="location-outline" size={32} />
            <Text style={{ textAlign: 'center' }}>Tìm cửa hàng</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  )
}

export default SearchPage

const styles = StyleSheet.create({})
