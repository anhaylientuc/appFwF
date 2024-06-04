import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from 'src/constants/Colors'
const Tab = createMaterialTopTabNavigator()

const Favorites = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        backgroundColor: Colors.grayBg
      }}
    ></View>
  )
}

export default Favorites

const styles = StyleSheet.create({
  txt_size: {
    color: Colors.white,
    fontWeight: '500'
  },
  btn_size: {
    backgroundColor: Colors.red,
    borderRadius: 8,
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 10
  },
  txt_body_parameters: { flex: 1, paddingVertical: 10 },
  txt_size_parameters: { textAlign: 'center', flex: 1 },
  container_size_parameters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFEFD5',
    flex: 3
  },
  container_size_parameters_pink: {
    backgroundColor: '#FFCCCC'
  }
})
