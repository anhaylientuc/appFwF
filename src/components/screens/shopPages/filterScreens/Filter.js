import { useIsFocused } from '@react-navigation/native'
import qs from 'qs'
import React, { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator, // Import ActivityIndicator
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { FilterContext } from 'src/contexts/FilterProvider'
import NewHTTP from 'src/utils/http/NewHTTP'
import Spinner from 'react-native-loading-spinner-overlay';
const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Filter = props => {
  const {
    navigation,
    route: {
      params: { category_id }
    }
  } = props

  const [filterData, setFilterData] = useState([]) // Renamed to avoid confusion with Filter component
  const { filterState, setFilterState } = useContext(FilterContext)
  const { _category_id, set_category_id } = useContext(FilterContext)
  const [products, setProducts] = useState([]) // Initialize with an empty array
  const [queryStringState, setqueryStringState] = useState(null)
  const isFocusScreen = useIsFocused()
  const [loading, setLoading] = useState(false) // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true) // Start loading
        navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })

        if (category_id) {
          set_category_id(category_id)
        }

        const attributes = []
        for (const [key, value] of filterState.entries()) {
          if (filterState.get(key).length > 0) {
            attributes.push({ key, value })
          }
        }

        const query = {}
        if (attributes.length > 0) query.attributes = attributes
        query.category_id = category_id ? category_id : _category_id

        const queryString = qs.stringify(query)
        setqueryStringState(queryString)
        const response = await NewHTTP.getFilter(queryString)
        const { _attributes, _products } = response

        setFilterData(_attributes)
        setProducts(_products) // Ensure products are set here
      } catch (error) {
        console.log('Error fetching data:', error)
      } finally {
        setLoading(false) // Stop loading
      }
    }

    fetchData()
  }, [filterState, isFocusScreen, _category_id])

  const setBottomBar = () => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        backgroundColor: Colors.white,
        bottom: 0,
        paddingVertical: 16,
        height: 68
      }
    })
  }

  const renderItem = ({ item }) => {
    const { key, child } = item

    return (
      <Pressable
        onPress={() => {
          console.log('navigate', queryStringState)
          props.navigation.navigate('DetailFilter', { child: item.child, keySelected: key, queryString: queryStringState })
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 16
        }}
      >
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <MyText>{key}</MyText>

        <View style={{ flexDirection: 'row' }}>
          {filterState instanceof Map && filterState.has(key)
            ? filterState.get(key).map((item, index) => (
              <Text
                key={index}
                numberOfLines={1}
                style={{ marginEnd: 16, maxWidth: windowWith / 1.5 }}
              >
                {item}
              </Text>
            ))
            : null}
          <Icons.AntDesign name="arrowright" size={20} />
        </View>
      </Pressable>
    )
  }

  const handleDeleteAllFilter = () => {
    if (filterState instanceof Map) {
      setFilterState(new Map())
    }
  }

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, alignItems: 'center' }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              console.log(filterState)
              navigation.goBack({ categoryById: category_id })
            }}
          >
            <Icons.Feather name="x" size={30} />
          </TouchableOpacity>
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{ fontSize: 20, textAlign: 'center', flex: 2 }}
          >
            Bộ lọc & sắp xếp
          </MyText>
          <View style={{ flex: 1 }}>
            {
              filterState instanceof Map && filterState.size > 0 ? (
                <TouchableOpacity onPress={handleDeleteAllFilter}>
                  <Text style={{ textAlign: 'right' }}>
                    Xóa bộ lọc
                  </Text>
                </TouchableOpacity>
              ) : null
            }
          </View>
        </View>

        {loading ? ( // Display loading indicator
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.black} />
          </View>
        ) : (
          <>
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 16
              }}
            >
              <MyText>Sắp xếp theo</MyText>
              <Icons.AntDesign name="arrowright" size={20} />
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 16
              }}
            >
              <MyText>Giá</MyText>
              <Icons.AntDesign name="plus" size={20} />
            </Pressable>

            <FlatList data={filterData} renderItem={renderItem} keyExtractor={item => item.key} />
          </>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          paddingVertical: 16,
          paddingHorizontal: 20,
          backgroundColor: Colors.grayBg,
          width: '100%'
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.black,
            padding: 16
          }}
          onPress={() => {
            if (Array.isArray(products) && products.length > 0) {
              navigation.navigate('ItemCategories', { _products: products })
            } else {
              console.log('No products to display')
            }
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontSize: 16,
              textAlign: 'center',
              fontFamily: 'Montserrat-SemiBold'
            }}
          >
            Hiện thị {products ? products.length : ''} sản phẩm
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Filter

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    paddingHorizontal: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
