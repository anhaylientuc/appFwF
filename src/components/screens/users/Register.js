import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { register } from 'src/utils/http/UserHTTP'

const Register = () => {
  const navigation = useNavigation()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userNameVerify, setUserNameVerify] = useState(false)
  const [emailVerify, setEmailVerify] = useState(false)
  const [passwordVerify, setPasswordVerify] = useState(false)
  const [showPassWord, setShowPassWord] = useState(true)
  const [confirmPasswordVerify, setConfirmPasswordVerify] = useState(false)
  const [emailNull, setemailNull] = useState(false)
  const [passwordNull, setpasswordNull] = useState(false)
  const [cfPassNull, setcfPassNull] = useState(false)
  const [userNameNull, setuserNameNull] = useState(false)

  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
  }, [])

  const userError =
    email === '' ||
    password === '' ||
    userName === '' ||
    confirmPassword === '' ||
    !password ||
    !email ||
    !userName ||
    !confirmPassword

  const emailError = !emailVerify && emailNull
  const passwordError = passwordNull && !passwordVerify
  const cfPassError = cfPassNull && !confirmPasswordVerify
  const userNameError = userNameNull && !userNameVerify

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text
    setEmail(emailVar.trim())
    setEmailVerify(false)
    setemailNull(false)
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{1,}$/.test(emailVar)) {
      setEmail(emailVar)
      setEmailVerify(true)
    }
  }

  function handleUserName(e) {
    const userNameVar = e.nativeEvent.text
    setUserName(userNameVar)
    setUserNameVerify(false)
    setuserNameNull(false)
    if (userNameVar.length >= 6) {
      setUserNameVerify(true)
    }
  }

  function handlePassword(e) {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const PasswordVar = e.nativeEvent.text
    setPassword(PasswordVar)
    setPasswordVerify(false)
    setpasswordNull(false)
    if (regex.test(PasswordVar)) {
      setPassword(PasswordVar)
      setPasswordVerify(true)
    }
  }

  function handleConfirmPassword(e) {
    const confirmPasswordVar = e.nativeEvent.text
    const passwordVar = password
    setConfirmPassword(confirmPasswordVar)
    setConfirmPasswordVerify(false)
    setcfPassNull(false)
    if (confirmPasswordVar !== passwordVar) {
    } else {
      setConfirmPassword(confirmPasswordVar)
      setConfirmPasswordVerify(true)
    }
  }

  const handleRegister = async () => {
    try {
      if (userError) {
        !email ? setemailNull(true) : setemailNull(false)
        !password ? setpasswordNull(true) : setpasswordNull(false)
        !confirmPassword ? setcfPassNull(true) : setisShowErrorPass(false)
        !userName ? setuserNameNull(true) : setisShowErrorPass(false)
      }
      const result = await register(email, password, userName)
      Alert.alert('Success', 'Register Success, please login')
      console.log(result)
      return result
    } catch (error) {
      // Kiểm tra phản hồi lỗi từ server
      console.log('Error response:', error)
    }
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps="always"
        style={styles.container}
      >
        <View style={styles.view_search}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons.Ionicons name={'chevron-back'} size={24} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.txtTitle}>Trở thành thành viên FwF</Text>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ paddingHorizontal: 8 }}>
              <MyText style={{ textAlign: 'center', fontSize: 12, color: Colors.black }}>
                Hãy trở thành thành viên để không bỏ lỡ các ưu đãi, giảm giá và voucher dành riêng
                cho bạn.
              </MyText>
              <View style={{ paddingTop: 32 }}>
                <MyText>
                  Email <Text style={{ color: Colors.red }}>*</Text>
                </MyText>
                <View
                  style={[
                    styles.container_userName,
                    { borderColor: emailError ? Colors.red : Colors.gray }
                  ]}
                >
                  <View style={[styles.container_userName_txtInput]}>
                    <TextInput
                      onChange={e => handleEmail(e)}
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
                  <Text style={styles.error}>* Email không hợp lệ</Text>
                ) : null}
                {emailNull ? <Text style={styles.error}>* Email không được để trống</Text> : null}
              </View>
              <View>
                <MyText>
                  Mật khẩu<Text style={{ color: Colors.red }}> *</Text>
                </MyText>
                <View
                  style={[
                    styles.container_userName,
                    { borderColor: passwordError ? Colors.red : Colors.gray }
                  ]}
                >
                  <View style={styles.container_userName_txtInput}>
                    <TextInput
                      onChange={e => handlePassword(e)}
                      onPress={() =>
                        navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
                      }
                      secureTextEntry={showPassWord}
                      style={{ width: '70%', height: '100%', color: Colors.black }}
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
                  <Text style={styles.error}>
                    * Mật khẩu phải sử dụng chữ hoa, chữ thường, số và không có khoảng trắng
                  </Text>
                ) : null}
                {passwordNull ? (
                  <Text style={styles.error}>* Mật khẩu không được để trống</Text>
                ) : null}
              </View>

              <View>
                <MyText>
                  Nhập lại mật khẩu<Text style={{ color: Colors.red }}> *</Text>
                </MyText>
                <View
                  style={[
                    styles.container_userName,
                    { borderColor: cfPassError ? Colors.red : Colors.gray }
                  ]}
                >
                  <View style={styles.container_userName_txtInput}>
                    <TextInput
                      onChange={e => handleConfirmPassword(e)}
                      secureTextEntry={showPassWord}
                      style={{ width: '70%', height: '100%', color: Colors.black }}
                    />
                    {!confirmPassword.length ? null : (
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
                {!confirmPassword ? null : !confirmPasswordVerify ? (
                  <Text style={styles.error}>
                    * Mật khẩu nhắc lại không trung khớp với mật khẩu
                  </Text>
                ) : null}
                {cfPassNull ? (
                  <Text style={styles.error}>* Nhắc lại mật khẩu không được để trống</Text>
                ) : null}
              </View>

              <View>
                <MyText>
                  Họ và tên<Text style={{ color: Colors.red }}> *</Text>
                </MyText>
                <View
                  style={[
                    styles.container_userName,
                    { borderColor: userNameError ? Colors.red : Colors.gray }
                  ]}
                >
                  <View style={styles.container_userName_txtInput}>
                    <TextInput
                      onChange={e => handleUserName(e)}
                      style={{ width: '70%', height: '100%', color: Colors.black }}
                    />
                    {!userName.length ? null : userNameVerify ? (
                      <Icons.AntDesign name="checkcircleo" size={24} color={Colors.green} />
                    ) : (
                      <Icons.MaterialIcons name="error-outline" size={28} color={Colors.red} />
                    )}
                  </View>
                </View>
                {!userName.length ? null : !userNameVerify ? (
                  <Text style={styles.error}>* Tên đăng nhập phải dài hơn 6 ký tự.</Text>
                ) : null}
                {userNameNull ? (
                  <Text style={styles.error}>* Tên đăng nhập không được để trống</Text>
                ) : null}
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MyText style={styles.txtforgot}>
                  FwF muốn dành cho bạn một món quà đặc biệt vào ngày sinh nhật của bạn
                </MyText>
              </View>

              <Pressable style={{ marginTop: 16 }}>
                <Text style={styles.txtforgot}>
                  <Text>Bằng cách chọn 'Đăng ký thành viên', tôi đồng ý với </Text>
                  <Text
                    style={{ textDecorationLine: 'underline', fontSize: 14, textAlign: 'center' }}
                  >
                    Điều khoản và điều kiện
                  </Text>
                  <Text> của thành viên FwF</Text>
                </Text>
              </Pressable>

              <Pressable style={{ marginTop: 16 }}>
                <Text style={styles.txtforgot}>
                  <Text>
                    Để bạn có trải nghiệm mua sắm trọn vẹn khi là thành viên, thông tin cá nhân của
                    bạn được bảo mật theo <Text />
                  </Text>
                  <Text
                    style={{ textDecorationLine: 'underline', fontSize: 14, textAlign: 'center' }}
                  >
                    Điều khoản Bảo mật
                  </Text>
                  <Text> của FwF</Text>
                </Text>
              </Pressable>
              <TouchableOpacity onPress={() => handleRegister()} style={styles.btnRegister}>
                <MyText style={styles.txtBtnRegister}>Trở thành thành viên FwF</MyText>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ height: 24 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  error: {
    color: Colors.red,
    marginBottom: 16,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12
  },
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
    // borderColor:  Colors.gray,
    alignItems: 'center'
  },
  txtBtnRegister: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16
  },
  btnRegister: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    color: Colors.gray,
    paddingVertical: 16,
    marginTop: 16,
    position: 'absolute'
  },
  container: {
    paddingHorizontal: 16,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.grayBg
  },
  txtTitle: {
    fontSize: 24,
    paddingVertical: 16,
    fontStyle: 'normal',

    textAlign: 'center',
    color: Colors.black,
    fontFamily: 'Montserrat-SemiBold'
  },
  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  txtforgot: {
    textAlign: 'left',
    fontSize: 12,
    color: Colors.darkGray
  },
  btnRegister: {
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
