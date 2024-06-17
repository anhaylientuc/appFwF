import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'

import MyText from 'src/constants/FontsStyle'
import { getCategory } from 'src/utils/http/NewHTTP'
const ShopPage = props => {
  const { navigation, goBack } = props
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategory()
        setCategories(response)
        console.log(response)
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
          navigation.navigate('CategoryWomen', {
            categoryId: _id,
            categoryName: name
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
        <MyText fontFamily={'Montserrat-SemiBold'} style={{ fontSize: 16 }}>
          {name}
        </MyText>
        <Icons.AntDesign name={'arrowright'} size={20} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <View style={styles.view_search}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icons.Ionicons name={'chevron-back'} size={24} />
        </TouchableOpacity>
        <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_search}>
          Categories
        </MyText>
        <Icons.Ionicons name={'search'} size={24} />
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
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 22
  },
  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 44
  }
})
