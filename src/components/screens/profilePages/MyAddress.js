import { useNavigation } from '@react-navigation/native'
import React, { useContext, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Colors from 'src/constants/Colors'
import UserContext from 'src/contexts/UserContext'
import UserHTTP from 'src/utils/http/UserHTTP'
const MyAddress = () => {
  const { user, setUser } = useContext(UserContext)
  const navigation = useNavigation()
  const [showViewEdit, setShowViewEdit] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [shippingList, setShippingList] = useState(user.shipping)

  const [selectedId, setSelectedId] = useState(false)
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Chọn làm địa chỉ mặc định',
        value: 'option1'
      }
    ],
    []
  )

  function handleName(e) {
    const nameVar = e.nativeEvent.text
    setName(nameVar)
  }

  function handleAddress(e) {
    const addressVar = e.nativeEvent.text
    setAddress(addressVar)
  }

  function handleCity(e) {
    const cityVar = e.nativeEvent.text
    setCity(cityVar)
  }

  function handleWard(e) {
    const wardVar = e.nativeEvent.text
    setWard(wardVar)
  }

  function handleDistrict(e) {
    const districtVar = e.nativeEvent.text
    setDistrict(districtVar)
  }

  function handleZipCode(e) {
    const zipCodeVar = e.nativeEvent.text
    setZipCode(zipCodeVar)
  }

  const handleSave = async () => {
    const newShipping = {
      name: name,
      address: address,
      city: city,
      district: district,
      ward: ward,
      zipCode: zipCode
    }
    var arrShipping = shippingList
    arrShipping.push(newShipping)
    const data = {
      shipping: arrShipping
    }
    const newUser = await UserHTTP.updateUser(user._id, data)
    setUser(newUser)
  }
  const handleDeleteShipping = async index => {
    const newShippingList = shippingList.filter((_, i) => i !== index)
    // setShippingList(newShippingList)
    const data = {
      shipping: newShippingList
    }
    const newUser = await UserHTTP.updateUser(user._id, data)
    setUser(newUser)
  }

  const viewEditAddress = () => {
    return (
      <View
        style={{
          padding: 24,
          margin: 16,
          backgroundColor: Colors.white
        }}
      >
        <Text style={[styles.txt_title, { marginBottom: 16 }]}>Địa chỉ giao hàng</Text>
        <View style={styles.container_title}>
          <Text style={styles.txtTitleProfile}>*Họ và tên</Text>
          <View style={styles.container_textInput}>
            <TextInput value={name} onChange={e => handleName(e)} style={styles.txtTextInput} />
          </View>
        </View>
        <View style={styles.container_title}>
          <Text style={styles.txtTitleProfile}>*Địa chỉ</Text>
          <View style={styles.container_textInput}>
            <TextInput
              value={address}
              onChange={e => handleAddress(e)}
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
            <TextInput value={city} onChange={e => handleCity(e)} style={styles.txtTextInput} />
          </View>
        </View>
        <View style={styles.container_title}>
          <Text style={styles.txtTitleProfile}>*Quận/Huyện</Text>
          <View style={styles.container_textInput}>
            <TextInput
              value={district}
              onChange={e => handleDistrict(e)}
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
            <TextInput value={ward} onChange={e => handleWard(e)} style={styles.txtTextInput} />
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
              onChange={e => handleZipCode(e)}
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
          <Text style={[styles.txt_title, { textAlign: 'center', color: Colors.white }]}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowViewEdit(!showViewEdit)}
          style={{
            backgroundColor: Colors.white,
            paddingVertical: 16,
            marginTop: 16,
            borderWidth: 1,
            borderColor: Colors.black2
          }}
        >
          <Text style={[styles.txt_title, { textAlign: 'center', color: Colors.black2 }]}>Hủy</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.txtHeader}>Địa chỉ của tôi</Text>
      {shippingList.length == [] ? (
        <Text
          style={[
            styles.txt_title,
            { color: Colors.black2, textAlign: 'center', paddingVertical: 32 }
          ]}
        >
          Chưa có địa chỉ giao hàng được lưu
        </Text>
      ) : (
        shippingList &&
        shippingList.map((item, index) => (
          <View
            key={index}
            style={{
              padding: 24,
              margin: 16,
              backgroundColor: Colors.white
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text style={[styles.txt_title, { fontSize: 16 }]}>Địa chỉ giao hàng</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditAddress', { index: index })}
                >
                  <Text style={[styles.txt_description, { borderBottomWidth: 1 }]}>Sửa</Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: 32 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.txt_description}>Họ và tên {item.name}</Text>
                  <Text>Phường {item.ward}</Text>
                  <Text>Tỉnh/Thành phố {item.city}</Text>
                  <Text>Quận/Huyện {item.district}</Text>
                  <Text>Mã bưu điện {item.zipCode}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteShipping(index)}>
                  <Text style={[styles.txt_description, { borderBottomWidth: 1 }]}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      )}
      {showViewEdit ? viewEditAddress() : null}

      {!showViewEdit ? (
        <TouchableOpacity
          onPress={() => setShowViewEdit(!showViewEdit)}
          style={{ borderWidth: 1, padding: 16, marginHorizontal: 16 }}
        >
          <Text style={[styles.txt_title, { textAlign: 'center' }]}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  )
}

export default MyAddress

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
  txt_title: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.black2
  },
  txt_description: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: Colors.black2
  },
  container: {
    flex: 1,
    backgroundColor: Colors.grayBg
  },

  txtHeader: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 5,
    marginBottom: 11
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
  }
})
