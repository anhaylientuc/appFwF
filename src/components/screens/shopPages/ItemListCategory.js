import BottomSheet from '@devvie/bottom-sheet'
import { useIsFocused } from '@react-navigation/native'
import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { FilterContext } from 'src/contexts/FilterProvider'

import MyText from 'src/constants/FontsStyle'
import { getCategoryById, getProducts } from 'src/utils/http/NewHTTP'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const ItemCategoryWomen = props => {
  const sheetRef = useRef(null)
  const {
    navigation,
    route: {
      params: { categoryById, _products, params }
    }
  } = props
  console.log(params)
  const [windowWith, setwindowWith] = useState(width)
  const [windowHeight, setwindowHeight] = useState(height)
  const [categoriesById, setCategoriesById] = useState([])
  const [products, setproducts] = useState([])
  const [addFavorite, setAddFavorite] = useState(false)
  const [numColumns, setNumColumns] = useState(2)
  const [selected, setSelected] = useState(DataSortBy)
  const [nameCategoryById, setnameCategoryById] = useState('')
  const [selectedProductId, setselectedProductId] = useState(null)
  const { filterState, setFilterState } = useContext(FilterContext)
  const isFocusScreen = useIsFocused()
  // const dataLength = stor
  // set Bottom navigation on

  const setBottomBar = () => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        backgroundColor: Colors.white,
        bottom: 0,
        paddingVertical: 16,
        height: 68
        // position: 'absolute'
      }
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isFocusScreen) {
          if (_products) {
            setproducts(_products)
          } else {
            setproducts(products)
          }
        }

        const response = await getCategoryById(categoryById)
        setnameCategoryById(response.name)
        const { _id, name, parentID, image } = response
        const arr = response.child
        setCategoriesById([{ _id: _id, name: name, parentID: parentID, image: image }, ...arr])

        setwindowWith(width / 2)
        setwindowHeight(height / 2.4)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
    fetchData()
  }, [isFocusScreen])

  console.log('>>>', JSON.stringify(products, null, 2))
  // set useRef
  const imagesModel = products.map(item => item.images)

  const [isShowProducts, setIsShowProducts] = useState(false)
  const handlePressModel = () => {
    if (isShowProducts == false) {
      console.log(JSON.stringify(imagesModel, null, 2))
      const newData = products.map((item, index) => {
        ;[item.images[1], item.images[0]] = [item.images[0], item.images[1]]
        return item
      })
      setIsShowProducts(true)
      setproducts(newData)
    }
  }
  const handlePressProduct = () => {
    if (isShowProducts == true) {
      console.log(JSON.stringify(imagesModel, null, 2))
      const newData = products.map((item, index) => {
        ;[item.images[0], item.images[1]] = [item.images[1], item.images[0]]
        return item
      })
      setIsShowProducts(false)
      setproducts(newData)
    }
  }

  const handleAddFavorite = () => {
    setAddFavorite(!addFavorite)
  }
  const handlePresentModal = () => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
    sheetRef.current?.open()
  }
  // const numColumns = 2
  // logic onClick set View Flatlist
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

  // logic handle select Items bottom sheet
  const handleSelect = (item, index) => {
    const newItem = selected.map((e, index) => {
      if (e.id == item.id) {
        return { ...e, selected: true }
      } else {
        return { ...e, selected: false }
      }
    })

    setSelected(newItem)
    sheetRef.current.close()
    setBottomBar()
  }

  const [productsParent, setproductsParent] = useState([])

  // Logic: onclick set product by category Id
  const handlePressedCategoryId = async _id => {
    ;(async () => {
      const version = 2
      const category_id = _id
      try {
        setFilterState([])
        const products = await getProducts({ version, category_id })
        const productsParent = await getProducts({ version: 1, category_id })
        // setproductsParent(productsParent[0])
        setproductsParent(productsParent[0].category_id)
        setproducts(products)
        setselectedProductId(_id)

        // console.log(JSON.stringify(products, null, 2))
      } catch (error) {
        console.error('Error:', error)
        // Handle errors appropriately in your application
      }
    })()
  }

  // Slide show image
  const [activated, setActivated] = useState(0)
  change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
    if (slide != activated) {
      setActivated(slide)
    }
  }
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

  // const product_id = products.map(item => item._id)
  // console.log(product_id)
  // if numColumns = null  => render
  const renderItems = ({ item }) => {
    const {
      _id,
      name,
      images,
      base_price,
      discount_price,
      category_id,
      attributes,
      description,
      product_id,
      product_Name,
      code
    } = item

    // format base_price
    function formatCurrency(amount, options = {}) {
      const { currency = 'VND', locale = 'vi-VN' } = options

      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
      })
      return formatter.format(amount)
    }

    // Example usage
    const amount = base_price
    const formattedCurrency = formatCurrency(amount)
    // Output: 499.000,00 VND
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
            {images.map((image, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() =>
                  props.navigation.navigate('ProductDetail', {
                    _id: _id,
                    product_id: product_id,
                    product_Name: name,
                    images: images,
                    base_price: base_price,
                    category_id: category_id,
                    attributes: attributes,
                    description: description,
                    code: code
                  })
                }
              >
                <Image
                  resizeMode={numColumns ? 'contain' : 'cover'}
                  key={index}
                  style={{
                    width: windowWith - 20,
                    height: windowHeight
                  }}
                  source={{ uri: image.url }}
                />
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.StyleFavorites,
              { right: numColumns ? 8 : 24 },
              { bottom: numColumns ? windowHeight / 3 : windowHeight / 7 },
              { width: numColumns ? 32 : 40 },
              { height: numColumns ? 32 : 40 }
            ]}
          >
            <Icons.MaterialIcons
              style={{
                textAlign: 'center'
              }}
              name={'favorite-outline'}
              size={numColumns ? 20 : 28}
              color={Colors.gray}
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center'
            }}
          >
            <MyText style={styles.renderItems.txt_category_name}>{/* {category_name} */}</MyText>
            <Text numColumns={1} style={styles.renderItems.txt_product_name}>
              {name}
            </Text>
            <MyText style={styles.renderItems.txt_price}>{formattedCurrency}</MyText>
          </View>
        </View>
        <View style={{ width: 8 }} />
      </KeyboardAvoidingView>
    )
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
            // Logic: onClick -> back về Screen trước và set on BottomNavigation Bar
            onPress={() => {
              setBottomBar()
              props.navigation.goBack()
            }}
          >
            <Icons.Ionicons name={'chevron-back'} size={24} />
          </TouchableOpacity>
          <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_title}>
            {nameCategoryById}
          </MyText>

          <TouchableOpacity onPress={() => props.navigation.navigate('SearchPage')}>
            <Icons.Ionicons name={'search'} size={24} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 8, paddingBottom: 16 }}>
          {/* <Text>{categoryNameById}</Text> */}
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
          backgroundColor: Colors.white
        }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Filter', {
              category_id: productsParent,
              quantityPr: products.length
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
          {/* <TouchableOpacity
              // Logic: Open Bottom Sheet and set BottomNavigation -> off
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
              onPress={() => handlePresentModal()}
            >
              <Icons.MaterialCommunityIcons name={'sort'} size={28} />
              <MyText style={styles.txt_filters}>Sort by to</MyText>
            </TouchableOpacity> */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MyText style={{ fontSize: 12 }}>{products.length} Sản phẩm</MyText>
            <TouchableOpacity onPress={() => handleColum()} style={{ marginStart: 16 }}>
              <Icons.MaterialCommunityIcons
                name={!numColumns ? 'view-module' : 'view-list'}
                size={28}
                color={Colors.red}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          // render Item Product by Category
          style={{ marginBottom: '25%', paddingHorizontal: 16 }}
          scrollEnabled={false}
          numColumns={numColumns}
          key={numColumns}
          showsVerticalScrollIndicator={false} // thanh cuộn
          data={products}
          renderItem={renderItems}
        />
      </ScrollView>
      <View>
        <BottomSheet
          // bottom sheet
          ref={sheetRef}
          style={{
            backgroundColor: Colors.white
          }}
          height={'55%'}
          onClose={() => {
            setTimeout(() => {
              setBottomBar()
            }, 500)
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{
                color: Colors.black,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500',
                marginBottom: 32
              }}
            >
              Sort by
            </MyText>
            <FlatList
              // render Item Data Sort by
              data={selected}
              scrollEnabled={false}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleSelect(item, index)
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: item.selected ? Colors.red : Colors.white
                      }}
                    >
                      <MyText
                        style={{
                          fontSize: 16,
                          padding: 16,
                          fontWeight: item.selected ? '500' : '400',
                          color: item.selected ? Colors.white : Colors.black
                        }}
                      >
                        {item.subject}
                      </MyText>
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
            <View style={{ height: 50 }} />
          </ScrollView>
        </BottomSheet>
      </View>
    </View>
  )
}

export default ItemCategoryWomen

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
      color: Colors.black,
      fontStyle: 'normal',
      fontFamily: 'Montserrat-SemiBold'
    },
    txt_category_name: {
      fontSize: 12,
      fontWeight: '400',
      color: Colors.gray,
      fontStyle: 'normal'
    },
    img_activated: {
      width: 14,
      height: 14
    },
    txt_price: {
      fontSize: 14,
      color: Colors.black,
      lineHeight: 20,
      fontWeight: '400',
      marginTop: 3
    }
  },

  txt_bottom_sheet: {
    fontSize: 16,
    marginTop: 32,
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: '400',
    color: Colors.black
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
    fontSize: 18,
    Colors: Colors.black,
    fontWeight: '500'
  },

  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  }
})

const DataSortBy = [
  {
    id: 1,
    subject: 'Popular',
    selected: false
  },
  {
    id: 2,
    subject: 'Newest',
    selected: false
  },
  {
    id: 3,
    subject: 'Customer review',
    selected: false
  },
  {
    id: 4,
    subject: 'Price: lowest to high',
    selected: true
  },
  {
    id: 5,
    subject: 'Price: lowest to low',
    selected: false
  }
]
