import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Kids from '../components/screens/shopPage/shopPage_kids/Kids'
import Men from '../components/screens/shopPage/shopPage_man/Men'
import Women from '../components/screens/shopPage/shopPage_woman/Women'

const Tab = createMaterialTopTabNavigator()

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Women" component={Women} />
      <Tab.Screen name="Men" component={Men} />
      <Tab.Screen name="Kids" component={Kids} />
    </Tab.Navigator>
  )
}

export default MyTabs
