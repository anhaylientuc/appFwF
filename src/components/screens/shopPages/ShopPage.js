import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { createPicassoComponent } from 'react-native-picasso'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { getCategory } from 'src/utils/http/NewHTTP'

const ShopPage = () => {
  const PicassoImage = createPicassoComponent(Image)
  const navigation = useNavigation()
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategory()
        setCategories(response)
      } catch (error) {
        console.log('>>>' + error)
        throw error
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
          marginBottom: 16,
          alignItems: 'center'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <PicassoImage
            style={{ height: 36, width: 36, borderRadius: 50 }}
            source={{ uri: image }}
          />

          <MyText fontFamily={'Montserrat-SemiBold'} style={{ fontSize: 12, marginLeft: 16 }}>
            {name}
          </MyText>
        </View>
        <Icons.AntDesign name={'arrowright'} size={16} />
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
          Categories
        </MyText>
        <TouchableOpacity onPress={() => navigation.navigate('SearchPage')}>
          <Icons.Ionicons name={'search'} size={24} />
        </TouchableOpacity>
      </View>
      <FlatList renderItem={renderListCategory} data={categories} />
    </View>
  )
}

export default ShopPage

const styles = StyleSheet.create({
  icons: {
    width: 22,
    height: 22
  },
  txt_search: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400'
  },
  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16
  }
})
