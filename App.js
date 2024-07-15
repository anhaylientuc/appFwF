import { useFonts } from 'expo-font'
import * as React from 'react'

import AppNavigation from 'src/navigators/AppNavigation'

export default function App() {
  // fonFamily
  const [loadFonts] = useFonts({
    'Montserrat-Medium': require('src/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('src/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('src/assets/fonts/Montserrat-SemiBold.ttf')
  })

  if (!loadFonts) {
    return null
  }
  return <AppNavigation />
}
