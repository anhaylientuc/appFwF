import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import UserContext from 'src/contexts/UserContext'
import UserHTTP from 'src/utils/http/UserHTTP'
const EditAddress = props => {
  const {
    route: {
      params: { index, item }
    }
  } = props

  const { user, setUser } = useContext(UserContext)
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [shippingList, setShippingList] = useState(user.shipping)
  const [dataTinhThanh, setdataTinhThanh] = useState([])
  const [isShowTinhThanh, setisShowTinhThanh] = useState(false)
  const [idTinhThanh, setidTinhThanh] = useState(null)
  const [dataQuanHuyen, setdataQuanHuyen] = useState([])
  const [isShowQuanHuyen, setisShowQuanHuyen] = useState(false)
  const [idQuanHuyen, setidQuanHuyen] = useState(null)
  const [dataPhuongXa, setdataPhuongXa] = useState([])
  const [isShowPhuongXa, setisShowPhuongXa] = useState(false)

  useEffect(() => {
    const shipping = user.shipping[index]
    setName(shipping.name)
    setAddress(shipping.address)
    setCity(shipping.city)
    setDistrict(shipping.district)
    setWard(shipping.ward)
    setZipCode(shipping.zipCode)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
        const responesQuan = await fetch(`https://esgoo.net/api-tinhthanh/2/${idTinhThanh}.htm`)
        const responesPhuong = await fetch(`https://esgoo.net/api-tinhthanh/3/${idQuanHuyen}.htm`)
        const json = await response.json()
        const jsonQuan = await responesQuan.json()
        const jsonPhuong = await responesPhuong.json()
        setdataTinhThanh(json.data)
        setdataQuanHuyen(jsonQuan.data)
        setdataPhuongXa(jsonPhuong.data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    fetchData()
  }, [user, idTinhThanh, idQuanHuyen])

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
      zipCode,
      selected: item.selected
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

  const showTinhThanh = () => {
    return (
      <Modal isVisible={isShowTinhThanh}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingTop: 8
            }}
          >
            <Text style={[styles.txt_title, { fontSize: 14 }]}>Tỉnh/Thành Phố</Text>
            <TouchableOpacity onPress={() => setisShowTinhThanh(!isShowTinhThanh)}>
              <Icons.Feather name="x" size={24} />
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            style={{ width: '100%' }}
            data={dataTinhThanh}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setCity(item.full_name)
                  setisShowTinhThanh(false)
                  setidTinhThanh(item.id)
                  setDistrict('')
                  setWard('')
                }}
                style={{ padding: 16, borderBottomWidth: 0.5, borderColor: Colors.gray }}
              >
                <Text style={styles.txt_description}>{item.full_name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </Modal>
    )
  }

  const showQuanHuyen = () => {
    return (
      <Modal isVisible={isShowQuanHuyen}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingTop: 8
            }}
          >
            <Text style={[styles.txt_title, { fontSize: 14 }]}>Quận/Huyện</Text>
            <TouchableOpacity onPress={() => setisShowQuanHuyen(!isShowQuanHuyen)}>
              <Icons.Feather name="x" size={24} />
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            style={{ width: '100%' }}
            data={dataQuanHuyen}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  setDistrict(item.full_name) &
                  setisShowQuanHuyen(!isShowQuanHuyen) &
                  setidQuanHuyen(item.id) &
                  setWard('')
                }
                style={{ padding: 16, borderBottomWidth: 0.5, borderColor: Colors.gray }}
              >
                <Text style={styles.txt_description}>{item.full_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    )
  }

  const showPhuongXa = () => {
    return (
      <Modal isVisible={isShowPhuongXa}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingTop: 8
            }}
          >
            <Text style={[styles.txt_title, { fontSize: 14 }]}>Phường/Xã</Text>
            <TouchableOpacity onPress={() => setisShowPhuongXa(!isShowPhuongXa)}>
              <Icons.Feather name="x" size={24} />
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            style={{ width: '100%' }}
            data={dataPhuongXa}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setWard(item.full_name) & setisShowPhuongXa(!isShowPhuongXa)}
                style={{ padding: 16, borderBottomWidth: 0.5, borderColor: Colors.gray }}
              >
                <Text style={styles.txt_description}>{item.full_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    )
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
            <TouchableOpacity
              onPress={() => setisShowTinhThanh(!isShowTinhThanh)}
              style={styles.container_textInput}
            >
              <Text style={styles.txtTextInput}>{city}</Text>
            </TouchableOpacity>
            {isShowTinhThanh ? showTinhThanh() : null}
          </View>
          <View style={styles.container_title}>
            <Text style={styles.txtTitleProfile}>*Quận/Huyện</Text>
            <TouchableOpacity
              onPress={() => setisShowQuanHuyen(!isShowQuanHuyen)}
              style={styles.container_textInput}
            >
              <Text style={styles.txtTextInput}>{district}</Text>
            </TouchableOpacity>
            {isShowQuanHuyen ? showQuanHuyen() : null}
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
            <TouchableOpacity
              onPress={() => setisShowPhuongXa(!isShowPhuongXa)}
              style={styles.container_textInput}
            >
              <Text style={styles.txtTextInput}>{ward}</Text>
            </TouchableOpacity>
            {isShowPhuongXa ? showPhuongXa() : null}
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
            <Text
              style={[
                styles.txt_title,
                { textAlign: 'center', color: Colors.white, fontFamily: 'Montserrat-SemiBold' }
              ]}
            >
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
            <Text
              style={[
                styles.txt_title,
                { textAlign: 'center', color: Colors.black2, fontFamily: 'Montserrat-SemiBold' }
              ]}
            >
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
