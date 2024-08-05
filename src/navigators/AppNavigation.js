import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'
import { UserProvider } from 'src/contexts/UserContext'
import MainNavigator from './MainNavigation'

const AppNavigation = () => {
  const toastRef = useRef(null)
  // fonFamily
  const [loadFonts] = useFonts({
    'Montserrat-Medium': require('src/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('src/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('src/assets/fonts/Montserrat-SemiBold.ttf')
  })

  if (!loadFonts) {
    return null
  }

  return (
    <NavigationContainer>
      <UserProvider>
        <MainNavigator />
        <ToastComponent ref={toastRef} />
      </UserProvider>
    </NavigationContainer>
  )
}

const ToastComponent = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    show: () => {},
    hide: () => {}
  }))

  return <Toast {...props} />
})

export default AppNavigation

const styles = StyleSheet.create({})
