import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import UserContext from '../../../contexts/UserContext'
import Icons from '../../icons/Icon'
const Profile = () => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext) // Assuming UserContext provides user and setUser
  // Initially not loading

  useFocusEffect(
    useCallback(() => {
      if (navigation) {
        setBottomBar()
      }
    }, [navigation])
  )

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user')
      await AsyncStorage.clear()
      setUser(undefined) // Clear user context
      navigation.navigate('Login') // Redirect to login screen or any other screen
    } catch (error) {
      console.error('Failed to logout', error)
    }
  }

  const setBottomBar = () => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        backgroundColor: Colors.white,
        bottom: 0,
        paddingVertical: 8,
        height: 54
      }
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 18, fontFamily: 'Montserrat-SemiBold' }}>Xin chào</Text>
          <MyText fontFamily={'Montserrat-SemiBold'} style={{ fontSize: 18 }}>
            {user && user.username ? user.username : 'Guest'}
          </MyText>
        </View>
        <Icons.Ionicons name="settings-outline" size={28} />
      </View>
      <View
        style={{
          backgroundColor: '#EEE8AA',
          width: '100%',
          paddingHorizontal: 16,
          paddingBottom: 32,
          paddingTop: 16
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <MyText fontFamily={'Montserrat-SemiBold'} style={{ fontSize: 20 }}>
            0 Điểm
          </MyText>
          <View style={{ justifyContent: 'space-evenly' }}>
            <MyText style={{ borderBottomWidth: 1 }}>Điểm</MyText>
          </View>
        </View>

        <Text
          style={{
            marginTop: 16,
            fontSize: 12,
            textAlign: 'justify',
            marginEnd: 32,
            fontFamily: 'Montserrat-SemiBold'
          }}
        >
          Bạn còn thiếu 200 điểm nữa để nhận được phiếu giảm giá tiếp theo và còn thiếu 800 điểm nữa
          để nâng hạng thành Plus member. Phiếu giảm giá sẽ khả dụng sau 30 ngày.
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            borderWidth: 1.5,
            marginTop: 32,
            borderRadius: 8
          }}
        >
          <Icons.FontAwesome5 name="barcode" size={20} />
          <MyText fontFamily={'Montserrat-SemiBold'} style={{ marginStart: 16, fontSize: 12 }}>
            XEM MÃ THÀNH VIÊN
          </MyText>
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 32, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={styles.container_setting}
            onPress={() => navigation.navigate('MyOder')}
          >
            <Icons.AntDesign name="inbox" size={24} />
            <Text style={styles.txtSetting}>Đơn hàng</Text>
          </TouchableOpacity>
          <View style={{ width: 12 }} />
          <TouchableOpacity
            style={styles.container_setting}
            onPress={() => navigation.navigate('SettingProfile')}
          >
            <Icons.Ionicons name="settings-outline" size={24} />

            <Text style={styles.txtSetting}>Cài đặt</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 12 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.container_setting}>
            <Icons.SimpleLineIcons name="user" size={24} />
            <Text style={styles.txtSetting}>Tư cách thành viên FwF</Text>
          </TouchableOpacity>
          <View style={{ width: 12 }} />
          <TouchableOpacity style={styles.container_setting}>
            <Icons.MaterialCommunityIcons name="account-star-outline" size={24} />
            <Text style={styles.txtSetting}>Điểm</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>
            Các ưu đãi của tôi
          </Text>
          <View style={{ justifyContent: 'space-evenly' }}>
            <MyText style={{ borderBottomWidth: 1, fontSize: 12 }}>Xem tất cả</MyText>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.container_option}>
          <Icons.AntDesign name="inbox" size={20} />
          <View>
            <Text style={styles.txtOption}>Đơn hàng của tôi</Text>
          </View>
        </View>
        <View style={styles.container_option2}>
          <Icons.MaterialIcons name="payment" size={20} />
          <View>
            <Text style={styles.txtOption}>Thông tin thanh toán</Text>
          </View>
        </View>
        <View style={styles.container_option}>
          <Icons.Ionicons name="settings-outline" size={20} />
          <View>
            <Text style={styles.txtOption}>Chi tiết tài khoản</Text>
          </View>
        </View>
        <View style={styles.container_option2}>
          <Icons.MaterialCommunityIcons name="account-star-outline" size={20} />
          <View>
            <Text style={styles.txtOption}>Điểm của tôi</Text>
          </View>
        </View>
        <View style={styles.container_option}>
          <Icons.SimpleLineIcons name="user" size={20} />
          <View>
            <Text style={styles.txtOption}>Tư cách thành viên</Text>
          </View>
        </View>
        <View style={styles.container_option2}>
          <Icons.FontAwesome name="commenting-o" size={20} />
          <View>
            <Text style={styles.txtOption}>Dịch vụ khách hàng</Text>
          </View>
        </View>
        <View style={styles.container_option}>
          <Icons.MaterialIcons name="logout" size={20} />
          <TouchableOpacity onPress={() => handleLogout()}>
            <Text style={styles.txtOption}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container_option2}>
          <Icons.MaterialCommunityIcons name="comment-edit-outline" size={20} />
          <View>
            <Text style={styles.txtOption}>Hãy giúp chúng tôi cải thiện ứng dụng</Text>
          </View>
        </View>
        <View style={styles.container_option}>
          <Icons.Feather name="user-plus" size={20} />
          <View>
            <Text style={styles.txtOption}>Mời một người bạn</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 16, fontFamily: 'Montserrat-SemiBold', marginStart: 16 }}>
          Đã xem gần đây
        </Text>
      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  txtOption: {
    marginStart: 16,
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.black2
  },
  container_option2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  container_option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white
  },
  txtSetting: { fontSize: 12, fontFamily: 'Montserrat-Medium', marginStart: 8, maxWidth: 100 },
  container_setting: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    flex: 1,
    borderRadius: 8
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  slider: {
    width: '100%',
    height: 40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center'
  },
  container: { backgroundColor: Colors.grayBg, width: '100%', height: '100%' }
})
