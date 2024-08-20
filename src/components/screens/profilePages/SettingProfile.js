import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import UserContext from '../../../contexts/UserContext'
const SettingProfile = () => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext)
  const [shipping, setshipping] = useState([])

  useEffect(() => {
    user.shipping.map(item => {
      if (item.selected == true) {
        setshipping(item)
      }
    })
    console.log(shipping)
  }, [user, shipping])

  useFocusEffect(
    useCallback(() => {
      if (navigation) {
        navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
      }
    }, [navigation])
  )

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1 }}>
          <Icons.AntDesign name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Cài đặt của tôi</Text>
        <View style={{ flex: 1 }} />
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            marginVertical: 16,
            fontFamily: 'Montserrat-Medium'
          }}
        >
          Bạn có thể quản lý tài khoản và các đăng ký khác tại đây
        </Text>
        <Text style={{ textAlign: 'left', fontSize: 12, fontFamily: 'Montserrat-SemiBold' }}>
          SUỴT! Đừng quyên hoàn tất đăng ký của bạn
        </Text>
        <MyText style={{ textAlign: 'left', fontSize: 12, marginVertical: 8 }}>
          ...để chúng tôi có thể cung cấp cho bạn dịch vụ và trải nghiệm tốt nhất. Chọn để sửa ở bên
          dưới và bổ sung thêm - bạn sẽ được thưởng thêm
        </MyText>
      </View>
      <View style={styles.container_Information}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-SemiBold' }}>
              Thông tin cá nhân
            </Text>
            <View
              style={{
                backgroundColor: Colors.red,
                borderRadius: 50,
                width: 8,
                height: 8,
                marginStart: 8
              }}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', borderBottomWidth: 1 }}>
              Sửa
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 16 }}>
          <Text style={styles.txtTitleProfile}>Email</Text>
          <Text style={styles.txtUserName}>{user.email}</Text>
          <Text style={styles.txtTitleProfile}>Họ và tên</Text>
          <Text style={styles.txtUserName}>{user.username}</Text>
          <Text style={styles.txtTitleProfile}>Ngày tháng năm sinh</Text>
          <Text style={styles.txtUserName}>{user.dateOfBirth}</Text>
          <Text style={styles.txtTitleProfile}>Số điện thoại</Text>
          <Text style={styles.txtUserName}>84+ {user.phoneNumber}</Text>
          <Text style={styles.txtTitleProfile}>Giới tính</Text>
          <Text style={styles.txtUserName}>{user.gender}</Text>
          <Text style={styles.txtTitleProfile}>Mã bưu chính</Text>
          <Text style={styles.txtUserName}>{user.zipCode}</Text>
          <Text style={styles.txtTitleProfile}>Quốc gia</Text>
          <Text style={styles.txtUserName}>Việt Nam</Text>
        </View>
      </View>
      <View style={[styles.container_Information, { marginVertical: 16 }]}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-SemiBold' }}>
              Danh sách địa chỉ
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('MyAddress')}>
            {shipping.length != [] ? (
              <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', borderBottomWidth: 1 }}>
                Sửa
              </Text>
            ) : (
              <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', borderBottomWidth: 1 }}>
                Thêm
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.txtTitleProfile, { marginTop: 16 }]}>
            Bạn cũng có thể thêm và sửa địa chỉ giao hàng tại đây
          </Text>
        </View>
        <Text style={[styles.txt_title, { marginTop: 8 }]}>Địa chỉ giao hàng</Text>
        {shipping.length != [] ? (
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Text style={styles.txt_description}>{shipping.name}</Text>
              <Text style={[styles.txt_description, { marginStart: 8 }]}>
                (84+) {user.phoneNumber}
              </Text>
            </View>
            {/* <Text style={styles.txt_description}>Người nhận: {shipping.name}</Text> */}
            <View style={{ marginTop: 4 }}>
              <Text style={styles.txt_description}>{shipping.address}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={[styles.txt_description, { marginEnd: 4 }]}>{shipping.ward}</Text>
                <Text style={[styles.txt_description, { marginEnd: 4 }]}>{shipping.district}</Text>
                <Text style={[styles.txt_description, { marginEnd: 4 }]}>{shipping.city}</Text>
              </View>
            </View>
          </View>
        ) : (
          <Text style={styles.txt_description}>Bạn chưa có địa chỉ giao hàng nào</Text>
        )}
      </View>
    </ScrollView>
  )
}

export default SettingProfile

const styles = StyleSheet.create({
  container_Information: { backgroundColor: Colors.white, marginHorizontal: 16, padding: 16 },
  txtUserName: {
    color: Colors.black,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    marginTop: 8
  },
  txt_title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12
  },
  txt_description: {
    marginTop: 4,
    color: Colors.black,
    fontFamily: 'Montserrat-Medium',
    fontSize: 10
  },
  txtTitleProfile: {
    marginTop: 16,
    color: Colors.black,
    fontFamily: 'Montserrat-Medium',
    fontSize: 10
  },
  txtHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    flex: 2
  },
  container: {
    backgroundColor: Colors.grayBg
  }
})
