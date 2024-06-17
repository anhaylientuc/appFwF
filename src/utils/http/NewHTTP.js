import AxiosInstance from '../AxiosInstance'

export const getCategory = async () => {
  try {
    const axiosInstance = AxiosInstance()
    const url = `categories/root`
    const response = await axiosInstance.get(url)
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
    throw error
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
    throw error
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
    throw error
  }
}
