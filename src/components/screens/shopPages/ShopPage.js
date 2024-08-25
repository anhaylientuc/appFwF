import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { createPicassoComponent } from 'react-native-picasso'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { getCategory } from 'src/utils/http/NewHTTP'

const ShopPage = () => {
  const PicassoImage = createPicassoComponent(Image)
  const navigation = useNavigation()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getCategory()
        setCategories(response)
      } catch (error) {
        console.log('>>>' + error)
        throw error
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const renderListCategory = ({ item }) => {
    const { _id, name, image } = item
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Categories', {
            categoryId: _id
          })
        }
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          marginTop: 16,
          alignItems: 'center'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <PicassoImage
            style={{ height: 44, width: 44, borderRadius: 50 }}
            source={{ uri: image ? image : '' }}
          />

          <MyText fontFamily={'Montserrat-SemiBold'} style={{ fontSize: 14, marginLeft: 16 }}>
            {name}
          </MyText>
        </View>
        <Icons.AntDesign name={'arrowright'} size={20} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <View style={styles.view_search}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons.Ionicons name={'chevron-back'} size={24} />
        </TouchableOpacity>
        <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_search}>
          Danh mục thời trang
        </MyText>
        <TouchableOpacity onPress={() => navigation.navigate('SearchPage')}>
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
            <ActivityIndicator size="large" color={Colors.black} />
            <Text style={[styles.txt_title, { marginTop: 8 }]}>Vui lòng chờ trong giây lát...</Text>
          </View>
        </LinearGradient>
      ) : (
        <FlatList renderItem={renderListCategory} data={categories} />
      )}
    </View>
  )
}

export default ShopPage

const styles = StyleSheet.create({
  txt_title: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.black2
  },
  txt_description: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: Colors.black2
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  }
})
