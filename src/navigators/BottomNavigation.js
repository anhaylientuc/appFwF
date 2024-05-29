import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import BagPage from '@screens/BagPage';
import Favorites from '@screens/Favorites';
// import HomePage from '@screens/HomePage';
import Profile from '@screens/Profile';
import ShopPage from '@screens/ShopPage';
import Icons from 'src/components/icons/Icon';
import HomePage from 'src/components/screens/homePages/HomePage';

const Tab = createMaterialBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#DB3022"
      barStyle={{ backgroundColor: '#fff', borderTopRightRadius: 12, borderTopLeftRadius: 12, position: 'absolute', paddingTop: 8, paddingEnd: 16, paddingStart: 16 }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarColor: '#fff',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icons.MaterialCommunityIcons name="home" color={color} size={32} />
          ),
        }}
      />

      <Tab.Screen
        name="ShopPage"
        component={ShopPage}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color }) => (
            <Icons.AntDesign name="shoppingcart" color={color} size={32} />
          ),
        }}
      />

      <Tab.Screen
        name="BagPage"
        component={BagPage}
        options={{
          tabBarLabel: 'Bag',
          tabBarIcon: ({ color }) => (
            <Icons.SimpleLineIcons name="handbag" color={color} size={32} />
          ),
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color }) => (
            <Icons.MaterialIcons name="favorite-outline" color={color} size={32} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icons.FontAwesome name="user-o" color={color} size={32} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator