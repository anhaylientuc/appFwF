import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import qs from 'qs'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { FilterContext } from 'src/contexts/FilterProvider'
import { formatCurrency, useStorage } from 'src/contexts/StorageProvider'
import NewHTTP, { getCategoryById, getProducts } from 'src/utils/http/NewHTTP'
import { ActivityIndicator } from 'react-native'
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const ItemCategories = props => {
  const {
    route: {
      params: { categoryById, _products }
    }
  } = props
  const navigation = useNavigation()
  const { storageFavorites, setStorageFavorites } = useStorage()
  const [windowWith, setwindowWith] = useState(width)
  const [windowHeight, setwindowHeight] = useState(height)
  const [categoriesById, setCategoriesById] = useState([])
  const [products, setproducts] = useState([])
  const [addFavorite, setAddFavorite] = useState(false)
  const [numColumns, setNumColumns] = useState(2)
  const [selected, setSelected] = useState()
  const [nameCategoryById, setnameCategoryById] = useState('')
  const [selectedProductId, setselectedProductId] = useState(null)
  const { filterState, setFilterState } = useContext(FilterContext)
  const isFocusScreen = useIsFocused()
  const [isShowProducts, setIsShowProducts] = useState(false)
  const [productsParent, setproductsParent] = useState([])
  const [favoritesIds, setFavoritesIds] = useState([])
  const [_id, set_id] = useState(null)
  const [attributesArr, setattributesArr] = useState([])
  const [price, setprice] = useState([])
  const [loading, setLoading] = useState(false) // Add loading state

  const setBottomBar = () => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        backgroundColor: Colors.white,
        bottom: 0,
        paddingVertical: 8,
        height: 54
      }
    })
  }

  useFocusEffect(
    useCallback(() => {
      if (navigation) {
        setBottomBar()
      }
      const loadFavorites = async () => {
        const storedFavorites = await AsyncStorage.getItem('my-favorites')
        if (storedFavorites) {
          const favorites = JSON.parse(storedFavorites)
          setFavoritesIds(favorites.map(favorite => favorite._id))
        }
      }
      loadFavorites()
    }, [navigation, storageFavorites])
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        //setproducts(products)
        const response = await getCategoryById(categoryById)
        setnameCategoryById(response.name)
        const { _id, name, parentID, image } = response
        const arr = response.child
        set_id(response._id)
        setCategoriesById([{ _id: _id, name: name, parentID: parentID, image: image }, ...arr])
        setwindowWith(width / 2)
        setwindowHeight(height / 2.4)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
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
      console.log(newArr)
      setattributesArr(newArr)
      await fetchProducts()
    }
    fetchData()
  }, [filterState])

  const handlePressModel = () => {
    if (isShowProducts === false) {
      const newData = products.map((item, index) => {
        ;[item.images[1], item.images[0]] = [item.images[0], item.images[1]]
        return item
      })
      setIsShowProducts(true)
      setproducts(newData)
    }
  }

  const handlePressProduct = () => {
    if (isShowProducts === true) {
      const newData = products.map((item, index) => {
        ;[item.images[0], item.images[1]] = [item.images[1], item.images[0]]
        return item
      })
      setIsShowProducts(false)
      setproducts(newData)
    }
  }

  // Logic AddFavorites
  const handleAddFavorite = async item => {
    const {
      _id,
      name,
      images,
      base_price,
      discount_price,
      category_id,
      attributes,
      product_id,
      code
    } = item

    const name_filter = attributes.filter(params => params.key === 'Màu sắc')
    const newFavoritesProduct = {
      _id: _id,
      image: images[0].url,
      product_Name: name,
      base_price: base_price,
      color: name_filter[0]?.value,
      product_id: product_id,
      category_id: category_id,
      code: code,
      discount_price: discount_price,
      attributes: attributes,
      nameCategoryById: nameCategoryById
    }

    // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích chưa
    const isDuplicate = storageFavorites.some(favorite => favorite._id === _id)
    if (!isDuplicate) {
      const updateFavorites = [...storageFavorites, newFavoritesProduct]
      setStorageFavorites(updateFavorites)
      await AsyncStorage.setItem('my-favorites', JSON.stringify(updateFavorites))
    } else {
      // Xóa khỏi storageFavorites nếu _id đã tồn tại trong giỏ hàng
      const result = await AsyncStorage.getItem('my-favorites')
      let storage = []
      if (result !== null) {
        storage = JSON.parse(result)
      }
      const newStorage = storage.filter(s => s._id !== _id)
      setStorageFavorites(newStorage)
      await AsyncStorage.setItem('my-favorites', JSON.stringify(newStorage))
    }
  }

  const handleColum = () => {
    if (numColumns) {
      setNumColumns(null)
      setwindowWith(width)
      setwindowHeight(height / 1.6)
    } else {
      setNumColumns(2)
      setwindowWith(width / 2)
      setwindowHeight(height / 2.4)
    }
  }

  // Logic: onclick set product by category Id
  const handlePressedCategoryId = async _id => {
    setLoading(true)
    setproducts([])
    const version = 2
    const category_id = _id
    try {
      //if(filterState instanceof Map && filterState.size()>0)
      setFilterState([])
      setselectedProductId(_id)
      const productsParent = await getProducts({ version: 1, category_id })
      if (productsParent && productsParent.length > 0) {
        setproductsParent(productsParent[0].category_id)
      }
      const products = await getProducts({ version, category_id })
      //console.log(products.length)
      setproducts(products)

    } catch (error) {
      console.error('Error 1:', error)
    }
    finally {
      setLoading(false)
    }
  }

  // Danh sách loại sản phẩm
  const renderListCategoryById = ({ item }) => {
    const { _id, name } = item
    return (
      <View>
        <TouchableOpacity
          onPress={() => handlePressedCategoryId(_id)}
          style={{
            backgroundColor: selectedProductId === item._id ? Colors.red : Colors.white,
            marginStart: 16,
            borderRadius: 28,
            paddingVertical: 8,
            paddingHorizontal: 16,
            justifyContent: 'center',
            borderColor: selectedProductId === item._id ? Colors.red : Colors.black,
            borderWidth: 1
          }}
        >
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{
              color: selectedProductId === item._id ? Colors.white : Colors.black,
              textAlign: 'center'
            }}
          >
            {name}
          </MyText>
        </TouchableOpacity>
      </View>
    )
  }

  const renderItems = ({ item }) => {

    const { _id, name, images, base_price, product_id } = item
    const formattedCurrency = formatCurrency(base_price)

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
              backgroundColor: Colors.bgBottomSheet
            }}
            horizontal
          >
            {images.map(
              (image, index) =>
                image.url != '' && (
                  <FastImage
                    resizeMode={numColumns ? 'contain' : 'cover'}
                    key={index}
                    style={{
                      width: windowWith - 20,
                      height: windowHeight
                    }}
                    source={{
                      uri: image.url,
                      priority: FastImage.priority.high,
                    }}
                  />
                )
            )}
          </ScrollView>

          <TouchableOpacity
            onPress={() => handleAddFavorite(item)}
            style={[
              styles.StyleFavorites,
              { right: numColumns ? 12 : 32 },
              { bottom: numColumns ? windowHeight / 3 : windowHeight / 4 },
              { width: numColumns ? 32 : 40 },
              { height: numColumns ? 32 : 40 }
            ]}
          >
            <Icons.MaterialIcons
              style={{
                textAlign: 'center'
              }}
              name={favoritesIds.includes(_id) ? 'favorite' : 'favorite-outline'}
              size={numColumns ? 20 : 28}
              color={favoritesIds.includes(_id) ? Colors.red : Colors.gray}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetail', {
                _id: _id,
                product_id: product_id,
                nameCategoryById: nameCategoryById
              })
            }
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingBottom: 16
            }}
          >
            <Text numberOfLines={1} style={styles.renderItems.txt_product_name}>
              {name}
            </Text>
            <MyText style={styles.renderItems.txt_price}>{formattedCurrency}</MyText>
          </TouchableOpacity>
        </View>
        <View style={{ width: 8 }} />
      </KeyboardAvoidingView>
    )
  }

  // Xóa một thuộc tính khỏi attributesArr
  const removeAttribute = (attribute, index) => {
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
    console.log(newMap)
    setFilterState(newMap)
  }
  const fetchProducts = async () => {
    const query = {}
    query.category_id = productsParent
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
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white
      }}
    >
      <View
        style={{
          backgroundColor: Colors.white,
          elevation: 8,
          shadowColor: Colors.gray
        }}
      >

        <View style={styles.view_search}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Icons.Ionicons name={'chevron-back'} size={24} />
          </TouchableOpacity>
          <Text style={styles.txt_title}>{nameCategoryById}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SearchPage')}>
            <Icons.Ionicons name={'search'} size={24} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 8, paddingBottom: 16 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderListCategoryById}
            data={categoriesById}
          />
        </View>
      </View>
      <ScrollView
        style={{
          backgroundColor: Colors.white,
          flex: 1
        }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Filter', {
              category_id: productsParent
            })
          }
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16,
            justifyContent: 'center'
          }}
        >
          <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_filters}>
            Bộ lọc & sắp xếp
          </MyText>
          <Icons.MaterialIcons name={'filter-list'} size={28} style={{ marginStart: 16 }} />
        </TouchableOpacity>
        <View style={{ flex: 1, width: '100%', alignItems: 'center', marginBottom: 10 }}>
          <View
            style={{
              display: 'flex',
              height: '100%',
              width: 300,
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            {attributesArr &&
              attributesArr.map((item, index) => {
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
                    <Text style={{ marginRight: 0, paddingHorizontal: 5 }}>{item.value}</Text>
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
            alignItems: 'center',
            elevation: 8,
            shadowColor: Colors.gray,
            paddingHorizontal: 16,
            paddingBottom: 16
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => handlePressModel()}
              style={isShowProducts ? styles.btn_model_active : styles.btn_model_no_active}
            >
              <MyText style={{ fontSize: 12 }}>Người mẫu</MyText>
            </TouchableOpacity>
            <View style={{ width: 16 }} />
            <TouchableOpacity
              onPress={() => handlePressProduct()}
              style={!isShowProducts ? styles.btn_model_active : styles.btn_model_no_active}
            >
              <MyText style={{ fontSize: 12 }}>Sản phẩm</MyText>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MyText style={{ fontSize: 12 }}>{products && products.length} Sản phẩm</MyText>
            <TouchableOpacity onPress={() => handleColum()} style={{ marginStart: 16 }}>
              <Icons.MaterialCommunityIcons
                name={!numColumns ? 'view-module' : 'view-list'}
                size={28}
                color={Colors.red}
              />
            </TouchableOpacity>
          </View>
        </View>
        {
          loading ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 400 }}>
              <ActivityIndicator size="large" color={Colors.red} />
            </View>
          ) : (products && products.length > 0) ? (
            <FlatList
              // render Item Product by Category
              style={{ marginBottom: '25%', paddingHorizontal: 16 }}
              keyExtractor={item => item._id}
              scrollEnabled={false}
              numColumns={numColumns}
              key={numColumns}
              showsVerticalScrollIndicator={false} // thanh cuộn
              data={products}
              renderItem={renderItems}
            />
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 400 }}>
              <Text style={{ fontSize: 18 }}>
                Chưa có sản phẩm
              </Text>
            </View>
          )
        }

      </ScrollView>
    </View>
  )
}

export default ItemCategories

const styles = StyleSheet.create({
  btn_model_active: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.red
  },
  btn_model_no_active: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.white
  },
  StyleFavorites: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 36,
    bottom: 80,
    elevation: 8,
    shadowColor: '#52006A'
  },
  renderItems: {
    container: { backgroundColor: Colors.white },
    txt_product_name: {
      fontSize: 16,
      marginTop: 8,

      color: Colors.black,
      fontStyle: 'normal',
      fontFamily: 'Montserrat-SemiBold'
    },

    txt_price: {
      fontSize: 14,
      color: Colors.black2,
      marginTop: 4
    }
  },

  txt_filters: {
    fontSize: 16,
    color: Colors.black
  },
  icons: {
    width: 24,
    height: 24,
    backgroundColor: Colors.white
  },
  txt_title: {
    fontSize: 16,
    color: Colors.black2,
    fontFamily: 'Montserrat-SemiBold'
  },

  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  }
})
