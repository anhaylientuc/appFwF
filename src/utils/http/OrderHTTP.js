import AxiosInstance from '../AxiosInstance'
const insert = async body => {
  try {
    const url = '/orders'
    // console.log('Lỏ', JSON.stringify(body, null, 2))
    const axiosInstance = AxiosInstance()
    const response = await axiosInstance.post(url, body)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}
export default { insert }
