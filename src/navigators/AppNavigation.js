import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomNavigation'

import React from 'react'
import { StyleSheet } from 'react-native'

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator /> 
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})
