import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
const Stack = createNativeStackNavigator()

import ForgotPassword from 'src/components/screens/user/screen/ForgotPassword/ForgotPassword'
import Login from 'src/components/screens/user/screen/Login'
import Register from 'src/components/screens/user/screen/Register'
const UserNavigation = props => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  )
}

export default UserNavigation
