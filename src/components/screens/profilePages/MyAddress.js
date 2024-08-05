import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useRef, useState } from 'react'
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
const MyAddress = () => {
  const sheetRef = useRef(null)
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
  const [data, setData] = useState([])
  const [dataTinhThanh, setdataTinhThanh] = useState([])
  const [isShowTinhThanh, setisShowTinhThanh] = useState(false)
  const [idTinhThanh, setidTinhThanh] = useState(null)
  const [dataQuanHuyen, setdataQuanHuyen] = useState([])
  const [isShowQuanHuyen, setisShowQuanHuyen] = useState(false)
  const [idQuanHuyen, setidQuanHuyen] = useState(null)
  const [dataPhuongXa, setdataPhuongXa] = useState([])
  const [isShowPhuongXa, setisShowPhuongXa] = useState(false)
  const [loading, setLoading] = useState(true)

  const showToastSuccess = title => {
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'Địa chỉ giao hàng của bạn đã được lưu ✔',
        text1Style: { fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: Colors.green }
      })
    }, 500)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
        const responesQuan = await fetch(`https://esgoo.net/api-tinhthanh/2/${idTinhThanh}.htm`)
        const responesPhuong = await fetch(`https://esgoo.net/api-tinhthanh/3/${idQuanHuyen}.htm`)
        const json = await response.json()
        const jsonQuan = await responesQuan.json()
        const jsonPhuong = await responesPhuong.json()
        setData(json)
        setdataTinhThanh(json.data)
        setdataQuanHuyen(jsonQuan.data)
        setdataPhuongXa(jsonPhuong.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [idTinhThanh, idQuanHuyen])

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
                  setCity(item.name)
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

  function handleName(e) {
    const nameVar = e.nativeEvent.text
    setName(nameVar)
  }

  function handleAddress(e) {
    const addressVar = e.nativeEvent.text
    setAddress(addressVar)
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
      zipCode: zipCode,
      selected: false
    }
    var arrShipping = shippingList
    arrShipping.push(newShipping)
    const data = {
      shipping: arrShipping
    }
    const newUser = await UserHTTP.updateUser(user._id, data)
    setUser(newUser)
    showToastSuccess()
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

  const handleSelected = async (index, item) => {
    shippingList.map((item, i) => {
      if (i === index) {
        item.selected = true
      } else {
        item.selected = false
      }
      return item
    })
    const newUser = await UserHTTP.updateUser(user._id, { shipping: shippingList })
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
    <KeyboardAvoidingView>
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
                    onPress={() => navigation.navigate('EditAddress', { index: index, item: item })}
                  >
                    <Text style={[styles.txt_description, { borderBottomWidth: 1 }]}>Sửa</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ height: 32 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={[styles.txt_title, { fontSize: 14 }]}>
                      Người nhận: {item.name}
                    </Text>
                    <Text style={[styles.txt_title, { marginTop: 8 }]}>{item.address}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 4 }}>
                      <Text style={[styles.txt_title, { marginEnd: 4 }]}>{item.ward}</Text>
                      <Text style={[styles.txt_title, { marginEnd: 4 }]}>{item.district}</Text>
                      <Text style={[styles.txt_title, { marginEnd: 4 }]}>{item.city}</Text>
                    </View>
                    <Text style={styles.txt_title}>{item.zipCode}</Text>
                    <TouchableOpacity
                      onPress={() => handleSelected(index, item)}
                      style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}
                    >
                      {item.selected === false ? (
                        <Icons.Ionicons name="radio-button-off-outline" size={24} />
                      ) : (
                        <Icons.Ionicons name="radio-button-on-outline" size={24} />
                      )}
                      <Text style={[styles.txt_description, { marginStart: 8, fontSize: 14 }]}>
                        Địa chỉ mặc định
                      </Text>
                    </TouchableOpacity>
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
    </KeyboardAvoidingView>
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
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.black2
  },
  txt_description: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: Colors.black2
  },
  container: {
    width: '100%',
    height: '100%',
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
