import AppStyle from '@common'
import React, { useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Colors from 'src/constants/Colors'
import { DaTaNews, DaTaSale } from 'src/constants/Databases'
import ItemListNew from './ItemListNews'
import ItemListSale from './ItemListSales'

const ListSale = () => {
  return (
    <KeyboardAvoidingView>
      <View>
        <View>
          <Image
            style={{ width: '100%', height: 250 }}
            source={require('@assets/pexel_911677.png')}
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
            <Text
              style={{
                color: Colors.black,

                fontSize: 34,
                fontWeight: '700',
                fontStyle: 'normal'
              }}
            >
              Sale
            </Text>

            <Text style={{ textAlign: 'center' }}>View all</Text>
          </View>

          <Text style={{ color: Colors.red, fontWeight: 400 }}>
            Super summer sale
          </Text>
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
    <ScrollView
      style={AppStyle.StyleHome.container}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Image
          style={{ width: '100%', height: 628, position: 'relative' }}
          source={require('@assets/image.png')}
        />
        <View style={{ position: 'absolute', left: 15, bottom: 40 }}>
          <Text style={AppStyle.StyleHome.txt_fashion_sale}>Fashion</Text>
          <Text style={AppStyle.StyleHome.txt_fashion_sale}>sale</Text>
          <TouchableOpacity
            onPress={() => {
              setIsShowSale(!isShowSale)
            }}
          >
            <View style={AppStyle.StyleHome.btn_check}>
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
          <Text
            style={{
              color: Colors.black,
              fontSize: 34,
              fontWeight: '700',
              fontStyle: 'normal'
            }}
          >
            News
          </Text>
          <Text style={{ textAlign: 'center' }}>View all</Text>
        </View>
        <Text style={{ color: Colors.red, fontWeight: '400' }}>
          You’ve never seen it before!
        </Text>
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
            source={require('@assets/image5.png')}
          />
          <Text style={AppStyle.StyleHome.txt_new_collection}>
            New collection
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <View
              style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}
            >
              <Text style={AppStyle.StyleHome.txt_Summer_sale}>Summer</Text>
              <Text style={AppStyle.StyleHome.txt_Summer_sale}>sale</Text>
            </View>
            <View>
              <Image
                style={{ width: '100%', height: 187 }}
                source={require('@assets/image7.png')}
              />
              <Text
                style={[
                  AppStyle.StyleHome.txt_new_collection,
                  AppStyle.StyleHome.txt_black
                ]}
              >
                Black
              </Text>
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              style={{ height: 374, width: '100%' }}
              source={require('@assets/image6.png')}
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
