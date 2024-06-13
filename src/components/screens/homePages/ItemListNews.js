import React from 'react'
import { Image, View } from 'react-native'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'

const ItemListNew = props => {
  const { data } = props
  return (
    <View
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Colors.white
      }}
    >
      <View style={{ marginTop: 22 }}>
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: 190,
              borderRadius: 8,
              height: 276
            }}
            source={{ uri: data.image }}
          />
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              top: 8,
              left: 10,
              alignItems: 'center',
              backgroundColor: Colors.black,
              width: 50,
              height: 29,
              borderRadius: 29
            }}
          >
            <MyText
              style={{ color: Colors.white, fontWeight: '500', fontSize: 12 }}
            >
              NEW
            </MyText>
          </View>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require('../../../assets/images/activated.png')}
          />
          <Image
            style={{ width: 24, height: 24 }}
            source={require('../../../assets/images/activated.png')}
          />
          <Image
            style={{ width: 24, height: 24 }}
            source={require('../../../assets/images/activated.png')}
          />
          <Image
            style={{ width: 24, height: 24 }}
            source={require('../../../assets/images/activated.png')}
          />
          <Image
            style={{ width: 24, height: 24 }}
            source={require('../../../assets/images/activated.png')}
          />
          <MyText style={{ textAlign: 'center', color: Colors.gray }}>
            (10)
          </MyText>
        </View>
        <MyText style={{ color: Colors.gray }}>Dorothy Perkins</MyText>
        <MyText
          style={{ color: Colors.black, fontSize: 16, fontWeight: '400' }}
        >
          Evening Dress
        </MyText>
        <View style={{ flexDirection: 'row' }}>
          <MyText
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: Colors.gray,
              marginRight: 4
            }}
          >
            15$
          </MyText>
          <MyText
            style={{ fontSize: 14, fontWeight: '500', color: Colors.red }}
          >
            12$
          </MyText>
        </View>
      </View>
    </View>
  )
}

export default ItemListNew
