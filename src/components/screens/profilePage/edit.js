import React, { useContext, useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Colors from 'src/constants/Colors'
import UserContext from '../user/UserContext'

const Edit = props => {
  const { navigation, route } = props
  const formattedAddress = route.params?.formattedAddress
  const [date, setDate] = useState(new Date())
  const [isShowGender, setIsShowGender] = useState(false)
  const [gender, setGender] = useState(null) // Initialize gender state
  const [showPassWord, setShowPassWord] = useState(false)
  const [address, setAddress] = useState('')

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (formattedAddress) {
      setAddress(formattedAddress)
    }
  }, [formattedAddress])

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.txtHeader}>Sửa địa chỉ</Text>
        <View style={styles.container_Information}>
          <TouchableWithoutFeedback onPress={() => setIsShowGender(false)}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, fontFamily: 'Montserrat-SemiBold' }}>Địa chỉ</Text>
                </View>
              </View>

              <View style={{ marginTop: 16 }}>
                {
                  // Họ và tên
                }
                <View style={styles.container_title}>
                  <Text style={styles.txtTitleProfile}>*Họ và tên</Text>
                  <View style={styles.container_textInput}>
                    <TextInput style={styles.txtTextInput} />
                  </View>
                </View>

                {
                  // phone
                }
                <View style={styles.container_title}>
                  <Text style={styles.txtTitleProfile}>*Bạn phải nhập số điện thoại di động</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 8,
                      justifyContent: 'center'
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: Colors.gray,
                        padding: 4,
                        height: '100%'
                      }}
                    >
                      <View style={{ justifyContent: 'center', height: 32, paddingStart: 8 }}>
                        <Text style={{ textAlign: 'left', fontFamily: 'Montserrat-SemiBold' }}>
                          +84
                        </Text>
                      </View>
                    </View>
                    <View style={{ width: 8 }} />
                    <View
                      style={{
                        flex: 4,
                        height: '100%',
                        borderWidth: 1,
                        borderColor: Colors.gray,
                        paddingVertical: 4
                      }}
                    >
                      <TextInput style={styles.txtTextInput} />
                    </View>
                  </View>
                </View>
                {
                  // Địa chỉ
                }
                <TouchableOpacity
                  style={styles.container_title}
                  onPress={() => navigation.navigate('GoogleMaps')}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Text style={styles.txtTitleProfile}>*Địa chỉ</Text>
                    <Text style={styles.txtTitleProfile}>Vị trí của tôi</Text>
                  </View>
                  <View style={styles.container_textInput}>
                    <TextInput
                      style={styles.txtTextInput}
                      value={address || ''}
                      placeholder="Chọn địa chỉ"
                      editable={false}
                    />
                  </View>
                </TouchableOpacity>

                <View style={[styles.container_btn, { backgroundColor: Colors.black2 }]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: Colors.white,
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 16
                    }}
                  >
                    Lưu
                  </Text>
                </View>

                <View style={styles.container_btn}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: Colors.black2,
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 16
                    }}
                  >
                    Hủy
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ height: 16 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Edit
const styles = StyleSheet.create({
  icons: {
    marginEnd: 4
  },
  container_btn: { backgroundColor: Colors.white, padding: 16, borderWidth: 1, marginTop: 16 },
  container_title: { marginTop: 16 },
  container_textInput: {
    borderWidth: 1,
    marginTop: 8,
    borderColor: Colors.gray,
    padding: 8,
    height: 44,
    justifyContent: 'center'
  },
  container_Information: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    padding: 16,
    marginTop: 20
  },
  txtTextInput: {
    marginStart: 8,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: Colors.black
  },
  txtTitleProfile: {
    color: Colors.black,
    fontFamily: 'Montserrat-Medium',
    fontSize: 14
  },
  txtHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 16
  },
  container: {
    backgroundColor: Colors.grayBg,
    width: '100%',
    height: '100%'
  },
  genderOptions: {
    justifyContent: 'space-between',
    marginTop: 8,
    backgroundColor: Colors.grayBg,
    elevation: 4
  },
  genderOption: {
    alignItems: 'flex-start',
    padding: 8,
    borderColor: Colors.gray,
    marginHorizontal: 4
  },

  genderOptionText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: Colors.black
  }
})
