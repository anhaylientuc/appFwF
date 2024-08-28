import qs from 'qs'
import React, { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { View } from 'react-native-picasso'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'

import Names from 'src/constants/Names'
import { FilterContext } from 'src/contexts/FilterProvider'
import NewHTTP from 'src/utils/http/NewHTTP'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const SearchDetail = props => {
  const { route, navigation } = props
  const { keyword, productsNe } = route.params
  const [windowWith, setwindowWith] = useState(width)
  const [windowHeight, setwindowHeight] = useState(height)
  const [products, setproducts] = useState([])
  const [check, setcheck] = useState([])
  const [listId, setlistId] = useState([])
  const { filterState, setFilterState } = useContext(FilterContext)
  const [attributesArr, setattributesArr] = useState([])
  const [price, setprice] = useState([])
  const [numColumns, setNumColumns] = useState(2)
  const [loading, setLoading] = useState(false) // Add loading state
  console.log(JSON.stringify(productsNe, null, 2))
  const [title, settitle] = useState('')

  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        backgroundColor: Colors.white,
        bottom: 0,
        paddingVertical: 8,
        height: 54
      }
    })
    const fetchData = async () => {
      try {
        if (keyword != '') {
          const response = await NewHTTP.getProducts({ keyword: keyword })
          setlistId(response.map(item => item._id))
          setproducts(response)
          setwindowWith(width / 2)
          setwindowHeight(height / 2.4)
          settitle(keyword)
        }
      } catch (error) {}
    }
    fetchData()
  }, [])

  const handleColum = () => {
    if (numColumns) {
      setNumColumns(null)
      setwindowWith(width)
      setwindowHeight(height)
    } else {
      setNumColumns(2)
      setwindowWith(width / 2)
      setwindowHeight(height / 2.4)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const newMap = new Map(filterState)
        const newArr = []
        for (const [key, value] of newMap.entries()) {
          if (key == 'Giá') {
            setprice(value)
            newArr.push({ key: 'Giá', value: 'Giá' })
            continue
          } else {
            value.map(item => {
              newArr.push({ key: key, value: item })
            })
          }
        }
        setattributesArr(newArr)
        // console.log(listId)
        await fetchProducts()
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [filterState])

  const removeAttribute = (attribute, index) => {
    try {
      //setLoading(true)
      const newArr = attributesArr.filter(
        item => item.key != attribute.key || item.value != attribute.value
      )
      const newMap = new Map()
      newArr.map(item => {
        const { key, value } = item
        if (!newMap.has(key)) {
          newMap.set(key, [])
        }
        if (key == 'Giá') newMap.set(key, price)
        else newMap.get(key).push(value)
      })
      setFilterState(newMap)
    } catch (error) {
      console.log(error)
    } finally {
      //setLoading(false)
    }
  }
  const fetchProducts = async () => {
    const query = {}
    console.log(products.length)
    query.listId = listId

    const attributes = []
    for (const [key, value] of filterState.entries()) {
      if (key == 'Giá') {
        const listPrice = filterState.get(key)
        query.minPrice = listPrice[0]
        query.maxPrice = listPrice[1]
        continue
      }
      attributes.push({ key, value })
    }
    if (attributes.length > 0) query.attributes = attributes
    const queryString = qs.stringify(query)
    const res = await NewHTTP.getFilter(queryString)
    const { _attributes, _products } = res
    setproducts(_products)
  }
  function swapNe(x) {
    try {
      if (!products || products.length === 0) return

      const newProducts = products.map(product => {
        const { images } = product

        // Kiểm tra nếu images tồn tại và có ít nhất 2 phần tử
        if (images && images.length > x) {
          ;[images[x], images[x ^ 1]] = [images[x ^ 1], images[x]]
        }

        return { ...product, images }
      })

      setproducts(newProducts)
    } catch (error) {
      console.log(error)
    }
  }

  const renderItem = ({ item }) => {
    const { name, images, base_price } = item
    return (
      <KeyboardAvoidingView style={{ flexDirection: 'row' }}>
        <View
          style={{
            marginBottom: 16,
            width: windowWith - 20
          }}
        >
          <ScrollView
            pagingEnabled
            onScroll={this.change}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: Colors.grayBg
            }}
            horizontal
          >
            {images.map((image, index) =>
              image.url ? ( // Ensure `image.url` is not an empty string
                <FastImage
                  key={index} // Use a unique key if available
                  resizeMode={numColumns ? 'contain' : 'cover'}
                  style={{
                    width: windowWith - 20,
                    height: windowHeight
                  }}
                  source={{
                    uri: image.url,
                    priority: FastImage.priority.high
                  }}
                />
              ) : null
            )}
          </ScrollView>
          <TouchableOpacity onPress={() => handleClickItem(item)} style={{ padding: 16 }}>
            <Text numberOfLines={1} style={styles.txt_title}>
              {name}
            </Text>
            <Text style={[styles.txt_description, { fontSize: 14 }]}>
              {formatCurrencyVND(base_price)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: 8 }} />
      </KeyboardAvoidingView>
    )
  }

  const handleClickItem = item => {
    const { _id, product_id } = item
    //swapNe(1)
    navigation.navigate('ProductDetail', { _id, product_id })
  }
  const handleClickFilter = () => {
    navigation.navigate('Filter', { listIdConst: listId, action: 'search' })
  }
  const formatCurrencyVND = number => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setFilterState(new Map())
            navigation.goBack()
          }}
        >
          <Icons.MaterialIcons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={[styles.txt_title, { fontSize: 18 }]}>{keyword ? keyword : title}</Text>
        <View style={{ width: 20 }}></View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 32,
            marginTop: 16
          }}
        >
          <TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.txt_title}>Nhóm hàng</Text>
              <Icons.MaterialIcons name="expand-more" size={24} style={{ marginStart: 8 }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              handleClickFilter()
            }}
          >
            <Text style={[styles.txt_title]}>Bộ lọc & Sắp xếp</Text>
            <Icons.MaterialIcons name="tune" size={20} style={{ marginStart: 8 }} />
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 10,
              flexWrap: 'wrap' // Allows wrapping of items to next line
            }}
          >
            {attributesArr &&
              attributesArr.map((item, index) => {
                const { value } = item
                return (
                  <View
                    key={item.value} // Sử dụng giá trị item làm key cho mỗi View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      margin: 4,
                      backgroundColor: '#FFFFFF	'
                    }}
                  >
                    <Text style={{ marginRight: 0, paddingHorizontal: 5 }}>
                      {Names[value] ? Names[value] : value}
                    </Text>
                    <TouchableOpacity
                      style={{ backgroundColor: '#FFE4E1', padding: 5 }}
                      onPress={() => removeAttribute(item, index)}
                    >
                      <Icons.MaterialIcons name={'close'} size={16} color={Colors.black} />
                    </TouchableOpacity>
                  </View>
                )
              })}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
            backgroundColor: Colors.white
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                if (!check[0]) {
                  const newCheck = [...check]
                  newCheck[0] = 1
                  newCheck[1] = 0
                  setcheck(newCheck)
                  swapNe(0)
                }
              }}
            >
              <View>
                <Text style={styles.txt_description}>Người mẫu</Text>
                {check[0] ? (
                  <View style={{ width: '100%', height: 1, backgroundColor: 'red' }}></View>
                ) : null}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!check[1]) {
                  const newCheck = [...check]
                  newCheck[1] = 1
                  newCheck[0] = 0
                  setcheck(newCheck)
                  swapNe(1)
                }
              }}
            >
              <View style={{ marginStart: 8 }}>
                <Text style={[styles.txt_description]}>Sản phẩm</Text>
                {check[1] ? <View style={{ height: 1, backgroundColor: 'red' }}></View> : null}
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <Text style={styles.txt_description}>{products ? products.length : 0} Sản phẩm</Text>
            <TouchableOpacity onPress={() => handleColum()} style={{ marginStart: 16 }}>
              <Icons.MaterialCommunityIcons
                name={!numColumns ? 'view-module' : 'view-list'}
                size={24}
                color={Colors.red}
              />
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 400 }}>
            <ActivityIndicator size="large" color={Colors.red} />
          </View>
        ) : products && products.length > 0 ? (
          <FlatList
            // render Item Product by Category
            style={{ paddingHorizontal: 16, backgroundColor: Colors.white }}
            keyExtractor={item => item._id}
            scrollEnabled={false}
            numColumns={numColumns}
            key={numColumns}
            showsVerticalScrollIndicator={false} // thanh cuộn
            data={products}
            renderItem={renderItem}
          />
        ) : loading ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 400 }}>
            <Text style={[styles.txt_title, { fontSize: 18 }]}>Chưa có sản phẩm</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  )
}
export default SearchDetail
const styles = StyleSheet.create({
  txt_description: {
    color: Colors.black2,
    fontFamily: 'Montserrat-Medium',
    fontSize: 10
  },
  txt_title: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.black2
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.grayBg
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16
  }
})
