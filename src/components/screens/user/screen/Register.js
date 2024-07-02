import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'

const Register = props => {
  const navigation = useNavigation()
  const {
    navigation: { goBack }
  } = props

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.view_search}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icons.Ionicons name={'chevron-back'} size={24} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.txtTitle}>Trở thành thành viên FwF</Text>
        <View style={{ paddingHorizontal: 8 }}>
          <MyText style={{ textAlign: 'center', fontSize: 12, color: Colors.black }}>
            Hãy trở thành thành viên để không bỏ lỡ các ưu đãi, giảm giá và voucher dành riêng cho
            bạn.
          </MyText>
          <View style={{ paddingTop: 32 }}>
            <MyText>
              Email <Text style={{ color: Colors.red }}>*</Text>
            </MyText>
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
            <MyText>
              Mật khẩu<Text style={{ color: Colors.red }}> *</Text>
            </MyText>
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
                <Icons.Ionicons name="eye-sharp" size={28} color={Colors.gray} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <MyText>
              Nhập lại mật khẩu<Text style={{ color: Colors.red }}> *</Text>
            </MyText>
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
                <Icons.Ionicons name="eye-sharp" size={28} color={Colors.gray} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <MyText>
              Ngày tháng năm sinh<Text style={{ color: Colors.red }}> *</Text>
            </MyText>
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
            </View>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <MyText style={styles.txtforgot}>
              FwF muốn dành cho bạn một món quà đặc biệt vào ngày sinh nhật của bạn
            </MyText>
          </View>

          <Pressable style={{ marginTop: 16 }}>
            <Text style={styles.txtforgot}>
              <Text>Bằng cách chọn 'Đăng ký thành viên', tôi đồng ý với </Text>
              <Text style={{ textDecorationLine: 'underline', fontSize: 14, textAlign: 'center' }}>
                Điều khoản và điều kiện
              </Text>
              <Text> của thành viên FwF</Text>
            </Text>
          </Pressable>

          <Pressable style={{ marginTop: 16 }}>
            <Text style={styles.txtforgot}>
              <Text>
                Để bạn có trải nghiệm mua sắm trọn vẹn khi là thành viên, thông tin cá nhân của bạn
                được bảo mật theo <Text />
              </Text>
              <Text style={{ textDecorationLine: 'underline', fontSize: 14, textAlign: 'center' }}>
                Điều khoản Bảo mật
              </Text>
              <Text> của FwF</Text>
            </Text>
          </Pressable>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.btnRegister}
          >
            <MyText style={styles.txtBtnRegister}>Trở thành thành viên FwF</MyText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 25 }} />
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
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
    marginTop: 32
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
