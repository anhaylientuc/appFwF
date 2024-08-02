import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Toast from 'react-native-toast-message'
import Colors from 'src/constants/Colors'
import UserContext from 'src/contexts/UserContext'
import UserHTTP from 'src/utils/http/UserHTTP'

const EditAddress = props => {
  const {
    route: {
      params: { index }
    }
  } = props
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')
  const [zipCode, setZipCode] = useState('')

  useEffect(() => {
    const shipping = user.shipping[index]
    setName(shipping.name)
    setAddress(shipping.address)
    setCity(shipping.city)
    setDistrict(shipping.district)
    setWard(shipping.ward)
    setZipCode(shipping.zipCode)
  }, [user])

  const showToastSuccess = title => {
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'Cập nhật địa chỉ giao hàng thành công ✔',
        text1Style: { fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: Colors.green }
      })
    }, 500)
  }

  const handleInputChange = setter => e => {
    setter(e.nativeEvent.text)
  }

  const handleSave = async () => {
    const newShipping = {
      name,
      address,
      city,
      district,
      ward,
      zipCode
    }

    var updatedShipping = [...user.shipping]
    updatedShipping[index] = newShipping

    const data = {
      shipping: updatedShipping
    }
    const newUser = await UserHTTP.updateUser(user._id, data)
    setUser(newUser)
    showToastSuccess()
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.txtHeader}>Sửa địa chỉ</Text>
        <View style={{ padding: 24, margin: 16, backgroundColor: Colors.white }}>
          <Text style={[styles.txt_title, { marginBottom: 16 }]}>Địa chỉ giao hàng</Text>
          <View style={styles.container_title}>
            <Text style={styles.txtTitleProfile}>*Họ và tên</Text>
            <View style={styles.container_textInput}>
              <TextInput
                value={name}
                onChange={handleInputChange(setName)}
                style={styles.txtTextInput}
              />
            </View>
          </View>
          <View style={styles.container_title}>
            <Text style={styles.txtTitleProfile}>*Địa chỉ</Text>
            <View style={styles.container_textInput}>
              <TextInput
                value={address}
                onChange={handleInputChange(setAddress)}
                style={styles.txtTextInput}
              />
            </View>
            <Text
              style={[
                styles.txt_description,
                { color: Colors.darkGray2, marginTop: 4, fontSize: 10 }
              ]}
            >
              Số nhà, tên đường, khu phố, phường
            </Text>
          </View>
          <View style={styles.container_title}>
            <Text style={styles.txtTitleProfile}>*Tỉnh/Thành phố</Text>
            <View style={styles.container_textInput}>
              <TextInput
                value={city}
                onChange={handleInputChange(setCity)}
                style={styles.txtTextInput}
              />
            </View>
          </View>
          <View style={styles.container_title}>
            <Text style={styles.txtTitleProfile}>*Quận/Huyện</Text>
            <View style={styles.container_textInput}>
              <TextInput
                value={district}
                onChange={handleInputChange(setDistrict)}
                style={styles.txtTextInput}
              />
            </View>
            <Text
              style={[
                styles.txt_description,
                { color: Colors.darkGray2, marginTop: 4, fontSize: 10 }
              ]}
            >
              Quận/Huyện
            </Text>
          </View>
          <View style={styles.container_title}>
            <Text style={styles.txtTitleProfile}>*Phường/Xã</Text>
            <View style={styles.container_textInput}>
              <TextInput
                value={ward}
                onChange={handleInputChange(setWard)}
                style={styles.txtTextInput}
              />
            </View>
            <Text
              style={[
                styles.txt_description,
                { color: Colors.darkGray2, marginTop: 4, fontSize: 10 }
              ]}
            >
              Phường/Xã
            </Text>
          </View>
          <View style={styles.container_title}>
            <Text style={styles.txtTitleProfile}>Mã bưu điện</Text>
            <View style={styles.container_textInput}>
              <TextInput
                value={zipCode}
                onChange={handleInputChange(setZipCode)}
                style={styles.txtTextInput}
              />
            </View>
            <Text
              style={[
                styles.txt_description,
                { color: Colors.darkGray2, marginTop: 4, fontSize: 10 }
              ]}
            >
              Nhập mã bưu điện của bạn. Ví dụ:880000
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleSave()}
            style={{
              backgroundColor: Colors.black2,
              paddingVertical: 16,
              marginTop: 16,
              borderWidth: 1,
              borderColor: Colors.black2
            }}
          >
            <Text style={[styles.txt_title, { textAlign: 'center', color: Colors.white }]}>
              Lưu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              paddingVertical: 16,
              marginTop: 16,
              borderWidth: 1,
              borderColor: Colors.black2
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.txt_title, { textAlign: 'center', color: Colors.black2 }]}>
              Hủy
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 16 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditAddress

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
