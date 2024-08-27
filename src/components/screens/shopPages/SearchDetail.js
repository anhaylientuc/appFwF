import React, { useEffect, useState, useContext } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import { View } from 'react-native-picasso'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import NewHTTP from 'src/utils/http/NewHTTP'
import { FilterContext } from 'src/contexts/FilterProvider'
import Names from 'src/constants/Names'
import qs from 'qs'
export const SearchDetail = props => {
  const screenWidth = Dimensions.get('window').width
  const itemWidth = screenWidth / 2
  const { route, navigation } = props
  const { keyword, productsNe } = route.params
  const [products, setproducts] = useState([])
  const [check, setcheck] = useState([])
  const [listId, setlistId] = useState([])
  const { filterState, setFilterState } = useContext(FilterContext)
  const [attributesArr, setattributesArr] = useState([])
  const [price, setprice] = useState([])

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

        if (keyword != "") {
          const response = await NewHTTP.getProducts({ keyword: keyword })
          setlistId(response.map(item => item._id))
          setproducts(response)
        }

      } catch (error) {

      }

    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        //setLoading(true)
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
        console.log(listId)
        await fetchProducts()
      } catch (error) {
        console.log(error)
      } finally {
        //setLoading(false)
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
      <TouchableOpacity
        style={{
          width: itemWidth,
          padding: 8,
          backgroundColor: Colors.white
        }}
      >
        <ScrollView
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ margin: 5 }}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.url }}
              style={{ width: itemWidth - 10, height: 300 }} // Adjusted height for better appearance
            />
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => handleClickItem(item)} style={{ padding: 16 }}>
          <Text style={styles.txt_title}>{name}</Text>
          <Text style={[styles.txt_description, { fontSize: 14 }]}>
            {formatCurrencyVND(base_price)}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
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
        <Text style={[styles.txt_title, { fontSize: 18 }]}>{keyword}</Text>
        <View style={{ width: 20 }}></View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16
        }}
      >
        <TouchableOpacity>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.txt_title, { fontSize: 16 }]}>Nhóm hàng</Text>
            <Icons.MaterialIcons name="expand-more" size={24} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 8 }} onPress={() => { handleClickFilter() }}>
          <Text style={[styles.txt_title, { fontSize: 16 }]}>Bộ lọc&Sắp xếp</Text>
          <Icons.MaterialIcons name="tune" size={24} />
        </TouchableOpacity>
      </View>
      <View style={{  width: '100%', alignItems: 'center', marginBottom: 10,  }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 10,
            flexWrap: 'wrap', // Allows wrapping of items to next line
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
          padding: 16
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
                <View style={{ width: '100%', height: 1, backgroundColor: 'black' }}></View>
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
            <View>
              <Text style={[styles.txt_description, { marginStart: 8 }]}>Sản phẩm</Text>
              {check[1] ? (
                <View style={{ width: '100%', height: 1, backgroundColor: 'black' }}></View>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Text style={styles.txt_description}>{products ? products.length : 0} Sản phẩm</Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Icons.MaterialIcons name="view-list" size={24} />
            <Icons.MaterialIcons name="view-module" size={24} />
          </View>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={2}
      />
    </View>
  )
}
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
