import React from 'react'
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
import Icons from 'src/components/icons/Icon'

const Women = props => {
  const { navigation } = props
  const renderItem = ({ item }) => {
    const { _id, title, image } = item
    return (
      <TouchableOpacity
        style={styles.category_cart}
        onPress={() => props.navigation.navigate('CategoryWomen')}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              lineHeight: 22,
              color: Colors.black,
              left: 23
            }}
          >
            {title}
          </Text>
        </View>
        <View style={{ flex: 1, position: 'relative' }}>
          <Image
            style={{
              width: '100%',
              height: 100,
              position: 'absolute',
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8
            }}
            source={{ uri: image }}
            onError={() => console.warn('Image failed to load')}
          />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.box_1}>
        <Text style={styles.txt1_box}>SUMMER SALES</Text>
        <Text style={styles.txt2_box}>Up to 50% off</Text>
      </View>
      <FlatList
        style={{ marginBottom: '25%' }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false} // thanh cuộn
        showsHorizontalScrollIndicator={false}
        data={DataWomen}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </ScrollView>
  )
}

export default Women

const styles = StyleSheet.create({
  category_cart: {
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 16,
    height: 100,
    backgroundColor: Colors.white
  },
  txt2_box: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400'
  },
  txt1_box: {
    color: Colors.white,
    fontSize: 24,
    lineHeight: 28.8,
    fontWeight: '400'
  },
  box_1: {
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,

    borderRadius: 8,
    shadowRadius: Colors.black
  },
  container: {
    padding: 16,
    height: '100%',
    width: '100%'
  }
})

const DataWomen = [
  {
    _id: '1',
    title: 'New',
    image:
      'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fe4%2Fa1%2Fe4a18d1c0f420e9a1014d3ee9aba043055278148.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D'
  },
  {
    _id: '2',
    title: 'Clothes',
    image:
      'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fcb%2Fd3%2Fcbd3a13104d3d0fe1ebb45e4207e3b159971f79a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D'
  },
  {
    _id: '3',
    title: 'Shoes',
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F7f%2F01%2F7f01170092efe9f45a621a207c09c972e026608d.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_lingerie_briefsknickers_brazilian%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]'
  },
  {
    _id: '4',
    title: 'Accessories',
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F4c%2Fbb%2F4cbb9b4fce8b53feeda801ccfcad96b1d5b49264.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]'
  },
  {
    _id: '5',
    title: 'Sexy',
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fcc%2F6e%2Fcc6e3e030b0f3797eaef4045a48c858cf2f3c97f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]'
  },
  {
    _id: '6',
    title: 'Sexy',
    image:
      'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F66%2F48%2F6648d107d2a03baf60e8766254c58d82cfebefb0.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D'
  },
  {
    _id: '7',
    title: 'Sexy',
    image:
      'https://lp2.hm.com/hmgoepprod?set=source[/4d/ef/4defd708ed32d0f6cf73cd8a765c3937b8ac826b.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]'
  }
]
