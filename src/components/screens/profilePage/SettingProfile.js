import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
import UserContext from '../../../contexts/UserContext'
const SettingProfile = props => {
  const { navigation } = props

  const { user, setUser } = useContext(UserContext)
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.txtHeader}>Cài đặt của tôi</Text>
      <MyText style={{ textAlign: 'center', fontSize: 12, marginVertical: 8 }}>
        Bạn có thể quản lý tài khoản và các đăng ký khác tại đây
      </MyText>

      <View style={{ padding: 16 }}>
        <Text style={{ textAlign: 'left', fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>
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
            <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>
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
          <Text style={styles.txtUserName}>30/09/2003</Text>
          <Text style={styles.txtTitleProfile}>Số điện thoại</Text>
          <Text style={styles.txtUserName}>84+ </Text>
          <Text style={styles.txtTitleProfile}>Giới tính</Text>
          <Text style={styles.txtUserName}>Nam</Text>
          <Text style={styles.txtTitleProfile}>Mã bưu chính</Text>
          <Text style={styles.txtUserName}>18000</Text>
          <Text style={styles.txtTitleProfile}>Quốc gia</Text>
          <Text style={styles.txtUserName}>Việt Nam</Text>
        </View>
      </View>
      <View style={[styles.container_Information, { marginVertical: 16 }]}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>
              Danh sách địa chỉ
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditAddress')}>
            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', borderBottomWidth: 1 }}>
              Sửa
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={[styles.txtTitleProfile, { marginTop: 32 }]}>
            Bạn cũng có thể thêm và sửa địa chỉ giao hàng tại đây
          </Text>
        </TouchableOpacity>
        <Text style={styles.txtTitleProfile}>Dịa chỉ thanh toán</Text>
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
    fontSize: 12,
    marginTop: 8
  },
  txtTitleProfile: {
    marginTop: 16,
    color: Colors.black,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12
  },
  txtHeader: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 16
  },
  container: {
    backgroundColor: Colors.grayBg
  }
})
