import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
import MyTabs from '../../../navigators/ShopPageTabNavigation'
const ShopPage = ({ navigation: { goBack } }) => {
  return (
    <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <View style={styles.view_search}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icons.Ionicons name={'chevron-back'} size={24} />
        </TouchableOpacity>
        <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_search}>
          Categories
        </MyText>
        <Icons.Ionicons name={'search'} size={24} />
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
