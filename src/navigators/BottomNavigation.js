import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Favorites from '@screens/Favorites'
import Profile from '@screens/Profile'
import Icons from 'src/components/icons/Icon'
import ShopPage from 'src/components/screens/ShopPage'
import BagPage from 'src/components/screens/bagPages/BagPage'
import ReturnMethod from 'src/components/screens/bagPages/ReturnMethod'
import HomePage from 'src/components/screens/homePages/HomePage'
import CategoryWomen from 'src/components/screens/shopPages/Categories'
import ItemCategoryWomen from 'src/components/screens/shopPages/ItemListCategory'
import ProductWomen from 'src/components/screens/shopPages/ProductDetail'
import ReviewProduct from 'src/components/screens/shopPages/ReviewProduct'
import SizeInfo from 'src/components/screens/shopPages/SizeInfo'
import Colors from 'src/constants/Colors'
import StorageProvider from 'src/contexts/StorageProvider'
const Stack = createStackNavigator()
const Button = createBottomTabNavigator()

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
      <Stack.Screen
        name="ProductWomen"
        component={ProductWomen}
        options={{
          title: 'ProductWomen',
          tabBarStyle: { display: 'none' }
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ReviewProduct"
        component={ReviewProduct}
        options={{
          title: 'ReviewProduct',
          tabBarStyle: { display: 'none' }
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="SizeInfo"
        component={SizeInfo}
        options={{
          title: 'SizeInfo'
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="BagPage"
        component={BagPage}
        options={{
          title: 'BagPage'
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ title: 'Trang chủ Shop' }}
      ></Stack.Screen>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: 'Favorite' }}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}
const FavoriteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: 'Favorite' }}
      ></Stack.Screen>
      <Stack.Screen
        name="SizeInfo"
        component={SizeInfo}
        options={{ title: 'SizeInfo' }}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}

const BagStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="BagPage"
        component={BagPage}
        options={{ title: 'BagPage' }}
      ></Stack.Screen>
      <Stack.Screen
        name="ReturnMethod"
        component={ReturnMethod}
        options={{ title: 'ReturnMethod' }}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}

function BottomTabNavigator() {
  return (
    <StorageProvider>
      <Button.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.red,
          tabBarStyle: {
            borderTopEndRadius: 12,
            borderTopStartRadius: 12,
            paddingTop: 10,
            paddingBottom: 10,
            height: 68,
            backgroundColor: Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute'
          }
        }}
      >
        <Button.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarColor: Colors.white,
            tabBarLabel: 'Trang chủ',
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
            tabBarLabel: 'Cửa hàng',
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
          name="BagStack"
          component={BagStack}
          options={{
            tabBarLabel: 'Giỏ hàng',
            // tabBarStyle: { display: 'none' },
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
          name="FavoriteStack"
          component={FavoriteStack}
          options={{
            tabBarLabel: 'Yêu thích',
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
            tabBarLabel: 'Hồ sơ',

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
    </StorageProvider>
  )
}

export default BottomTabNavigator
