import BottomSheet from '@devvie/bottom-sheet'
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
import Colors from 'src/constants/Colors'

const ItemCategoryWomen = props => {
  const { navigation } = props
  const sheetRef = useRef(null)
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

  // if numColumns = null  => render
  const renderItemColumTo = ({ item }) => {
    const { _id, category_name, product_name, price, review, image } = item
    return (
      <View style={styles.renderItemColumTo.container}>
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
            <Image
              style={{
                width: 34,
                height: 34
              }}
              source={require('@assets/ic_add_favorite.png')}
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
          <View style={{ flexDirection: 'row', height: 124 }}>
            <Image
              style={styles.renderItemColumOne.image}
              source={{ uri: image }}
            />
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
                <Image
                  style={{
                    width: 34,
                    height: 34
                  }}
                  source={require('@assets/ic_add_favorite.png')}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  // logic handle state bottom sheet
  const [selected, setSelected] = useState(DataBottomSheet)
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
  }
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View
        style={{
          backgroundColor: Colors.white,
          elevation: 8,
          shadowColor: Colors.gray
        }}
      >
        <View style={styles.view_search}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('CategoryWomen')}
          >
            <Image
              style={styles.icons}
              source={require('@assets/ic_back.png')}
            />
          </TouchableOpacity>
          <Text style={styles.txt_title}>Women’s tops</Text>
          <Image
            style={styles.icons}
            source={require('@assets/ic_search.png')}
          />
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
              marginTop: 18,
              elevation: 8,
              shadowColor: Colors.gray,
              marginHorizontal: 16
            }}
          >
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Image
                style={styles.icons}
                source={require('@assets/ic_baseline_filter_list.png')}
              />
              <Text style={styles.txt_filters}>Filters</Text>
            </View>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => sheetRef.current?.open()}
            >
              <Image
                style={styles.icons}
                source={require('@assets/id_baseline_swap_vert.png')}
              />
              <Text style={styles.txt_filters}>Price: lowest to high</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleColum()}>
              <Image
                style={styles.icons}
                source={require('@assets/ic_View_modules.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={{ backgroundColor: Colors.grayBg }}>
        <FlatList
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
        <BottomSheet
          // bottom sheet
          ref={sheetRef}
          style={{
            backgroundColor: Colors.white,
            marginBottom: '10%'
          }}
        >
          <Text
            style={{
              color: Colors.black,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '500',
              marginBottom: 33
            }}
          >
            Sort by
          </Text>

          <FlatList
            data={selected}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => handleSelect(item, index)}>
                  <View
                    style={{
                      backgroundColor: item.selected ? Colors.red : Colors.white
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
        </BottomSheet>
      </View>
    </View>
  )
}

export default ItemCategoryWomen

const styles = StyleSheet.create({
  renderItemColumTo: {
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: Colors.grayBg,
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
    height: 88
  }
})
const DataItemCategoryWomen = [
  {
    id: 1,
    category_name: 'Bordy',
    product_name: 'Rigler',
    review: 1,
    price: 1,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/b8/3d/b83db12f18a434b25bddc027d4b3bf3b329b2e36.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  },
  {
    id: 2,
    category_name: 'Talbert',
    product_name: 'Presidey',
    review: 2,
    price: 2,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/b8/54/b8547cb07c52deb4a896206184c63c0a50429c20.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  },
  {
    id: 3,
    category_name: 'Bogey',
    product_name: 'Lawly',
    review: 3,
    price: 3,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/f6/7a/f67afb0615e9deecb932ae28402005b90ec0204e.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  },
  {
    id: 4,
    category_name: 'Eziechiele',
    product_name: 'Urian',
    review: 4,
    price: 4,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/3b/c0/3bc0c8ff7e99160e8866b8679fb35eb5743dfcc5.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  },
  {
    id: 5,
    category_name: 'Mozelle',
    product_name: 'Alford',
    review: 5,
    price: 5,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/1f/43/1f4313abf007bc5bb43ea8bb702b1b9b084a6918.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  },
  {
    id: 6,
    category_name: 'Corty',
    product_name: 'Luscott',
    review: 6,
    price: 6,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/ec/e7/ece7091b40965fb145e949e44f9275c03e2b86f1.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  },
  {
    id: 7,
    category_name: 'Britta',
    product_name: 'Cumpton',
    review: 7,
    price: 7,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/8f/c6/8fc64fc9d49b5d25f37b47390a9495f5a4131372.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[3]&call=url[file:/product/main]'
  },
  {
    id: 8,
    category_name: 'Kilian',
    product_name: "D'Ugo",
    review: 8,
    price: 8,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/7b/6c/7b6c113062e1090395d56288adf0086d4f3ca1ae.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  },
  {
    id: 9,
    category_name: 'Viole',
    product_name: 'Dello',
    review: 9,
    price: 9,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/73/ba/73bacc99e706d4309edd3b444884b600795c4814.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  },
  {
    id: 10,
    category_name: 'Philbert',
    product_name: 'Donalson',
    review: 10,
    price: 10,
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/fc/11/fc1120ed0bcaca0af81d050655932e1e9ff1312a.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  }
]

const DataBottomSheet = [
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
  }
  // {
  //   id: 5,
  //   subject: 'Price: highest to low',
  //   selected: false
  // },
  // {
  //   id: 6,
  //   subject: 'Price: highest to low',
  //   selected: false
  // }
]
