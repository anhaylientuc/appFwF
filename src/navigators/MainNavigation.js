import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Favorites from '@screens/Favorites'
import { useContext } from 'react'
import { View } from 'react-native'
import Icons from 'src/components/icons/Icon'
import DetailFilter from 'src/components/screens/DetailFilter'
import Filter from 'src/components/screens/Filter'
import Profile from 'src/components/screens/Profile'
import SearchPage from 'src/components/screens/SearchPage'
import ShopPage from 'src/components/screens/ShopPage'
import BagPage from 'src/components/screens/bagPages/BagPage'
import ReturnMethod from 'src/components/screens/bagPages/ReturnMethod'
import HomePage from 'src/components/screens/homePages/HomePage'
import CategoryWomen from 'src/components/screens/shopPages/Categories'
import ItemCategoryWomen from 'src/components/screens/shopPages/ItemListCategory'
import ProductWomen from 'src/components/screens/shopPages/ProductDetail'
import ReviewProduct from 'src/components/screens/shopPages/ReviewProduct'
import SizeInfo from 'src/components/screens/shopPages/SizeInfo'
import UserContext from 'src/components/screens/user/UserContext'
import ForgotPassword from 'src/components/screens/user/screen/ForgotPassword/ForgotPassword'
import Login from 'src/components/screens/user/screen/Login'
import Register from 'src/components/screens/user/screen/Register'
import Colors from 'src/constants/Colors'
import { FilterProvider } from 'src/contexts/FilterProvider'
import StorageProvider from 'src/contexts/StorageProvider'
const Stack = createStackNavigator()
const Button = createBottomTabNavigator()

function MainNavigator() {
  // const [keyboardStatus, setKeyboardStatus] = useState(false)

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
  //     setKeyboardStatus(true)
  //   })
  //   const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
  //     setKeyboardStatus(false)
  //   })

  //   return () => {
  //     showSubscription.remove()
  //     hideSubscription.remove()
  //   }
  // }, [])

  const { user } = useContext(UserContext)
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
        <Stack.Screen
          name="SearchPage"
          component={SearchPage}
          options={{
            title: 'SearchPage',
            tabBarStyle: { display: 'none' }
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Filter"
          component={Filter}
          options={{
            title: 'Filter',
            tabBarStyle: { display: 'none' }
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="DetailFilter"
          component={DetailFilter}
          options={{
            title: 'DetailFilter',
            tabBarStyle: { display: 'none' }
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
        <Stack.Screen
          name="UserNavigation"
          component={UserNavigation}
          options={{ title: 'UserNavigation', tabBarStyle: { display: 'none' } }}
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
        <Stack.Screen
          name="UserNavigation"
          component={ProfileStack}
          options={{ title: 'UserNavigation' }}
        ></Stack.Screen>
      </Stack.Navigator>
    )
  }

  const ProfileStack = () => {
    return user ? (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profile' }}
        ></Stack.Screen>
        <Stack.Screen
          name="ReturnMethod"
          component={ReturnMethod}
          options={{ title: 'ReturnMethod' }}
        ></Stack.Screen>
      </Stack.Navigator>
    ) : (
      UserNavigation()
    )
  }

  const UserNavigation = props => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    )
  }

  return (
    <StorageProvider>
      <FilterProvider>
        <View style={{ height: 32, backgroundColor: Colors.grayBg }} />
        <Button.Navigator
          initialRouteName="HomeStack"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.red,
            tabBarStyle: {
              backgroundColor: Colors.white,
              bottom: 0,
              paddingVertical: 16,
              height: 68
              // position: 'absolute'
            }
          }}
        >
          <Button.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarColor: Colors.white,
              tabBarLabel: '',

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
              tabBarLabel: '',
              tabBarIcon: ({ focused }) => (
                <Icons.Ionicons
                  name={focused ? 'menu-outline' : 'menu-outline'}
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
              tabBarLabel: '',
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
            name="BagStack"
            component={BagStack}
            options={{
              tabBarLabel: '',
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
            name="ProfileStack"
            component={ProfileStack}
            options={{
              tabBarLabel: '',
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
      </FilterProvider>
    </StorageProvider>
  )
}

export default MainNavigator