import { ToastAndroid } from 'react-native'
import AxiosInstance from '../AxiosInstance'

export const login = async (email, password) => {
  try {
    if (!email || !password) {
      console.log('AxiosInstance:', 'Vui lòng nhập đầy đủ tài khoản và mật khẩu')
      return
    }
    const url = '/users/login'
    const body = {
      email: email,
      password: password
    }
    const res = await AxiosInstance().post(url, body)
    ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT)
    return res
  } catch (error) {}
}

export const register = async (email, password, username) => {
  try {
    if (!email || !password || !username) {
      console.log('Vui lòng nhập đầy đủ tài khoản và mật khẩu')
      return
    }

    const checkUrl = `/users/check/${username}` // Đường dẫn API để kiểm tra tên người dùng đã tồn tại hay chưa
    const checkResponse = await AxiosInstance().get(checkUrl) // Gửi yêu cầu GET để kiểm tra

    if (checkResponse.data.exists) {
      console.log('Tên người dùng đã tồn tại')
      ToastAndroid.show('Tên người dùng đã tồn tại', ToastAndroid.SHORT)
      return // Kết thúc hàm nếu tên người dùng đã tồn tại
    }

    const url = '/users/register' // Đường dẫn API để đăng ký người dùng
    const body = {
      email: email,
      password: password,
      username: username
    }

    const res = await AxiosInstance().post(url, body) // Gửi yêu cầu POST đến API

    ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT)
    return res // Trả về response từ server
  } catch (error) {
    ToastAndroid.show('Tài khoản đã tồn tại vui lòng tạo tài khoản mới', ToastAndroid.SHORT)
    // Xử lý lỗi nếu có
    throw error // Ném lỗi để bên ngoài có thể xử lý tiếp
  }
}
