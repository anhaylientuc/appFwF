import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BagPage from '@screens/BagPage'
import Favorites from '@screens/Favorites'
// import HomePage from '@screens/HomePage';
import Profile from '@screens/Profile'
import Icons from 'src/components/icons/Icon'
import HomePage from 'src/components/screens/homePages/HomePage'
import ShopPage from 'src/components/screens/shopPage/ShopPage'
import CategoryWomen from 'src/components/screens/shopPage/shopPage_woman/CategoryWomen'
import ItemCategoryWomen from 'src/components/screens/shopPage/shopPage_woman/ItemCategoryWomen'
import Colors from 'src/constants/Colors'

const Stack = createNativeStackNavigator()
const Button = createMaterialBottomTabNavigator()

const ShopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="ShopPage"
        component={ShopPage}
        options={{ title: 'Trang chủ Shop' }}
      ></Stack.Screen>
      <Stack.Screen
        name="ItemCategoryWomen"
        component={ItemCategoryWomen}
        options={{ title: 'List Category Women' }}
      ></Stack.Screen>
      <Stack.Screen
        name="CategoryWomen"
        component={CategoryWomen}
        options={{ title: 'Tab Category Women' }}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}

function BottomTabNavigator() {
  return (
    <Button.Navigator
      initialRouteName="Home"
      activeColor={Colors.red}
      inactiveColor={Colors.gray}
      barStyle={{
        backgroundColor: Colors.white,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        position: 'absolute',

        paddingEnd: 16,
        paddingStart: 16
      }}
    >
      <Button.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarColor: Colors.white,
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Icons.MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={!focused ? Colors.gray : Colors.red}
              size={30}
            />
          )
        }}
      />

      <Button.Screen
        name="ShopStack"
        component={ShopStack}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ focused }) => (
            <Icons.MaterialIcons
              name={focused ? 'shopping-cart' : 'add-shopping-cart'}
              color={!focused ? Colors.gray : Colors.red}
              size={30}
            />
          )
        }}
      />

      <Button.Screen
        name="BagPage"
        component={BagPage}
        options={{
          tabBarLabel: 'Bag',
          tabBarColor: Colors.white,
          tabBarIcon: ({ focused }) => (
            <Icons.Ionicons
              name={focused ? 'bag-handle' : 'bag-handle-outline'}
              color={!focused ? Colors.gray : Colors.red}
              size={30}
            />
          )
        }}
      />

      <Button.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <Icons.MaterialIcons
              name={focused ? 'favorite' : 'favorite-border'}
              color={!focused ? Colors.gray : Colors.red}
              size={30}
            />
          )
        }}
      />

      <Button.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Icons.FontAwesome
              name={focused ? 'user' : 'user-o'}
              color={!focused ? Colors.gray : Colors.red}
              size={30}
            />
          )
        }}
      />
    </Button.Navigator>
  )
}

export default BottomTabNavigator