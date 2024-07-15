import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import React, { useRef, useState } from 'react'

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
import { DataItemCategoryWomen } from 'src/constants/Databases'

const ItemCategoryWomen = props => {
  const { navigation } = props
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

  // if numColumns = null  => render
  const renderItemColumTo = ({ item }) => {
    const { _id, category_name, product_name, price, review, image } = item
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
            source={{ uri: image }}
          />
          <View
            style={{
              backgroundColor: Colors.white,
              width: 48,
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              borderRadius: 36,
              bottom: 1,
              top: 160,
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
        <View style={{ marginStart: 4 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}
          >
            <Image
              style={styles.renderItemColumTo.img_activated}
              source={require('@assets/activated.png')}
            />
            <Image
              style={styles.renderItemColumTo.img_activated}
              source={require('@assets/activated.png')}
            />
            <Image
              style={styles.renderItemColumTo.img_activated}
              source={require('@assets/activated.png')}
            />
            <Image
              style={styles.renderItemColumTo.img_activated}
              source={require('@assets/activated.png')}
            />
            <Image
              style={styles.renderItemColumTo.img_activated}
              source={require('@assets/activated.png')}
            />
            <Text
              style={{
                fontSize: 10,
                fontWeight: '400',
                color: Colors.gray,
                fontStyle: 'normal'
              }}
            >
              ( {review})
            </Text>
          </View>
          <Text style={styles.renderItemColumTo.txt_category_name}>
            {category_name}
          </Text>
          <Text style={styles.renderItemColumTo.txt_product_name}>
            {product_name}
          </Text>
          <Text style={styles.renderItemColumTo.txt_price}>{price}$</Text>
        </View>
      </View>
    )
  }

  // if numColums = 2 => render
  const renderItemColumOne = ({ item }) => {
    const { _id, category_name, product_name, price, review, image } = item
    return (
      <View style={{ marginBottom: 26 }}>
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
            <TouchableOpacity
              style={styles.renderItemColumOne.image}
              onPress={() =>
                props.navigation.navigate('ProductWomen', { productId: _id })
              }
            >
              <Image
                style={styles.renderItemColumOne.image}
                source={{ uri: image }}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                style={styles.renderItemColumOne.image}
                source={{ uri: image }}
              />
            </TouchableOpacity>
            <View style={{ flex: 2, marginStart: 16 }}>
              <Text style={styles.renderItemColumOne.txt_product_name}>
                {product_name}
              </Text>
              <Text style={styles.renderItemColumOne.txt_category_name}>
                {category_name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8
                }}
              >
                <Image
                  style={styles.renderItemColumOne.img_activated}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.renderItemColumOne.img_activated}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.renderItemColumOne.img_activated}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.renderItemColumOne.img_activated}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.renderItemColumOne.img_activated}
                  source={require('@assets/activated.png')}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '400',
                    color: Colors.gray,
                    fontStyle: 'normal'
                  }}
                >
                  ( {review})
                </Text>
              </View>
              <Text style={styles.renderItemColumOne.txt_price}>{price}$</Text>
            </View>
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
            <Text style={styles.txt_title}>Women’s tops</Text>

            <Icons.Ionicons name={'search'} size={24} />
          </View>

          <View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.black,
                marginStart: 16,
                borderRadius: 29,
                height: 30,
                width: 100,

                justifyContent: 'center'
              }}
            >
              <Text style={{ color: Colors.white, textAlign: 'center' }}>
                T-shirts
              </Text>
            </TouchableOpacity>
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
                <Text style={styles.txt_filters}>Filters</Text>
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
                <Text style={styles.txt_filters}>Sort by to</Text>
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
            data={DataItemCategoryWomen}
            renderItem={numColumns ? renderItemColumTo : renderItemColumOne}
            keyExtractor={item => item.id}
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
            <Text
              style={{
                color: Colors.black,
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '500',
                marginBottom: 32
              }}
            >
              Sort by
            </Text>
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
                      <Text
                        style={{
                          fontSize: 16,
                          padding: 16,
                          fontWeight: item.selected ? '500' : '400',
                          color: item.selected ? Colors.white : Colors.black
                        }}
                      >
                        {item.subject}
                      </Text>
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
      borderRadius: 8
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
      height: '100%',
      width: '100%',
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
