import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
const MyOder = props => {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 16,
          alignItems: 'center',
          width: '100%'
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons.AntDesign name="arrowleft" size={24} style={{ flex: 1 }} />
        </TouchableOpacity>
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
        <View
          style={{
            flex: 1,
            width: '100%',
            borderBottomWidth: 2,
            paddingVertical: 16,
            borderBlockColor: Colors.red
          }}
        >
          <Text style={{ textAlign: 'center' }}>Trực tuyến (0)</Text>
        </View>
        <View style={{ flex: 1, width: '100%', borderBottomWidth: 0, paddingVertical: 16 }}>
          <Text style={{ textAlign: 'center' }}>Tại cửa hàng (0)</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 24,
            textAlign: 'center',
            padding: 16
          }}
        >
          Hiện thại không có lượt mua sắm nào để hiển thị
        </Text>
        <MyText
          style={{
            textAlign: 'center',
            fontSize: 14,
            textAlign: 'center',
            padding: 16
          }}
        >
          Khi mua một sản phẩm trực tuyến, bạn sẽ thấy sản phẩm đó ở đây.
        </MyText>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: Colors.black, margin: 24 }}
        onPress={() => navigation.navigate('HomePage')}
      >
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
            textAlign: 'center',
            padding: 16,
            color: Colors.white
          }}
        >
          Bắt đầu khám phá
        </Text>
      </TouchableOpacity>
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
