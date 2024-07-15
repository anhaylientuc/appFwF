import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icons from 'src/components/icons/Icon'

const ForgotPass = ({ navigation: { goBack } }) => {
  const navigation = useNavigation()

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
            width: 375,
            height: 140,
            fontSize: 34,
            fontWeight: '700',
            fontStyle: 'normal',
            lineHeight: 34,
            color: '#222222'
          }}
        >
          Forgot password
        </Text>
        <Text
          style={{
            width: 343,
            height: 40,
            fontSize: 14,
            fontWeight: '500',
            fontStyle: 'normal',
            lineHeight: 20,
            color: '#222222'
          }}
        >
          Please, enter your email address. You will receive a link to create a new password via
          email.
        </Text>

        <View
          style={{
            marginHorizontal: 16,
            marginTop: 35,
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

        <View style={styles.btnLogin}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{ alignItems: 'center' }}
          >
            <Text style={styles.txtbtn}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ForgotPass

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
})
