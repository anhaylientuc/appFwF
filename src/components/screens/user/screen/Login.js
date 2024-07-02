import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'

const Login = props => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.view_search}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons.Ionicons name={'chevron-back'} size={24} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.txtTitle}>Đăng nhập</Text>
        <View style={{ paddingHorizontal: 8 }}>
          <MyText style={{ textAlign: 'center', fontSize: 12, color: Colors.black }}>
            Hãy trở thành thành viên để không bỏ lỡ các ưu đãi, giảm giá và voucher dành riêng cho
            bạn.
          </MyText>
          <View style={{ paddingTop: 32 }}>
            <MyText>*Email</MyText>
            <View
              style={{
                marginVertical: 16,
                paddingVertical: 8,
                backgroundColor: Colors.white,
                borderWidth: 1,
                borderColor: Colors.gray
              }}
            >
              <TextInput />
            </View>
          </View>
          <View>
            <MyText>*Mật khẩu</MyText>
            <View
              style={{
                marginVertical: 16,
                paddingVertical: 8,
                backgroundColor: Colors.white,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: Colors.gray,
                alignItems: 'center'
              }}
            >
              <View style={{ paddingHorizontal: 8 }}>
                <TextInput maxLength={30} />
              </View>
              <TouchableOpacity style={{ position: 'absolute', right: 16 }}>
                <Icons.Ionicons name="eye-sharp" size={28} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <MyText style={styles.txtforgot}>Bạn quên mật khẩu?</MyText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnLogin}>
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

        {/* <TouchableOpacity>
          <Text style={styles.txtSignWith}>Or sign up with social account</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{
              marginTop: 10,
              marginLeft: 110,
              width: 65,
              height: 50,
              borderRadius: 24,
              backgroundColor: '#FFFFFF',
              shadowColor: 'rgba(0, 0, 0, 0.05)',
              shadowOffset: {
                width: 0,
                height: 1
              },
              shadowRadius: 8,
              shadowOpacity: 1
            }}
            source={require('@assets/images/gg_logo.png')}
          />

          <Image
            style={{
              marginTop: 10,
              marginLeft: 30,
              width: 55,
              height: 50,
              borderRadius: 24,
              backgroundColor: '#FFFFFF',
              shadowColor: 'rgba(0, 0, 0, 0.05)',
              shadowOffset: {
                width: 0,
                height: 1
              },
              shadowRadius: 8,
              shadowOpacity: 1
            }}
            source={require('@assets/images/fb_logo.png')}
          />
        </View> */}
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
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
    marginTop: 32
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
