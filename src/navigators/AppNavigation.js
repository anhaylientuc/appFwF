import { NavigationContainer } from '@react-navigation/native'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'
import { UserProvider } from 'src/contexts/UserContext'
import MainNavigator from './MainNavigation'

const AppNavigation = () => {
  const toastRef = useRef(null)

  return (
    <NavigationContainer>
      <UserProvider>
        <MainNavigator />
        <ToastComponent ref={toastRef} />
      </UserProvider>
    </NavigationContainer>
  )
}

// Tạo một wrapper component sử dụng forwardRef để truyền ref xuống Toast
const ToastComponent = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    show: () => {
      // Thực hiện các hành động hiển thị Toast ở đây
    },
    hide: () => {
      // Thực hiện các hành động ẩn Toast ở đây
    }
  }))

  return <Toast {...props} />
})

export default AppNavigation

const styles = StyleSheet.create({})
