import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
import { getCategoryById } from 'src/utils/http/NewHTTP'

const Categories = props => {
  const {
    navigation,
    route: {
      params: { categoryId }
    }
  } = props

  const [categoriesId, setCategoriesId] = useState({})
  const [nameCategories, setnameCategories] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoryById(categoryId)
        setCategoriesId(response.child)
        setnameCategories(response.name)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
    fetchData()
  }, [])
  // renderItemList Category Women
  const renderItem = ({ item }) => {
    const { _id, name } = item
    return (
      // onClick to ItemCategory Women
      <TouchableOpacity
        style={{ marginBottom: 15 }}
        onPress={() =>
          props.navigation.navigate(
            'ItemCategories',
            {
              categoryById: _id
            },
            console.log(_id)
          )
        }
      >
        <MyText
          style={{
            color: Colors.black,
            fontSize: 14,
            fontWeight: '400',
            left: 40,
            bottom: 17
          }}
        >
          {name}
        </MyText>
        <View style={{ backgroundColor: Colors.gray }}></View>
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

      <ScrollView style={{ backgroundColor: Colors.grayBg }} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.red,
            borderRadius: 25,
            marginStart: 16,
            marginEnd: 16,
            marginTop: 21,
            elevation: 8,
            shadowColor: Colors.gray
          }}
        >
          <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_VIEW_ALL_ITEMS}>
            VIEW ALL ITEMS
          </MyText>
        </TouchableOpacity>

        <MyText
          fontFamily={'Montserrat-SemiBold'}
          style={{
            marginStart: 16,
            marginTop: 16,
            color: Colors.gray,
            fontSize: 12,
            fontWeight: '500'
          }}
        >
          Choose category
        </MyText>

        <FlatList
          style={{ marginBottom: '5%' }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false} // thanh cuộn
          showsHorizontalScrollIndicator={false}
          data={categoriesId}
          renderItem={renderItem}
        />
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
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
    fontSize: 16,
    fontWeight: '400'
  },
  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16
  }
})
