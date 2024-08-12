import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
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
import Toast from 'react-native-toast-message'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import UserHTTP from 'src/utils/http/UserHTTP'
import UserContext from '../../../contexts/UserContext'

const EditProfile = props => {
  const { navigation } = props
  const [birthDate, setbirthDate] = useState(new Date())
  const [isShowGender, setIsShowGender] = useState(false)
  const [gender, setGender] = useState(null) // Initialize gender state
  const [showPassWord, setShowPassWord] = useState(false)
  const [email, setemail] = useState('')
  const [emailError, setemailError] = useState(false)
  const [emailVar, setemailVar] = useState(false)
  const [name, setname] = useState('')
  const [nameError, setnameError] = useState(false)
  const [sdt, setsdt] = useState('')
  const [sdtError, setsdtError] = useState(false)
  const [dateOfBirth, setdateOfBirth] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [zipCodeError, setzipCodeError] = useState(false)
  const { user, setUser } = useContext(UserContext)
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
    setemail(user.email)
    setname(user.username)
    setsdt(user.phoneNumber)
    setGender(user.gender)
    setZipCode(user.zipCode)
    setdateOfBirth(user.dateOfBirth)
  }, [user])

  console.log('emailError', emailError)
  console.log('emailVar', emailVar)

  // show chọn ngày tháng năm
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: birthDate,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setbirthDate(selectedDate)
        }
        setdateOfBirth(birthDate.toLocaleDateString())
      },
      mode: 'date',
      is24Hour: true
    })
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text
    setname(nameVar)
    if (name) {
      setnameError(false)
    }
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text
    setemail(emailVar)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email) {
      setemailError(false)
      if (emailRegex.test(email)) {
        setemailVar(false)
      } else {
        setemailVar(true)
      }
    } else {
      setemailError(true)
    }
  }

  function handlePhone(e) {
    const numericText = e.replace(/[^0-9]/g, '')
    if (numericText.startsWith('0')) {
      setsdt(numericText.slice(1)) // Remove the leading '0'
    } else {
      setsdt(numericText)
      setsdtError(false)
    }
  }
  function handleZipCode(e) {
    const numericText = e.replace(/[^0-9]/g, '') // Remove any non-numeric characters
    setZipCode(numericText)
    if (numericText.length !== 6 && numericText.length != 0) {
      setzipCodeError(true)
    } else {
      setzipCodeError(false)
    }
  }

  const showToastSuccess = title => {
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'Cập nhật địa chỉ giao hàng thành công ✔',
        text1Style: { fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: Colors.green }
      })
    }, 500)
  }

  // Logic: lưu lại thay đổi
  const handleSave = async () => {
    const data = {
      ...user,
      email: email,
      username: name,
      phoneNumber: sdt,
      gender: gender,
      zipCode: zipCode,
      dateOfBirth: birthDate.toLocaleDateString()
    }
    if (
      name != '' &&
      email != '' &&
      sdt != '' &&
      nameError == false &&
      emailError == false &&
      sdtError == false
    ) {
      const newUser = await UserHTTP.updateUser(user._id, data)
      setUser(newUser)
      showToastSuccess()
      navigation.goBack()
    } else {
      if (!name) {
        setnameError(true)
      }
      if (!email) {
        setemailError(true)
      }
      if (!sdt) {
        setsdtError(true)
      }
    }
  }

  const showGender = () => {
    return (
      <View style={styles.genderOptions}>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'Nam']}
          onPress={() => setGender('Nam') & setIsShowGender(false)}
        >
          <Text style={[styles.genderOptionText, gender === 'Nam']}>Nam</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'Nữ']}
          onPress={() => setGender('Nữ') & setIsShowGender(false)}
        >
          <Text style={[styles.genderOptionText, gender === 'Nữ']}>Nữ</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingTop: 16
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1 }}>
            <Icons.AntDesign name="arrowleft" size={24} />
          </TouchableOpacity>
          <Text style={styles.txtHeader}>Thông tin cá nhân</Text>
          <View style={{ flex: 1 }} />
        </View>

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
                  <Text style={{ fontSize: 16, fontFamily: 'Montserrat-SemiBold' }}>
                    Chỉnh sửa thông tin cá nhân
                  </Text>
                </View>
              </View>

              {
                // Email
              }
              <View style={{ marginTop: 16 }}>
                <View style={styles.container_title}>
                  <Text style={styles.txtTitleProfile}>*Email</Text>
                  <View
                    style={[
                      emailError || emailVar
                        ? styles.container_textInput_error
                        : styles.container_textInput
                    ]}
                  >
                    <TextInput
                      value={email}
                      onChange={e => handleEmail(e)}
                      style={styles.txtTextInput}
                    />
                  </View>
                  {emailError ? (
                    <Text
                      style={[
                        styles.txt_description,
                        { fontSize: 10, marginTop: 4, color: Colors.red }
                      ]}
                    >
                      Vui lòng nhập Email
                    </Text>
                  ) : null}
                  {emailVar && emailError == false ? (
                    <Text
                      style={[
                        styles.txt_description,
                        { fontSize: 10, marginTop: 4, color: Colors.red }
                      ]}
                    >
                      Vui lòng nhập Email đúng định dạng
                    </Text>
                  ) : null}
                </View>

                {
                  // Họ và tên
                }
                <View style={styles.container_title}>
                  <Text style={styles.txtTitleProfile}>*Họ và tên</Text>
                  <View
                    style={[
                      nameError && !name
                        ? styles.container_textInput_error
                        : styles.container_textInput
                    ]}
                  >
                    <TextInput
                      value={name}
                      onChange={e => handleName(e)}
                      style={styles.txtTextInput}
                    />
                  </View>
                  {nameError && !name ? (
                    <Text
                      style={[
                        styles.txt_description,
                        { fontSize: 10, marginTop: 4, color: Colors.red }
                      ]}
                    >
                      Vui lòng nhập Họ và tên
                    </Text>
                  ) : null}
                </View>

                {
                  // birthsDate
                }
                <View style={styles.container_title}>
                  <Text style={styles.txtTitleProfile}>*Ngày tháng năm sinh</Text>
                  <TouchableOpacity onPress={showDatePicker}>
                    <View style={styles.container_textInput}>
                      {user.dateOfBirth == dateOfBirth ? (
                        <Text style={styles.txtTextInput}>{dateOfBirth}</Text>
                      ) : (
                        <Text style={styles.txtTextInput}>{birthDate.toLocaleDateString()}</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>

                {
                  // phone
                }
                <View style={styles.container_title}>
                  <Text style={styles.txtTitleProfile}>*Số điện thoại</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 8,
                      justifyContent: 'center'
                    }}
                  >
                    <View
                      style={
                        sdtError && !sdt
                          ? {
                              flex: 1,
                              borderWidth: 1,
                              borderColor: Colors.red,
                              padding: 4,
                              height: '100%'
                            }
                          : {
                              flex: 1,
                              borderWidth: 1,
                              borderColor: Colors.gray,
                              padding: 4,
                              height: '100%'
                            }
                      }
                    >
                      <View style={{ justifyContent: 'center', height: 32, paddingStart: 8 }}>
                        <Text style={{ textAlign: 'left', fontFamily: 'Montserrat-SemiBold' }}>
                          +84
                        </Text>
                      </View>
                    </View>
                    <View style={{ width: 8 }} />
                    <View
                      style={
                        sdtError && !sdt
                          ? {
                              flex: 4,
                              height: '100%',
                              borderWidth: 1,
                              borderColor: Colors.red,
                              paddingVertical: 4
                            }
                          : {
                              flex: 4,
                              height: '100%',
                              borderWidth: 1,
                              borderColor: Colors.gray,
                              paddingVertical: 4
                            }
                      }
                    >
                      <TextInput
                        value={sdt}
                        onChangeText={handlePhone} // Changed to onChangeText for better handling
                        style={styles.txtTextInput}
                        keyboardType="numeric" // Sets the keyboard to numeric
                        maxLength={9} // Optional: Limit the number of digits
                      />
                    </View>
                  </View>
                  {sdtError && !sdt ? (
                    <Text
                      style={[
                        styles.txt_description,
                        { fontSize: 10, marginTop: 4, color: Colors.red }
                      ]}
                    >
                      Vui lòng nhập số điện thoại
                    </Text>
                  ) : null}
                </View>

                {
                  // Gender
                }
                <View style={styles.container_title}>
                  <Text style={styles.txtTitleProfile}>*Giới tính</Text>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.container_textInput,
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }
                      ]}
                      onPress={() => setIsShowGender(true)}
                    >
                      <Text style={styles.txtTextInput}>{gender}</Text>
                      <Icons.AntDesign name="caretdown" style={{ marginEnd: 8 }} />
                    </TouchableOpacity>
                    {isShowGender ? showGender() : null}
                  </View>
                </View>

                {
                  // Mã bưu điện
                }
                <View style={styles.container_title}>
                  <Text style={styles.txtTitleProfile}>Mã bưu điện</Text>
                  <View
                    style={[
                      zipCodeError ? styles.container_textInput_error : styles.container_textInput
                    ]}
                  >
                    <TextInput
                      value={zipCode}
                      onChangeText={handleZipCode} // Changed to onChangeText for better handling
                      style={styles.txtTextInput}
                      placeholder="Có thể bỏ qua bước này"
                      keyboardType="numeric" // Sets the keyboard to numeric
                      maxLength={6} // Optional: Limit the number of digits
                    />
                  </View>
                  {zipCodeError ? (
                    <Text
                      style={[
                        styles.txt_description,
                        { fontSize: 10, marginTop: 4, color: Colors.red }
                      ]}
                    >
                      Vui lòng nhập đúng mã bưu điện (880000)
                    </Text>
                  ) : null}
                  <Text
                    style={[
                      styles.txt_description,
                      { color: Colors.darkGray2, marginTop: 4, fontSize: 10 }
                    ]}
                  >
                    Nhập mã bưu điện của bạn. Ví dụ:880000
                  </Text>
                </View>

                {
                  // Mật khẩu
                  // <View style={styles.container_title}>
                  //   <Text style={styles.txtTitleProfile}>*Mật khẩu</Text>
                  //   <View
                  //     style={[
                  //       styles.container_textInput,
                  //       { flexDirection: 'row', justifyContent: 'space-between' }
                  //     ]}
                  //   >
                  //     <TextInput
                  //       secureTextEntry={showPassWord}
                  //       style={[styles.txtTextInput, { width: '70%' }]}
                  //     />
                  //     <TouchableOpacity onPress={() => setShowPassWord(!showPassWord)}>
                  //       {showPassWord ? (
                  //         <Icons.Ionicons
                  //           name="eye-sharp"
                  //           size={28}
                  //           color={Colors.gray}
                  //           style={styles.icons}
                  //         />
                  //       ) : (
                  //         <Icons.Ionicons
                  //           name="eye-off-sharp"
                  //           size={28}
                  //           color={Colors.gray}
                  //           style={styles.icons}
                  //         />
                  //       )}
                  //     </TouchableOpacity>
                  //   </View>
                  // </View>
                }

                <TouchableOpacity
                  onPress={() => handleSave()}
                  style={[styles.container_btn, { backgroundColor: Colors.black2 }]}
                >
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
                </TouchableOpacity>

                <TouchableOpacity style={styles.container_btn} onPress={() => navigation.goBack()}>
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
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ height: 16 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditProfile

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
  container_textInput_error: {
    borderWidth: 1,
    marginTop: 8,
    borderColor: Colors.red,
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
  txt_description: {
    marginTop: 4,
    color: Colors.black,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12
  },
  txtTextInput: {
    marginStart: 8,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: Colors.black2
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
    flex: 2
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
