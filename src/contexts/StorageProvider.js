import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'

const StorageContext = createContext()

const StorageProvider = ({ children }) => {
  const [storageData, setStorageData] = useState([])
  const [userData, setuserData] = useState({})
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
  useEffect(() => {
    getDataProducts()
    getDataUser()
  }, [])

  return (
    <StorageContext.Provider value={{ storageData, setStorageData, getDataProducts }}>
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

export default StorageProvider
