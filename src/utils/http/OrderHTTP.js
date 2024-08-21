import { ToastAndroid } from 'react-native'
import AxiosInstance from '../AxiosInstance'

const insert = async body => {
  try {
    const url = '/orders'
    const axiosInstance = AxiosInstance()
    const response = await axiosInstance.post(url, body)
    return response
  } catch (error) {
    console.log(error)
    throw ToastAndroid.show('Có lỗi xảy ra xin vui lòng thử lại sau', ToastAndroid.SHORT)
  }
}

const get = async query => {
  try {
    const url = `/orders?${query}`
    const axiosInstance = AxiosInstance()
    console.log(url)
    const response = await axiosInstance.get(url)

    return response
  } catch (error) {
    console.log(error)
    throw ToastAndroid.show('Có lỗi xảy ra xin vui lòng thử lại sau', ToastAndroid.SHORT)
  }
}

const getById = async id => {
  try {
    const url = `/orders/${id}`
    const axiosInstance = AxiosInstance()
    console.log(url)
    const response = await axiosInstance.get(url)
    return response
  } catch (error) {
    console.log(error)
    throw ToastAndroid.show('Có lỗi xảy ra xin vui lòng thử lại sau', ToastAndroid.SHORT)
  }
}

const update = async (id, body) => {
  try {
    const url = `/orders/${id}`
    console.log(url)

    const axiosInstance = AxiosInstance()
    const response = await axiosInstance.put(url, body)
    return response
  } catch (error) {
    console.log(error)
    throw ToastAndroid.show('Có lỗi xảy ra xin vui lòng thử lại saussss', ToastAndroid.SHORT)
  }
}

const remove = async id => {
  try {
    const url = `/orders/${id}`
    console.log(url)

    const axiosInstance = AxiosInstance()
    const response = await axiosInstance.delete(url)
    return response
  } catch (error) {
    console.log(error)
    throw ToastAndroid.show('Có lỗi xảy ra xin vui lòng thử lại saussss', ToastAndroid.SHORT)
  }
}

export default { insert, update, get, getById, remove }
