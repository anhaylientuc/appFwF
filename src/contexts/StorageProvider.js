import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'

const StorageContext = createContext()

const StorageProvider = ({ children }) => {
  const [storageData, setStorageData] = useState([])
  const [userData, setuserData] = useState({})
  const [storageFavorites, setStorageFavorites] = useState([])

  const getDataProducts = async () => {
    const result = await AsyncStorage.getItem('my-cart')
    if (result !== null) {
      setStorageData(JSON.parse(result))
    }
  }
  const getDataUser = async () => {
    const result = await AsyncStorage.getItem('my-profile')
    if (result !== null) {
      setuserData(JSON.parse(result))
    }
  }
  const getDataFavorites = async () => {
    const result = await AsyncStorage.getItem('my-favorites')
    if (result !== null) {
      setStorageFavorites(JSON.parse(result))
    }
  }

  useEffect(() => {
    getDataProducts()
    getDataUser()
    getDataFavorites()
  }, [])

  return (
    <StorageContext.Provider
      value={{
        storageData,
        storageFavorites,
        setStorageData,
        setStorageFavorites,
        getDataProducts,
        getDataFavorites
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}

export const useStorage = () => useContext(StorageContext)

export function formatCurrency(amount, options = {}) {
  const { currency = 'VND', locale = 'vi-VN' } = options

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  })
  return formatter.format(amount)
}

export function formatDate(dateString) {
  // Lấy các phần của chuỗi
  const year = dateString.slice(0, 4)
  const month = dateString.slice(4, 6)
  const day = dateString.slice(6, 8)

  // Định dạng lại ngày thành dd/mm/yyyy
  return `${day}/${month}/${year}`
}

export default StorageProvider
