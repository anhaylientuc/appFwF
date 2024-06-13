import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from 'src/constants/Colors'
import MyTabs from '../../../navigators/ShopPageTabNavigation'
const ShopPage = ({ navigation: { goBack } }) => {
  return (
    <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <View style={styles.view_search}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image style={styles.icons} source={require('@assets/ic_back.png')} />
        </TouchableOpacity>
        <Text style={styles.txt_search}>Categories</Text>
        <Image style={styles.icons} source={require('@assets/ic_search.png')} />
      </View>
      <MyTabs />
    </View>
  )
}

export default ShopPage

const styles = StyleSheet.create({
  icons: {
    width: 22,
    height: 22
  },
  txt_search: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 22
  },
  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 44
  }
})
