import React, { useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Colors from 'src/constants/Colors'

const ItemCategoryWomen = props => {
  // const numColumns = 2
  const [numColumns, setNumColumns] = useState()
  const handleColum = () => {
    if (numColumns) {
      setNumColumns(null)
    } else {
      setNumColumns(2)
    }
  }
  const renderItemColumTo = ({ item }) => {
    const { _id, category_name, product_name, price, review, image } = item
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          backgroundColor: '#F9F9F9',
          borderRadius: 8,
          marginHorizontal: 16,
          marginTop: 17,
          marginBottom: 12
        }}
      >
        <View>
          <Image
            style={{
              width: '100%',
              height: 184,

              borderRadius: 8
            }}
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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
            <Image style={{ width: 14, height: 14 }} source={require('@assets/activated.png')} />
            <Image style={{ width: 14, height: 14 }} source={require('@assets/activated.png')} />
            <Image style={{ width: 14, height: 14 }} source={require('@assets/activated.png')} />
            <Image style={{ width: 14, height: 14 }} source={require('@assets/activated.png')} />
            <Image style={{ width: 14, height: 14 }} source={require('@assets/activated.png')} />
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
          <Text
            style={{
              fontSize: 11,
              fontWeight: '400',
              color: Colors.gray,
              fontStyle: 'normal',
              marginTop: 6
            }}
          >
            {category_name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 5,
              color: Colors.black,
              fontWeight: '500',
              fontStyle: 'normal'
            }}
          >
            {product_name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.black,
              lineHeight: 20,
              fontWeight: '400',
              marginTop: 3
            }}
          >
            {price}$
          </Text>
        </View>
      </View>
    )
  }

  const renderItemColumOne = ({ item }) => {
    const { _id, category_name, product_name, price, review, image } = item
    return (
      <View style={{ marginBottom: 26 }}>
        <View
          style={{
            marginTop: 16,
            marginHorizontal: 16,
            borderRadius: 8,
            elevation: 4,
            shadowColor: '#52006A',
            justifyContent: 'center',
            backgroundColor: Colors.white
          }}
        >
          <View style={{ flexDirection: 'row', height: 124 }}>
            <Image
              style={{
                flex: 1,
                height: '100%',

                width: '100%',
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8
              }}
              source={{ uri: image }}
            />
            <View style={{ flex: 2, marginStart: 16 }}>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 10,
                  color: Colors.black,
                  fontWeight: '500',
                  fontStyle: 'normal'
                }}
              >
                {product_name}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '400',
                  color: Colors.gray,
                  fontStyle: 'normal',
                  marginTop: 4
                }}
              >
                {category_name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={{ width: 14, height: 14 }}
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
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.black,
                  lineHeight: 20,
                  fontWeight: '400',
                  marginTop: 8
                }}
              >
                {price}$
              </Text>
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

  const { navigation } = props
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View style={{ backgroundColor: Colors.white, elevation: 8, shadowColor: Colors.gray }}>
        <View style={styles.view_search}>
          <TouchableOpacity onPress={() => props.navigation.navigate('CategoryWomen')}>
            <Image style={styles.icons} source={require('@assets/ic_back.png')} />
          </TouchableOpacity>
          <Image style={styles.icons} source={require('@assets/ic_search.png')} />
        </View>
        <Text style={styles.txt_title}>Women’s tops</Text>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.black,
              marginTop: 12,
              marginStart: 16,
              borderRadius: 29,
              height: 30,
              width: 100,
              justifyContent: 'center'
            }}
          >
            <Text style={{ color: Colors.white, textAlign: 'center' }}>T-shirts</Text>
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
              <Image style={styles.icons} source={require('@assets/ic_baseline_filter_list.png')} />
              <Text style={styles.txt_filters}>Filters</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.icons} source={require('@assets/id_baseline_swap_vert.png')} />
              <Text style={styles.txt_filters}>Price: lowest to high</Text>
            </View>
            <TouchableOpacity onPress={() => handleColum()}>
              <Image style={styles.icons} source={require('@assets/ic_View_modules.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={{ backgroundColor: '#F9F9F9' }}>
        <FlatList
          style={{ marginBottom: '25%' }}
          scrollEnabled={false}
          numColumns={numColumns}
          key={numColumns}
          showsVerticalScrollIndicator={false} // thanh cuộn
          showsHorizontalScrollIndicator={false}
          data={DataItemCategoryWomen}
          renderItem={numColumns ? renderItemColumTo : renderItemColumOne}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  )
}

export default ItemCategoryWomen

const styles = StyleSheet.create({
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
    fontSize: 34,
    Colors: Colors.black,
    fontWeight: '700',
    marginStart: 14
  },

  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 44
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

/**
 *  const renderItem = ({ item }) => {
    const { _id, category_name, product_name, price, review, image } = item
    return (
      <View style={{ marginBottom: 26 }}>
        <View
          style={{
            marginTop: 16,
            marginHorizontal: 16,
            borderRadius: 8,
            elevation: 4,
            shadowColor: '#52006A',
            justifyContent: 'center',
            backgroundColor: Colors.white
          }}
        >
          <View style={{ flexDirection: 'row', height: 124 }}>
            <Image
              style={{
                flex: 1,
                height: '100%',

                width: '100%',
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8
              }}
              source={{ uri: image }}
            />
            <View style={{ flex: 2, marginStart: 16 }}>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 10,
                  color: Colors.black,
                  fontWeight: '500',
                  fontStyle: 'normal'
                }}
              >
                {product_name}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '400',
                  color: Colors.gray,
                  fontStyle: 'normal',
                  marginTop: 4
                }}
              >
                {category_name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={{ width: 14, height: 14 }}
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
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.black,
                  lineHeight: 20,
                  fontWeight: '400',
                  marginTop: 8
                }}
              >
                {price}$
              </Text>
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
 */
