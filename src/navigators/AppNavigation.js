import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './MainNavigation'

import React from 'react'
import { StyleSheet } from 'react-native'

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})
