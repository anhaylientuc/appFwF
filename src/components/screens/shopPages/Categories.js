import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
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
import MyText from 'src/constants/FontFamily'
import { getCategoryById } from 'src/utils/http/NewHTTP'
const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Categories = props => {
  const {
    route: {
      params: { categoryId }
    }
  } = props
  const navigation = useNavigation()
  const [categoriesId, setCategoriesId] = useState({})
  const [nameCategories, setnameCategories] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getCategoryById(categoryId)
        setCategoriesId(response.child)
        setnameCategories(response.name)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (navigation) {
        navigation.getParent().setOptions({
          tabBarStyle: {
            backgroundColor: Colors.white,
            bottom: 0,
            paddingVertical: 8,
            height: 54
          }
        })
      }
    }, [navigation])
  )
  // renderItemList Category Women
  const renderItem = ({ item }) => {
    const { _id, name } = item
    return (
      // onClick to ItemCategory Women
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
        }}
        onPress={() =>
          props.navigation.navigate('ItemCategories', {
            categoryById: _id
          })
        }
      >
        <MyText
          style={{
            color: Colors.black,
            fontSize: 12
          }}
        >
          {name}
        </MyText>
        <Icons.AntDesign name={'arrowright'} size={18} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ backgroundColor: Colors.white, width: '100%', height: '100%' }}>
      <View style={styles.view_search}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons.Ionicons name={'chevron-back'} size={24} />
        </TouchableOpacity>
        <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_search}>
          {nameCategories}
        </MyText>
        <TouchableOpacity onPress={() => props.navigation.navigate('SearchPage')}>
          <Icons.Ionicons name={'search'} size={24} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <LinearGradient
          colors={[Colors.transparent08, Colors.transparent06, Colors.transparent08]}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            bottom: 0,
            top: 0,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.red} />
          </View>
        </LinearGradient>
      ) : (
        <ScrollView
          style={{ backgroundColor: Colors.white, width: '100%', height: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          {nameCategories == 'Nữ' ? (
            <View>
              <View style={{ marginHorizontal: 16 }}>
                <Image
                  style={{ width: '100%', height: windowHeight / 2 }}
                  source={require('@assets/images/fwfBackgroud.jpg')}
                />

                <View style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
                  <LinearGradient
                    colors={[Colors.transparent0, Colors.black]}
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 32,
                      paddingHorizontal: 16
                    }}
                  >
                    <Text
                      style={[
                        styles.txt_description,
                        { color: Colors.white, fontSize: 16, textAlign: 'center' }
                      ]}
                    >
                      Hàng mới về
                    </Text>
                    <Text
                      style={[
                        styles.txt_title,
                        { color: Colors.white, fontSize: 20, textAlign: 'center' }
                      ]}
                    >
                      Phong cách đón thu
                    </Text>
                  </LinearGradient>
                </View>
              </View>
              <View style={{ height: 16 }} />
              <View style={{ marginHorizontal: 16 }}>
                <Image
                  style={{ width: '100%', height: windowHeight / 2 }}
                  source={require('@assets/images/hmgoepprod.jpg')}
                />
                <View style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
                  <LinearGradient
                    colors={[Colors.transparent0, Colors.black]}
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 32,
                      paddingHorizontal: 16
                    }}
                  >
                    <Text
                      style={[
                        styles.txt_title,
                        { color: Colors.white, fontSize: 20, textAlign: 'center' }
                      ]}
                    >
                      Khỏe khoắn & Thời thượng
                    </Text>
                  </LinearGradient>
                </View>
              </View>
            </View>
          ) : null}
          <View style={{ height: 36 }} />
          <FlatList
            style={{ padding: 16 }}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false} // thanh cuộn
            showsHorizontalScrollIndicator={false}
            data={categoriesId}
            renderItem={renderItem}
          />
          <View style={{ height: 36 }} />
        </ScrollView>
      )}
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt_VIEW_ALL_ITEMS: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    padding: 16
    // elevation: 50,
    // shadowColor: '#52006A'
  },
  icons: {
    width: 24,
    height: 24
  },
  txt_search: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400'
  },
  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16
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
