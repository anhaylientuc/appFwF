import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import React, { useEffect, useRef, useState } from 'react'

import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
import { getCategoryById, getProducts } from 'src/utils/http/NewHTTP'

const ItemCategoryWomen = props => {
  const {
    navigation,
    route: {
      params: { categoryById, categoryNameById }
    }
  } = props
  console.log(categoryById)
  const [categoriesById, setCategoriesById] = useState([])
  const [products, setproducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoryById(categoryById)
        const { _id, name, parentID, image } = response
        const arr = response.child
        setCategoriesById([
          { _id: _id, name: name, parentID: parentID, image: image },
          ...arr
        ])
        setproducts(products)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
    fetchData()
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const snapPoints = ['50%', '60%']

  // set useRef
  const BottomSheetRef = useRef(null)
  const [addFavorite, setAddFavorite] = useState(false)
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
  const [numColumns, setNumColumns] = useState()

  // logic onClick set View Flatlist
  const handleColum = () => {
    if (numColumns) {
      setNumColumns(null)
    } else {
      setNumColumns(2)
    }
  }

  const [selected, setSelected] = useState(DataSortBy)

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
        console.log('selectItem: ', item.subject)
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
    // if (_id == categoryById) {
    //   const response = await getCategoryById(_id)
    //   const children = response.child
    //   children.map(async (item, index) => {
    //     const category_id = item._id
    //     const responses = await getProducts(category_id)
    //     if (responses != null) {
    //       console.log(responses)
    //     }
    //     setproducts([...products, responses])
    //   })

    //   // const newProducts = await Promise.all(promises)
    // }
    ;(async () => {
      const version = 2
      const category_id = _id
      try {
        const products = await getProducts({ version, category_id })
        console.log('Fetched products:', products)
        setproducts(products)
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
            backgroundColor: Colors.black,
            marginStart: 16,
            borderRadius: 29,
            paddingVertical: 8,
            paddingHorizontal: 16,
            justifyContent: 'center'
          }}
        >
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{ color: Colors.white, textAlign: 'center' }}
          >
            {name}
          </MyText>
        </TouchableOpacity>
      </View>
    )
  }
  // if numColumns = null  => render
  const renderItemColumTo = ({ item }) => {
    const {
      _id,
      name,
      images,
      base_price,
      discount_price,
      category_id,
      attributes,
      description
    } = item
    return (
      <View
        style={[
          styles.renderItemColumTo.container,
          { backgroundColor: isOpen ? Colors.bgBottomSheet : Colors.white }
        ]}
      >
        <View>
          <Image
            style={styles.renderItemColumTo.image}
            source={{ uri: images[2].url }}
          />
          <View
            style={{
              backgroundColor: Colors.white,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              borderRadius: 36,
              bottom: 1,
              top: 164,
              elevation: 4,
              shadowColor: '#52006A',
              right: 0
            }}
          >
            <Icons.MaterialIcons
              style={{
                textAlign: 'center'
              }}
              name={'favorite-outline'}
              size={24}
              color={Colors.gray}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingHorizontal: 16
          }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}
          >
            <Image
              style={styles.renderItemColumTo.img_activated}
              source={require('@assets/images/activated.png')}
            />
            <Image
              style={styles.renderItemColumTo.img_activated}
              source={require('@assets/images/activated.png')}
            />
            <Image
              style={styles.renderItemColumTo.img_activated}
              source={require('@assets/images/activated.png')}
            />
            <Image
              style={styles.renderItemColumTo.img_activated}
              source={require('@assets/images/activated.png')}
            />
            <Image
              style={styles.renderItemColumTo.img_activated}
              source={require('@assets/images/activated.png')}
            />
            <MyText
              style={{
                fontSize: 10,
                fontWeight: '400',
                color: Colors.gray,
                fontStyle: 'normal'
              }}
            >
              {/* ( {review}) */}
            </MyText>
          </View>
          <MyText style={styles.renderItemColumTo.txt_category_name}>
            {/* {category_name} */}
          </MyText>
          <MyText
            numColumns={1}
            fontFamily={'Montserrat-SemiBold'}
            style={styles.renderItemColumTo.txt_product_name}
          >
            {name}
          </MyText>
          <MyText style={styles.renderItemColumTo.txt_price}>
            {base_price} VND
          </MyText>
        </View>
      </View>
    )
  }
  const [activated, setActivated] = useState(0)
  change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    )
    if (slide != activated) {
      setActivated(slide)
    }
  }
  // if numColums = 2 => render
  const renderItemColumOne = ({ item }) => {
    const {
      _id,
      name,
      images,
      base_price,
      code,
      discount_price,
      category_id,
      attributes,
      product_id,
      description
    } = item

    return (
      <View style={{ marginBottom: 16 }}>
        <View style={styles.renderItemColumOne.container}>
          <View
            style={{
              backgroundColor: Colors.white,
              width: 48,
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              borderRadius: 36,
              bottom: 10,
              top: 98,
              elevation: 4,
              shadowColor: '#52006A',
              right: 0
            }}
          >
            <TouchableOpacity onPress={() => handleAddFavorite()}>
              <Icons.MaterialIcons
                style={{
                  textAlign: 'center'
                }}
                name={addFavorite ? 'favorite-outline' : 'favorite'}
                size={24}
                color={addFavorite ? Colors.gray : Colors.red}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', height: 124 }}>
            <View>
              <ScrollView
                pagingEnabled
                onScroll={this.change}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ width: 124 }}
              >
                {images.map(
                  (image, index) => (
                    console.log(image.url),
                    (
                      <Image
                        resizeMode="cover"
                        key={index}
                        style={{ width: 124 }}
                        source={{ uri: image.url }}
                      />
                    )
                  )
                )}
              </ScrollView>
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  bottom: 4,
                  alignSelf: 'center',
                  elevation: 8,
                  shadowColor: Colors.black
                }}
              >
                {images.map((i, k) => (
                  <Text
                    key={k}
                    style={
                      k == activated
                        ? { color: Colors.white, margin: 3 }
                        : { color: Colors.gray, margin: 3 }
                    }
                  >
                    ⬤
                  </Text>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={{ flex: 2, marginStart: 16 }}
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
            >
              <MyText
                numColumns={1}
                fontFamily={'Montserrat-SemiBold'}
                style={styles.renderItemColumOne.txt_product_name}
              >
                {name}
              </MyText>
              <MyText style={styles.renderItemColumOne.txt_category_name}>
                {code}
              </MyText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8
                }}
              >
                <Image
                  style={styles.renderItemColumOne.img_activated}
                  source={require('@assets/images/activated.png')}
                />
                <Image
                  style={styles.renderItemColumOne.img_activated}
                  source={require('@assets/images/activated.png')}
                />
                <Image
                  style={styles.renderItemColumOne.img_activated}
                  source={require('@assets/images/activated.png')}
                />
                <Image
                  style={styles.renderItemColumOne.img_activated}
                  source={require('@assets/images/activated.png')}
                />
                <Image
                  style={styles.renderItemColumOne.img_activated}
                  source={require('@assets/images/activated.png')}
                />
                <MyText
                  style={{
                    fontSize: 10,
                    fontWeight: '400',
                    color: Colors.gray,
                    fontStyle: 'normal'
                  }}
                >
                  {/* ( {review}) */}
                </MyText>
              </View>

              <MyText style={styles.renderItemColumOne.txt_price}>
                {base_price} VND
              </MyText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <BottomSheetModalProvider>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: isOpen ? Colors.bgBottomSheet : Colors.grayBg
        }}
      >
        <View
          style={{
            backgroundColor: isOpen ? Colors.bgBottomSheet : Colors.white,
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
              {categoryNameById}
            </MyText>

            <Icons.Ionicons name={'search'} size={24} />
          </View>

          <View>
            {
              // render list Category
            }
            <View>
              {/* <Text>{categoryNameById}</Text> */}
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={renderListCategoryById}
                data={categoriesById}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 18,
                elevation: 8,
                shadowColor: Colors.gray,
                marginHorizontal: 16
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
            style={{ marginBottom: '25%' }}
            scrollEnabled={false}
            numColumns={numColumns}
            key={numColumns}
            showsVerticalScrollIndicator={false} // thanh cuộn
            data={products}
            renderItem={numColumns ? renderItemColumTo : renderItemColumOne}
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
                fontSize: 18,
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
                        backgroundColor: item.selected
                          ? Colors.red
                          : Colors.white
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
  renderItemColumTo: {
    container: {
      flex: 1,
      height: '100%',
      borderRadius: 8,
      marginHorizontal: 16,
      marginTop: 17,
      marginBottom: 12
    },
    image: {
      width: '100%',
      height: 184,
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8
    },
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
  renderItemColumOne: {
    container: {
      marginTop: 16,
      marginHorizontal: 16,
      borderRadius: 8,
      elevation: 4,
      shadowColor: '#52006A',
      justifyContent: 'center',
      backgroundColor: Colors.white
    },
    image: {
      flex: 1,
      height: 104,
      width: 104,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8
    },
    txt_product_name: {
      fontSize: 16,
      marginTop: 10,
      color: Colors.black,
      fontWeight: '500',
      fontStyle: 'normal'
    },
    txt_category_name: {
      fontSize: 12,
      fontWeight: '400',
      color: Colors.gray,
      fontStyle: 'normal',
      marginTop: 4
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
      marginTop: 8
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
    fontSize: 11,
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
