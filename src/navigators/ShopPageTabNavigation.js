import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Men from 'src/components/screens/shopPages/shopPageMan/Men'
import Colors from 'src/constants/Colors'
import Kids from '../components/screens/shopPages/shopPageKids/Kids'
import Women from '../components/screens/shopPages/shopPageWoman/Women'

const Tab = createMaterialTopTabNavigator()

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.white }
      }}
    >
      <Tab.Screen name="Women" component={Women} />
      <Tab.Screen name="Men" component={Men} />
      <Tab.Screen name="Kids" component={Kids} />
    </Tab.Navigator>
  )
}

export default MyTabs
