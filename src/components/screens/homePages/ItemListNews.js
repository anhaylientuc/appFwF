import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const ItemListNew = (props) => {
  const { data } = props;
  return (
    <View style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: '#fff' }}>

      <View style={{ marginTop: 22 }}>

        <View style={{ flex: 1, }}>
          <Image style={{
            width: 190,
            borderRadius: 8,
            height: 276,
          }} source={{uri: data.image}} />
          <View style={{
            position: 'absolute',
            justifyContent: 'center',
            top: 8,
            left: 10,
            alignItems: 'center',
            backgroundColor: 'black',
            width: 50,
            height: 29,
            borderRadius: 29
          }}>
            <Text style={{ color: '#fff', fontWeight: '500' }}>NEW</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <Image style={{ width: 24, height: 24 }} source={require('@assets/activated.png')} />
          <Image style={{ width: 24, height: 24 }} source={require('@assets/activated.png')} />
          <Image style={{ width: 24, height: 24 }} source={require('@assets/activated.png')} />
          <Image style={{ width: 24, height: 24 }} source={require('@assets/activated.png')} />
          <Image style={{ width: 24, height: 24 }} source={require('@assets/activated.png')} />
          <Text style={{ textAlign: 'center', color: '#9B9B9B' }}>(10)</Text>
        </View>
        <Text style={{ color: '#9B9B9B' }}>Dorothy Perkins</Text>
        <Text style={{ color: '#222', fontSize: 16, fontWeight: '400' }}>Evening Dress</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{ fontSize: 14, fontWeight: '500', color: '#9B9B9B', marginRight: 4 }}>15$
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#DB3022' }}>12$</Text>
        </View>


      </View>
    </View>
  )
}

export default ItemListNew

const styles = StyleSheet.create({

  bbc_news_text2: {
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400'

  },

  bbc_news_text: {
    marginStart: 4,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 20,
    letterSpacing: 0.12,
    color: '#4E4B66'
  },
  container_bbc: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container_bbc_newsDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  container: {
    flexDirection: 'row',
    marginTop: 16,
    marginStart: 8,
    width: '100%'

  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 6,
  },
  content: {
    marginStart: 10,
    width: Dimensions.get('window').width - 160
  },
  content_text: {
    color: '#4E4B66',
    fontWeight: 'bold',
    fontSize: 13,
    styles: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.12,
  },
})