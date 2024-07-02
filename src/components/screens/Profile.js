import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Colors from 'src/constants/Colors'
import Icons from '../icons/Icon'
import PriceRangeSlider from './PriceRangeSlider'

const Profile = () => {
  const windowWith = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  return (
    <View
      style={{
        backgroundColor: Colors.grayBg,
        height: windowHeight,
        width: windowWith
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          alignItems: 'center',
          paddingTop: 40,
          paddingBottom: 16,
          elevation: 32,
          shadowColor: Colors.gray,
          backgroundColor: Colors.white
        }}
      >
        <Icons.Entypo name="chevron-thin-left" size={20} style={{ flex: 1 }} />
        <Text
          style={{
            fontSize: 16,
            color: Colors.black,
            fontFamily: 'Montserrat-SemiBold',
            textAlign: 'center',
            flex: 1
          }}
        >
          Bộ lọc
        </Text>
        <View style={{ flex: 1 }} />
      </View>
      <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>Giá tiền</Text>
      </View>
     
        <PriceRangeSlider />
     
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})
