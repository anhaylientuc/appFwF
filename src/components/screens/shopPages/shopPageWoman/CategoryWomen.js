import React from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'

const CategoryWomen = props => {
<<<<<<< HEAD:src/components/screens/shopPages/Categories.js
  const {
    navigation,
    route: {
      params: { categoryId }
    }
  } = props
=======
  const { navigation } = props
>>>>>>> parent of 6f228af (Merge branch 'phuong_test' of https://github.com/anhaylientuc/appFwF into phuong_test):src/components/screens/shopPages/shopPageWoman/CategoryWomen.js

  // renderItemList Category Women
  const renderItem = ({ item }) => {
    const { _id, category_name } = item
    return (
      // onClick to ItemCategory Women
      <TouchableOpacity
        style={{ marginBottom: 15 }}
        onPress={() => props.navigation.navigate('ItemCategoryWomen')}
      >
        <Text
          style={{
            color: Colors.black,
            fontSize: 16,
            fontWeight: '400',
            left: 40,
            bottom: 17
          }}
        >
          {category_name}
        </Text>
        <View style={{ backgroundColor: Colors.gray }}></View>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={{ backgroundColor: Colors.white, width: '100%', height: '100%' }}
    >
      <View style={styles.view_search}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Women')}>
          <Icons.Ionicons name={'chevron-back'} size={24} />
        </TouchableOpacity>
        <Text style={styles.txt_search}>Categories</Text>
        <Icons.Ionicons name={'search'} size={24} />
      </View>

      <ScrollView
        style={{ backgroundColor: Colors.grayBg }}
        showsVerticalScrollIndicator={false}
      >
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
          <Text style={styles.txt_VIEW_ALL_ITEMS}>VIEW ALL ITEMS</Text>
        </TouchableOpacity>

        <Text
          style={{
            marginStart: 16,
            marginTop: 16,
            color: Colors.gray,
            fontSize: 14,
            fontWeight: '500'
          }}
        >
          Choose category
        </Text>

        <FlatList
          style={{ marginBottom: '5%' }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false} // thanh cuộn
          showsHorizontalScrollIndicator={false}
          data={DataCategoryWomen}
          renderItem={renderItem}
          keyExtractor={item => item._id}
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
    width: 24,
    height: 24
  },
  txt_search: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400'
  },
  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
<<<<<<< HEAD:src/components/screens/shopPages/Categories.js
    padding: 16
=======
    padding: 8,
    marginTop: 44
>>>>>>> parent of 6f228af (Merge branch 'phuong_test' of https://github.com/anhaylientuc/appFwF into phuong_test):src/components/screens/shopPages/shopPageWoman/CategoryWomen.js
  }
})
