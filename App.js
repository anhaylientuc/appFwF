import { useFonts } from 'expo-font'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import AppNavigation from 'src/navigators/AppNavigation'

export default function App() {
  // fonFamily
  const [loadFonts] = useFonts({
    'Montserrat-Medium': require('src/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('src/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('src/assets/fonts/Montserrat-SemiBold.ttf'),
    // 'HMSans-Bold': require('src/assets/fonts/HMSans-Bold.woff2')
  })
  //src\assets\fonts\Quicksand-VariableFont_wght.ttf
  if (!loadFonts) {
    return null
  }
  return <AppNavigation />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
