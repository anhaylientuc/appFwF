import React, { useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Colors from 'src/constants/Colors'
import { DaTaNews, DaTaSale } from 'src/constants/Databases'
import MyText from 'src/constants/FontsStyle'
import ItemListNew from './ItemListNews'
import ItemListSale from './ItemListSales'

const ListSale = () => {
  return (
    <KeyboardAvoidingView>
      <View>
        <View>
          <Image
            style={{ width: '100%', height: 250 }}
            source={require('@assets/images/pexel_911677.png')}
          />
          <View
            style={{
              position: 'absolute'
            }}
          >
            <Text
              style={{
                fontWeight: '900',
                top: 180,
                left: 21,
                color: Colors.white,
                fontSize: 34
              }}
            >
              Street clothes
            </Text>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{
                color: Colors.black,

                fontSize: 34,
                fontWeight: '700',
                fontStyle: 'normal'
              }}
            >
              Sale
            </MyText>

            <MyText style={{ textAlign: 'center' }}>View all</MyText>
          </View>

          <MyText style={{ color: Colors.red, fontWeight: 400 }}>
            Super summer sale
          </MyText>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // thanh cuộn
        showsVerticalScrollIndicator={false} // thanh cuộn
      >
        {DaTaSale.map(item => (
          <ItemListSale key={item._id} data={item} />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const HomePage = props => {
  const [isShowSale, setIsShowSale] = useState(false)
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Image
          style={{ width: '100%', height: 628, position: 'relative' }}
          source={require('@assets/images/image.png')}
        />
        <View style={{ position: 'absolute', left: 15, bottom: 40 }}>
          <Text style={styles.txt_fashion_sale}>Fashion</Text>
          <Text style={styles.txt_fashion_sale}>sale</Text>
          <TouchableOpacity
            onPress={() => {
              setIsShowSale(!isShowSale)
            }}
          >
            <View style={styles.btn_check}>
              <Text style={{ color: Colors.white, fontWeight: '500' }}>
                Check
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {isShowSale ? ListSale() : null}
      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <MyText
            style={{
              color: Colors.black,
              fontSize: 34,
              fontWeight: '700',
              fontStyle: 'normal'
            }}
          >
            News
          </MyText>
          <MyText style={{ textAlign: 'center' }}>View all</MyText>
        </View>
        <MyText style={{ color: Colors.red, fontWeight: '400' }}>
          You’ve never seen it before!
        </MyText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // thanh cuộn
        showsVerticalScrollIndicator={false} // thanh cuộn
      >
        {DaTaNews.map(item => (
          <ItemListNew key={item._id} data={item} />
        ))}
      </ScrollView>

      <View style={{ marginTop: 20, marginBottom: '20%' }}>
        <View>
          <Image
            style={{ height: 366, width: '100%' }}
            source={require('@assets/images/image5.png')}
          />
          <Text style={styles.txt_new_collection}>New collection</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <View
              style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}
            >
              <Text style={styles.txt_Summer_sale}>Summer</Text>
              <Text style={styles.txt_Summer_sale}>sale</Text>
            </View>
            <View>
              <Image
                style={{ width: '100%', height: 187 }}
                source={require('@assets/images/image7.png')}
              />
              <Text style={[styles.txt_new_collection, styles.txt_black]}>
                Black
              </Text>
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              style={{ height: 374, width: '100%' }}
              source={require('@assets/images/image6.png')}
            />
            <Text
              style={{
                position: 'absolute',
                fontSize: 34,
                color: Colors.white,
                fontWeight: 700
              }}
            >
              Men’s hoodies
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  txt_black: {
    top: '60%',
    left: 13
  },
  txt_new_collection: {
    fontSize: 34,
    color: Colors.white,
    fontWeight: '700',
    position: 'absolute',
    bottom: 17,
    right: 18
  },
  txt_Summer_sale: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.red
  },

  btn_check: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
    width: 160,
    height: 36,
    top: 8,
    borderRadius: 25
  },
  txt_fashion_sale: {
    color: Colors.white,
    fontSize: 48,
    fontWeight: '900'
    // fontFamily: 'Metropolis'
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: Colors.white
  }
})
