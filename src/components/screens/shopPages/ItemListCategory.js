import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React, { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
import { getCategoryById, getProducts } from 'src/utils/http/NewHTTP'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const ItemCategoryWomen = props => {
  const [windowWith, setwindowWith] = useState(width)
  const [windowHeight, setwindowHeight] = useState(height)
  const {
    navigation,
    route: {
      params: { categoryById }
    }
  } = props
  // console.log(categoryById)
  const [categoriesById, setCategoriesById] = useState([])
  const [products, setproducts] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const BottomSheetRef = useRef(null)
  const [addFavorite, setAddFavorite] = useState(false)
  const [numColumns, setNumColumns] = useState(2)
  const [selected, setSelected] = useState(DataSortBy)
  const snapPoints = ['50%', '60%']
  const [nameCategoryById, setnameCategoryById] = useState('')
  const [selectedProductId, setselectedProductId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoryById(categoryById)
        setnameCategoryById(response.name)
        const { _id, name, parentID, image } = response
        const arr = response.child
        setCategoriesById([{ _id: _id, name: name, parentID: parentID, image: image }, ...arr])
        setproducts(products)
        setwindowWith(width / 2)
        setwindowHeight(height / 2)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
    fetchData()
  }, [])

  // set useRef

  const handleAddFavorite = () => {
    setAddFavorite(!addFavorite)
  }
  const handlePresentModal = () => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
    BottomSheetRef.current?.present()
    setTimeout(() => {
      setIsOpen(true)
    }, 300)
  }
  // const numColumns = 2

  // logic onClick set View Flatlist
  const handleColum = () => {
    if (numColumns) {
      setNumColumns(null)
      setwindowWith(width)
      setwindowHeight(height * 1)
    } else {
      setNumColumns(2)
      setwindowWith(width / 2)
      setwindowHeight(height / 2)
    }
  }

  const setBottomBar = () => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        borderTopEndRadius: 12,
        borderTopStartRadius: 12,
        paddingTop: 10,
        paddingBottom: 10,
        height: 68,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
      }
    })
  }

  // logic handle select Items bottom sheet

  const handleSelect = (item, index) => {
    const newItem = selected.map((e, index) => {
      if (e.id == item.id) {
        // console.log('selectItem: ', item.subject)
        return { ...e, selected: true }
      } else {
        return { ...e, selected: false }
      }
    })

    setSelected(newItem)

    BottomSheetRef.current.close()
    setBottomBar()
  }
  const handlePressedCategoryId = async _id => {
    ;(async () => {
      const version = 2
      const category_id = _id
      try {
        const products = await getProducts({ version, category_id })
        // console.log('Fetched products:', products)
        setproducts(products)
        setselectedProductId(_id)
      } catch (error) {
        console.error('Error:', error)
        // Handle errors appropriately in your application
      }
    })()
  }
  const renderListCategoryById = ({ item }) => {
    const { _id, name } = item
    return (
      <View>
        <TouchableOpacity
          onPress={() => handlePressedCategoryId(_id)}
          style={{
            backgroundColor: selectedProductId === item._id ? Colors.black : Colors.bgBottomSheet,
            marginStart: 16,
            borderRadius: 29,
            paddingVertical: 8,
            paddingHorizontal: 16,
            justifyContent: 'center',
            borderWidth: selectedProductId === item._id ? 0 : 1
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
      <View
        style={[
          styles.renderItems.container,
          {
            backgroundColor: isOpen ? Colors.bgBottomSheet : Colors.white
          }
        ]}
      >
        <View
          style={{
            marginBottom: 16,
            width: windowWith
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
              <Image
                resizeMode="cover"
                key={index}
                style={{ width: windowWith, height: windowHeight }}
                source={{ uri: image.url }}
              />
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.StyleFavorites}>
            <Icons.MaterialIcons
              style={{
                textAlign: 'center'
              }}
              name={'favorite-outline'}
              size={20}
              color={Colors.gray}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ProductWomen', {
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
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingHorizontal: 16
            }}
          >
            <MyText style={styles.renderItems.txt_category_name}>{/* {category_name} */}</MyText>
            <MyText
              numColumns={1}
              fontFamily={'Montserrat-SemiBold'}
              style={styles.renderItems.txt_product_name}
            >
              {name}
            </MyText>
            <MyText style={styles.renderItems.txt_price}>{formattedCurrency}</MyText>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  const [activated, setActivated] = useState(0)
  change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
    if (slide != activated) {
      setActivated(slide)
    }
  }

  return (
    <BottomSheetModalProvider>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: isOpen ? Colors.gray : Colors.grayBg
        }}
      >
        <View
          style={{
            backgroundColor: isOpen ? Colors.gray : Colors.white,
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

            <Icons.Ionicons name={'search'} size={24} />
          </View>

          <View>
            {/* <Text>{categoryNameById}</Text> */}
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={renderListCategoryById}
              data={categoriesById}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 16,
                elevation: 8,
                shadowColor: Colors.gray,
                paddingHorizontal: 16
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Icons.MaterialIcons name={'filter-list'} size={28} />
                <MyText style={styles.txt_filters}>Filters</MyText>
              </TouchableOpacity>
              <TouchableOpacity
                // Logic: Open Bottom Sheet and set BottomNavigation -> off
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={() => handlePresentModal()}
              >
                <Icons.MaterialCommunityIcons name={'sort'} size={28} />
                <MyText style={styles.txt_filters}>Sort by to</MyText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleColum()}>
                <Icons.MaterialCommunityIcons
                  name={!numColumns ? 'view-module' : 'view-list'}
                  size={28}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          style={{
            backgroundColor: isOpen ? Colors.bgBottomSheet : Colors.grayBg 
          }}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            // render Item Product by Category
            style={{ marginBottom: '25%' , }}
            scrollEnabled={false}
            numColumns={numColumns}
            key={numColumns}
            showsVerticalScrollIndicator={false} // thanh cuộn
            data={products}
            renderItem={renderItems}
          />
        </ScrollView>
        <View>
          <BottomSheetModal
            // bottom sheet
            ref={BottomSheetRef}
            snapPoints={snapPoints}
            index={0}
            backgroundStyle={{
              backgroundColor: Colors.white,
              borderRadius: 34
            }}
            onDismiss={() => {
              setIsOpen(false) & setBottomBar()
            }}
          >
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
          </BottomSheetModal>
        </View>
      </View>
    </BottomSheetModalProvider>
  )
}

export default ItemCategoryWomen

const styles = StyleSheet.create({
  StyleFavorites: {
    backgroundColor: Colors.white,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 36,
    bottom: 90,
    elevation: 8,
    shadowColor: '#52006A',
    right: 16
  },
  renderItems: {
    container: {},
    txt_product_name: {
      fontSize: 16,
      marginTop: 5,
      color: Colors.black,
      fontWeight: '500',
      fontStyle: 'normal'
    },
    txt_category_name: {
      fontSize: 11,
      fontWeight: '400',
      color: Colors.gray,
      fontStyle: 'normal',
      marginTop: 6
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
    marginStart: 6,
    fontSize: 12,
    fontWeight: '400',
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
    fontWeight: '500',
    lineHeight: 22
  },

  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginTop: 44,
    marginBottom: 8
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
