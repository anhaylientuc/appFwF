import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import UserHTTP from 'src/utils/http/UserHTTP'

const ForgotPass = ({ navigation: { goBack } }) => {
  function handleEmail(e) {
    const emailVar = e.nativeEvent.text
    setEmail(emailVar)
  }

  const [email, setEmail] = useState('')
  const navigation = useNavigation()
  const handleSend = async () => {
    await UserHTTP.forgotPass(email)
  }

  return (
    <View style={styles.container}>
      <View style={styles.view_search}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icons.Ionicons name={'chevron-back'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 24, paddingHorizontal: 24 }}>
        <MyText
          fontFamily={'Montserrat-SemiBold'}
          style={{
            textAlign: 'center',
            fontSize: 24
          }}
        >
          Quên mật khẩu ?
        </MyText>
        <MyText
          style={{
            textAlign: 'left',
            fontSize: 12,
            marginTop: 16
          }}
        >
          Vui lòng nhập địa chỉ email bạn đã sử dụng để tạo tài khoản, chúng tôi sẽ gửi cho bạn
          hướng dẫn đặt lại mật khẩu Email
        </MyText>

        <View
          style={{
            paddingVertical: 12,
            borderWidth: 1,
            marginVertical: 16,
            paddingHorizontal: 8
          }}
        >
          <TextInput
            style={{ fontSize: 14, color: Colors.black2, fontFamily: 'Montserrat-SemiBold' }}
            value={email}
            onChange={e => handleEmail(e)}
          />
        </View>

        <View style={styles.btn_forgotPass}>
          <TouchableOpacity onPress={() => handleSend(email)} style={{ alignItems: 'center' }}>
            <Text style={styles.txt_btn}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ForgotPass

const styles = StyleSheet.create({
  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16
  },

  btn_forgotPass: {
    backgroundColor: Colors.black2,
    paddingVertical: 16,
    marginVertical: 8
  },
  txt_btn: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.grayBg
  }
})
