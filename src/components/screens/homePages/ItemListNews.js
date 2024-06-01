import React from 'react'
import { Image, Text, View } from 'react-native'
import Colors from 'src/constants/Colors'

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
            <Text style={{ color: Colors.white, fontWeight: '500' }}>NEW</Text>
          </View>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require('@assets/activated.png')}
          />
          <Image
            style={{ width: 24, height: 24 }}
            source={require('@assets/activated.png')}
          />
          <Image
            style={{ width: 24, height: 24 }}
            source={require('@assets/activated.png')}
          />
          <Image
            style={{ width: 24, height: 24 }}
            source={require('@assets/activated.png')}
          />
          <Image
            style={{ width: 24, height: 24 }}
            source={require('@assets/activated.png')}
          />
          <Text style={{ textAlign: 'center', color: Colors.gray }}>(10)</Text>
        </View>
        <Text style={{ color: Colors.gray }}>Dorothy Perkins</Text>
        <Text style={{ color: Colors.black, fontSize: 16, fontWeight: '400' }}>
          Evening Dress
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: Colors.gray,
              marginRight: 4
            }}
          >
            15$
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '500', color: Colors.red }}>
            12$
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ItemListNew
