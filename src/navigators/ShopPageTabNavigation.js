import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Men from 'src/components/screens/shopPages/shopPage_man/Men'
import Kids from '../components/screens/shopPages/shopPage_kids/Kids'
import Women from '../components/screens/shopPages/shopPage_woman/Women'

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
