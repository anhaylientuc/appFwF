import React, { useContext, useEffect, useState } from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import UserContext from 'src/contexts/UserContext'

const EditAddress = props => {
  const { user, setUser } = useContext(UserContext)
  const { navigation } = props
  const [showViewEdit, setShowViewEdit] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')
  const [zipCode, setZipCode] = useState('')

  useEffect(() => {
    console.log('====================================')
    const ok = user
    console.log('shipping_address: ', JSON.stringify(ok, null, 2))
  }, [user])

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

  const itemShippingAddress = () => {
    console.log(user)
  }

  const handleSave = async () => {
    const newStorage = {
      name: name,
      address: address,
      city: city,
      district: district,
      ward: ward,
      zipCode: zipCode
    }
    var newShipping = user.address
    newShipping.push(newStorage)
    setUser({ ...user, address: newShipping })
    console.log('====================================')
    console.log(user)
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
      <View
        style={{
          padding: 24,
          margin: 16,
          backgroundColor: Colors.white
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
          <Text style={[styles.txt_title]}>Địa chỉ giao hàng</Text>
          <View style={{ height: 32 }} />
          {user.shipping_address == [] ? (
            <MyText style={[styles.txt_description, { color: Colors.gray }]}>
              Chưa có địa chỉ giao hàng được lưu
            </MyText>
          ) : (
            <FlatList scrollEnabled={false} renderItem={itemShippingAddress} data={user} />
          )}
        </TouchableOpacity>
      </View>

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
