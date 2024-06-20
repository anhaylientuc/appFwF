import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
import { getCategoryById } from 'src/utils/http/NewHTTP'

const CategoryWomen = props => {
  const {
    navigation,
    goBack,
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
          props.navigation.navigate('ItemCategoryWomen', {
            categoryById: _id
          })
        }
      >
        <MyText
          style={{
            color: Colors.black,
            fontSize: 16,
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
        <Icons.Ionicons name={'search'} size={24} />
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
            fontSize: 14,
            fontWeight: '500'
          }}
        >
          Choose category
        </MyText>

        <FlatList
          style={{ marginBottom: '25%' }}
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

export default CategoryWomen

const styles = StyleSheet.create({
  txt_VIEW_ALL_ITEMS: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'center',
    padding: 15
    // elevation: 50,
    // shadowColor: '#52006A'
  },
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

const DataCategoryWomen = [
  {
    _id: 1,
    category_name: 'Alano'
  },
  {
    _id: 2,
    category_name: 'Orelie'
  },
  {
    _id: 3,
    category_name: 'Perla'
  },
  {
    _id: 4,
    category_name: 'Renie'
  },
  {
    _id: 5,
    category_name: 'Ritchie'
  },
  {
    _id: 6,
    category_name: 'Alisa'
  },
  {
    _id: 7,
    category_name: 'Dorothee'
  },
  {
    _id: 8,
    category_name: 'Jacenta'
  },
  {
    _id: 9,
    category_name: 'Alberto'
  },
  {
    _id: 10,
    category_name: 'Rosanne'
  },
  {
    _id: 11,
    category_name: 'Leah'
  },
  {
    _id: 12,
    category_name: 'Dedie'
  },
  {
    _id: 13,
    category_name: 'Clement'
  },
  {
    _id: 14,
    category_name: 'Derrek'
  },
  {
    _id: 15,
    category_name: 'Nerti'
  },
  {
    _id: 16,
    category_name: 'Allianora'
  },
  {
    _id: 17,
    category_name: 'Denney'
  },
  {
    _id: 18,
    category_name: 'Garrick'
  },
  {
    _id: 19,
    category_name: 'Vallie'
  },
  {
    _id: 20,
    category_name: 'Brandea'
  },
  {
    _id: 21,
    category_name: 'Myrtice'
  },
  {
    _id: 22,
    category_name: 'Carmela'
  },
  {
    _id: 23,
    category_name: 'Mack'
  },
  {
    _id: 24,
    category_name: 'Daphna'
  },
  {
    _id: 25,
    category_name: 'Dorene'
  },
  {
    _id: 26,
    category_name: 'Manda'
  },
  {
    _id: 27,
    category_name: 'Urson'
  },
  {
    _id: 28,
    category_name: 'Letisha'
  },
  {
    _id: 29,
    category_name: 'Stormi'
  },
  {
    _id: 30,
    category_name: 'Yalonda'
  },
  {
    _id: 31,
    category_name: 'Tabbi'
  },
  {
    _id: 32,
    category_name: 'Evangelia'
  },
  {
    _id: 33,
    category_name: 'Viola'
  },
  {
    _id: 34,
    category_name: 'Jo ann'
  },
  {
    _id: 35,
    category_name: 'Patrizio'
  },
  {
    _id: 36,
    category_name: 'Margeaux'
  },
  {
    _id: 37,
    category_name: 'Tabb'
  },
  {
    _id: 38,
    category_name: 'Isis'
  },
  {
    _id: 39,
    category_name: 'Robyn'
  },
  {
    _id: 40,
    category_name: 'Fons'
  },
  {
    _id: 41,
    category_name: 'Franny'
  },
  {
    _id: 42,
    category_name: 'Kevin'
  },
  {
    _id: 43,
    category_name: 'Annie'
  },
  {
    _id: 44,
    category_name: 'Christina'
  },
  {
    _id: 45,
    category_name: 'Solomon'
  },
  {
    _id: 46,
    category_name: 'Dun'
  },
  {
    _id: 47,
    category_name: 'Olimpia'
  },
  {
    _id: 48,
    category_name: 'Timmie'
  },
  {
    _id: 49,
    category_name: 'Brita'
  },
  {
    _id: 50,
    category_name: 'Ariana'
  }
]
