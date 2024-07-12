import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
const MyOder = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 8,
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Icons.AntDesign name="arrowleft" size={24} style={{ flex: 1 }} />
        <MyText
          fontFamily={'Montserrat-SemiBold'}
          style={{ marginStart: 16, fontSize: 20, textAlign: 'center', flex: 2 }}
        >
          Đơn hàng của tôi
        </MyText>
        <View style={{ flex: 1 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          width: '100%'
        }}
      >
        <View style={{ flex: 1, width: '100%' }}>
          <Text style={{}}>Trực tuyến (0)</Text>
        </View>
        <View style={{ flex: 1, width: '100%' }}>
          <Text>Tại cửa hàng (0)</Text>
        </View>
      </View>
    </View>
  )
}

export default MyOder

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayBg,
    width: '100%',
    height: '100%'
  }
})
