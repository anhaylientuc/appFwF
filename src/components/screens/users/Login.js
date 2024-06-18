import { TouchableOpacity } from 'react-native';
import Icons from 'src/components/icons/Icon';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ToastAndroid
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Login = ({ navigation: { goBack } }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        margin: 5,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#F9F9F9'
      }}
    >
      <View style={styles.view_search}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icons.Ionicons name={'chevron-back'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ margin: 10 }}>
        <Text
          style={{
            width: 94,
            height: 34,
            fontSize: 34,
            fontWeight: '700',
            fontStyle: 'normal',
            lineHeight: 34,
            color: '#222222'
          }}
        >
          Login
        </Text>

        <View
          style={{
            marginHorizontal: 16,
            marginTop: 73,
            width: 343,
            height: 64,
            borderRadius: 4,
            backgroundColor: '#FFFFFF',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowRadius: 8,
            shadowOpacity: 1
          }}
        >
          <TextInput placeholder="Email" />
        </View>
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 8,
            width: 343,
            height: 64,
            borderRadius: 4,
            backgroundColor: '#FFFFFF',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowRadius: 8,
            shadowOpacity: 1
          }}
        >
          <TextInput placeholder="Password" />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.txtforgot}>Forgot your password? </Text>
          <Image
            style={{ width: '15', height: 10 }}
            source={require('@assets/Vector.png')}
          />
        </View>

        <View style={styles.btnLogin}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ alignItems: 'center' }}>
            <Text style={styles.txtbtn}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.txtSignWith}>
            Or sign up with social account
          </Text>
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
            source={require('@assets/gg_logo.png')}
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
            source={require('@assets/fb_logo.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  txtSignWith: {
    marginLeft: 86,
    marginTop: 182,
    width: 200,
    height: 20,
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 20,
    textAlign: 'center',
    color: '#222222'
  },
  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 44
  },
  txtforgot: {
    marginLeft: 174,
    width: 158,
    height: 20,
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 20,
    textAlign: 'right',
    color: '#222222'
  },
  btnLogin: {
    marginTop: 32,
    width: 343,
    height: 48,
    borderRadius: 25,
    backgroundColor: '#DB3022',
    shadowColor: 'rgba(211, 38, 38, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  txtbtn: {
    marginVertical: 14,
    width: 44,
    height: 20,
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 20,
    color: '#FFFFFF'
  }
});
