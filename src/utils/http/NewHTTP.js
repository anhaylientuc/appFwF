import { ToastAndroid } from 'react-native'
import AxiosInstance from '../AxiosInstance'
export const getCategory = async () => {
  try {
    const axiosInstance = AxiosInstance()
    const url = `categories/root`
    const response = await axiosInstance.get(url)
    // console.log(response)
    return response
  } catch (error) {
    console.log(error)
    throw ToastAndroid.show('Có lỗi xảy ra xin vui lòng thử lại sau', ToastAndroid.SHORT)
  }
}

export const uploadImage = async formData => {
  try {
    const axiosInstance = AxiosInstance(`multipart/form-data`)
    const url = `/upload-file`
    const response = await axiosInstance.post(url, formData)
    return response
  } catch (error) {
    console.log(error)
    throw ToastAndroid.show('Có lỗi xảy ra xin vui lòng thử lại sau', ToastAndroid.SHORT)
  }
}

export const getCategoryById = async id => {
  try {
    const axiosInstance = AxiosInstance()
    const url = `/categories/${id}`
    const response = await axiosInstance.get(url)
    return response
  } catch (error) {
    console.log(error)
    throw ToastAndroid.show('Có lỗi xảy ra xin vui lòng thử lại sau', ToastAndroid.SHORT)
  }
}

export const getProducts = async query => {
  try {
    const axiosInstance = AxiosInstance()
    const url = `/products`
    const params = query

    const response = await axiosInstance.get(url, { params: params })

    return response
  } catch (error) {
    console.log(error)
    throw ToastAndroid.show('Có lỗi xảy ra xin vui lòng thử lại sau', ToastAndroid.SHORT)
  }
}

export const getProductById = async query => {
  try {
    const axiosInstance = AxiosInstance()
    const url = `/products`
    const params = query
    const response = await axiosInstance.get(url, { params: params })
    return response
  } catch (error) {
    console.log(error)
    throw ToastAndroid.show('Có lỗi xảy ra xin vui lòng thử lại sau', ToastAndroid.SHORT)
  }
}

//serverfwf.onrender.com/filters?product_id=6673e40596ac1564a3099996&array=M,L

export const getFilter = async query => {
  try {
    const axiosInstance = AxiosInstance()
    const url = `/filters?${query}`
    console.log(JSON.stringify(url))
    const response = await axiosInstance.get(url)
    return response
  } catch (error) {
    console.log('cc', error)
    throw error
  }
}
// const getKey = async (query) => {
//   try {
//     const axiosInstance=AxiosInstance()
//     console.log('quey',query)
//     const url='/filters/key'
//     const response=await axiosInstance.get(url,{params:query})
//     return response
//   } catch (error) {
//       console.log('key',error)
//   }
// }
export default { getProducts, getFilter }
