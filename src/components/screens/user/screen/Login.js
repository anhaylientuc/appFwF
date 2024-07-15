import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
import { login } from 'src/utils/http/UserHTTP'
import UserContext from '../UserContext'

const Login = props => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser, user } = useContext(UserContext)
  const [emailVerify, setEmailVerify] = useState(false)
  const [passwordVerify, setPasswordVerify] = useState(false)
  const [showPassWord, setShowPassWord] = useState(false)
  const [isShowError, setisShowError] = useState(false)
  const [isShowErrorPass, setisShowErrorPass] = useState(false)

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text
    setEmail(emailVar)
    setEmailVerify(false)
    setisShowError(false)
    setisShowError(false)

    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{1,}$/.test(emailVar)) {
      setEmail(emailVar)
      setEmailVerify(true)
      setisShowError(false)
    }
  }

  function handlePassword(e) {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const PasswordVar = e.nativeEvent.text
    setPassword(PasswordVar)
    setPasswordVerify(false)
    setisShowErrorPass(false)

    if (regex.test(PasswordVar)) {
      setPassword(PasswordVar)
      setPasswordVerify(true)
      setisShowErrorPass(false)
    }
  }

  const handleSelectInput = () => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
  }
  const handleLogin = async () => {
    try {
      if (email === '' || password === '' || !password || !email) {
        !email ? setisShowError(true) : setisShowError(false)
        !password ? setisShowErrorPass(true) : setisShowErrorPass(false)
      }
      const result = await login(email, password)
      setUser(result)
      ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT)
      console.log('Form submitted successfully!')
    } catch (error) {
      // ToastAndroid.show('Tài khoản hoặc mật khẩu không chính xác', ToastAndroid.SHORT)
      console.log(error)
      // throw error
    }
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      style={{ width: '100%', height: '100%', backgroundColor: Colors.grayBg }}
    >
      <View style={styles.view_search}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons.Ionicons name={'chevron-back'} size={24} />
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View>
            <Text style={styles.txtTitle}>Đăng nhập</Text>
            <View style={{ paddingHorizontal: 8 }}>
              <MyText style={{ textAlign: 'center', fontSize: 12, color: Colors.black }}>
                Hãy trở thành thành viên để không bỏ lỡ các ưu đãi, giảm giá và voucher dành riêng
                cho bạn.
              </MyText>
              <View style={{ paddingTop: 32 }}>
                <MyText>
                  Email <Text style={{ color: Colors.red }}>*</Text>
                </MyText>
                <View style={styles.container_userName}>
                  <View style={styles.container_userName_txtInput}>
                    <TextInput
                      onChange={e => handleEmail(e)}
                      onFocus={() => handleSelectInput()}
                      style={{ width: '70%', height: '100%', color: Colors.black }}
                    />
                    {!email.length ? null : emailVerify ? (
                      <Icons.AntDesign name="checkcircleo" size={24} color={Colors.green} />
                    ) : (
                      <Icons.MaterialIcons name="error-outline" size={24} color={Colors.red} />
                    )}
                  </View>
                </View>
                {!email.length ? null : !emailVerify ? (
                  <Text
                    style={{
                      color: Colors.red,
                      marginBottom: 16,
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12
                    }}
                  >
                    * Bạn đã nhập thông tin đăng nhập không hợp lệ
                  </Text>
                ) : null}
                {isShowError ? (
                  <Text
                    style={{
                      color: Colors.red,
                      marginBottom: 16,
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12
                    }}
                  >
                    * Email không được để trống
                  </Text>
                ) : null}
              </View>
              <View>
                <MyText>
                  Mật khẩu<Text style={{ color: Colors.red }}> *</Text>
                </MyText>
                <View style={styles.container_userName}>
                  <View style={styles.container_userName_txtInput}>
                    <TextInput
                      onChange={e => handlePassword(e)}
                      onFocus={() => handleSelectInput()}
                      secureTextEntry={showPassWord}
                      style={{
                        width: '70%',
                        height: '100%',
                        color: Colors.black
                      }}
                    />
                    {!password.length ? null : (
                      <TouchableOpacity onPress={() => setShowPassWord(!showPassWord)}>
                        {showPassWord ? (
                          <Icons.Ionicons name="eye-sharp" size={28} color={Colors.gray} />
                        ) : (
                          <Icons.Ionicons name="eye-off-sharp" size={28} color={Colors.gray} />
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {!password.length ? null : !passwordVerify ? (
                  <Text
                    style={{
                      color: Colors.red,
                      marginBottom: 16,
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12
                    }}
                  >
                    * bạn đã nhập mật khẩu không hợp lệ
                  </Text>
                ) : null}
                {isShowErrorPass ? (
                  <Text
                    style={{
                      color: Colors.red,
                      marginBottom: 16,
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12
                    }}
                  >
                    * Mật khẩu không được để trống
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <MyText style={styles.txtforgot}>Bạn quên mật khẩu?</MyText>
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 8 }}>
              <TouchableOpacity style={[styles.btnLogin]} onPress={() => handleLogin()}>
                <Text style={styles.txtbtn}>Đăng Nhập</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.btnRegister}
              >
                <MyText style={styles.txtBtnRegister}>Đăng ký thành viên</MyText>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginTop: 16 }}>
                <Text style={styles.txtforgot}>Tư cách thành viên FwF</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  container_userName_txtInput: {
    paddingHorizontal: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container_userName: {
    marginVertical: 16,
    paddingVertical: 8,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.gray,
    alignItems: 'center'
  },
  error: {
    color: 'red',
    fontSize: 20,
    marginBottom: 12
  },
  txtBtnRegister: {
    textAlign: 'center',
    color: Colors.black,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16
  },
  btnRegister: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    color: Colors.gray,
    paddingVertical: 16,
    marginTop: 16
  },
  container: {
    paddingHorizontal: 16,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.grayBg
  },
  txtTitle: {
    fontSize: 24,
    paddingBottom: 16,
    fontStyle: 'normal',

    textAlign: 'center',
    color: Colors.black,
    fontFamily: 'Montserrat-SemiBold'
  },
  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.grayBg
  },
  txtforgot: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold'
  },
  btnLogin: {
    marginTop: 32,
    paddingVertical: 16,
    backgroundColor: Colors.black
  },
  txtbtn: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.white,
    textAlign: 'center'
  }
})
