import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import PaymentHTTP from 'src/utils/http/PaymentHTTP'
import * as Linking from 'expo-linking';

const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const MyChecks = props => {
  const {
    navigation,
    route: {
      params: { order }
    }
  } = props

  const check = async () => {
    try {
      const body = {
        amount: order.amount,
        orderDescription: 'hoa don ne',
        orderType: 20000,
        bankCode: '',
        language: 'vn'
      }

      const res = await PaymentHTTP.create_url(body)

      navigation.navigate('WebViewPayment', { res: res })
    } catch (error) {
      console.log('Error response:', error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons.Ionicons name={'arrow-back-sharp'} size={24} color={Colors.black} />
        </TouchableOpacity>
        <MyText fontFamily={'Montserrat-SemiBold'} style={{ marginStart: 16, fontSize: 16 }}>
          Chọn thanh toán
        </MyText>
      </View>
      <View style={styles.container_method}>
        <Image
          style={{ width: 60, height: 18 }}
          source={require('@assets/images/logo_primary.png')}
        />
        <TouchableOpacity
          onPress={() => check()}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={styles.txt_description}>Thanh toán thẻ</Text>
          <Icons.Feather
            name={'arrow-right'}
            size={24}
            color={Colors.black}
            style={{ marginStart: 8 }}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.container_method, { marginTop: 16 }]}>
        <View />
        <TouchableOpacity
          onPress={() => check()}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={styles.txt_description}>Thanh toán khi nhận hàng</Text>
          <Icons.Feather
            name={'arrow-right'}
            size={24}
            color={Colors.black}
            style={{ marginStart: 8 }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {
        try {
          console.log('ok2')
          Linking.openURL('myapp://app/PaymentResult')
        } catch (error) {
          console.log(error)
        }

      }
      }>
        <Text>ok</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 16,
          position: 'absolute',
          bottom: 0,
          right: 16,
          left: 16
        }}
      >
        <Icons.MaterialIcons name="lock-outline" size={20} />
        <Text style={[styles.txt_description, { textAlign: 'center', fontSize: 10 }]}>
          Tất cả dữ liệu sẽ được mã hóa
        </Text>
      </View>
    </View>
  )
}

export default MyChecks

const styles = StyleSheet.create({
  container_method_selected: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#EEE8AA'
  },
  container_method: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white
  },
  txt_description: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium'
  },
  txt_title: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold'
  },
  header: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: Colors.grayBg
  }
})
