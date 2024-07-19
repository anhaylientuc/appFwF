import AxiosInstance from '../AxiosInstance'
const create_url = async body => {
  try {
    const url = '/payment/create_payment_url'
    // console.log('Lỏ', JSON.stringify(body, null, 2))
    const axiosInstance = AxiosInstance()
    const response = await axiosInstance.post(url, body)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}
export default { create_url }
