import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useCallback, useContext } from 'react'
import { View } from 'react-native'
import Icons from 'src/components/icons/Icon'

import BagPage from 'src/components/screens/bagPages/BagPage'
import MyChecks from 'src/components/screens/bagPages/MyChecks'
import PayPage from 'src/components/screens/bagPages/PayPage'
import ReturnMethod from 'src/components/screens/bagPages/ReturnMethod'
import SendOrders from 'src/components/screens/bagPages/SendOrders'
import WebViewPayment from 'src/components/screens/bagPages/WebViewPayment'
import Favorites from 'src/components/screens/favoritesPage/Favorites'
import HomePage from 'src/components/screens/homePages/HomePage'
import DetailMyOrder from 'src/components/screens/profilePages/DetailMyOrder'
import EditAddress from 'src/components/screens/profilePages/EditAddress'
import EditProfile from 'src/components/screens/profilePages/EditProfile'
import GoogleMaps from 'src/components/screens/profilePages/GoogleMaps'
import MyAddress from 'src/components/screens/profilePages/MyAddress'
import MyOder from 'src/components/screens/profilePages/MyOder'
import SettingProfile from 'src/components/screens/profilePages/SettingProfile'
import Categories from 'src/components/screens/shopPages/Categories'
import ItemCategories from 'src/components/screens/shopPages/ItemCategories'
import ProductDetail from 'src/components/screens/shopPages/ProductDetail'
import ReviewProduct from 'src/components/screens/shopPages/ReviewProduct'
import SearchDetail from 'src/components/screens/shopPages/SearchDetail'
import SearchPage from 'src/components/screens/shopPages/SearchPage'
import ShopPage from 'src/components/screens/shopPages/ShopPage'
import SizeInfo from 'src/components/screens/shopPages/SizeInfo'
import DetailFilter from 'src/components/screens/shopPages/filterScreens/DetailFilter'
import Filter from 'src/components/screens/shopPages/filterScreens/Filter'
import ForgotPassword from 'src/components/screens/users/ForgotPassword'
import Login from 'src/components/screens/users/Login'
import { PaymentResult } from 'src/components/screens/users/PaymentResult'
import Register from 'src/components/screens/users/Register'
import Colors from 'src/constants/Colors'
import { FilterProvider } from 'src/contexts/FilterProvider'
import StorageProvider from 'src/contexts/StorageProvider'
import UserContext from 'src/contexts/UserContext'
import Profile from '../components/screens/profilePages/Profile'

const Stack = createStackNavigator()
const Button = createBottomTabNavigator()

function MainNavigator() {
  const { user } = useContext(UserContext)
  const navigation = useNavigation()
  const ShopStack = () => {
    // useFocusEffect(
    //   useCallback(() => {
    //     // Cleanup code nếu cần khi ProfileStack không còn focus
    //     return () => {
    //       navigation.dispatch(
    //         CommonActions.reset({
    //           index: 0,
    //           routes: [{ name: 'ShopPage' }]
    //         })
    //       )
    //     }
    //   }, [navigation])
    // )
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ShopPage" component={ShopPage} options={{ title: 'Trang chủ Shop' }} />
        <Stack.Screen
          name="ItemCategories"
          component={ItemCategories}
          options={{ title: 'Items Category' }}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{ title: 'List Category' }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ title: 'ProductDetail', tabBarStyle: { display: 'none' } }}
        />
        <Stack.Screen
          name="ReviewProduct"
          component={ReviewProduct}
          options={{ title: 'ReviewProduct' }}
        />
        <Stack.Screen name="SizeInfo" component={SizeInfo} options={{ title: 'SizeInfo' }} />
        <Stack.Screen name="SearchPage" component={SearchPage} options={{ title: 'SearchPage' }} />
        <Stack.Screen
          name="SearchDetail"
          component={SearchDetail}
          options={{ title: 'SearchDetail' }}
        />
        <Stack.Screen name="Filter" component={Filter} options={{ title: 'Filter' }} />
        <Stack.Screen
          name="DetailFilter"
          component={DetailFilter}
          options={{ title: 'DetailFilter' }}
        />
      </Stack.Navigator>
    )
  }

  const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomePage} options={{ title: 'Trang chủ Shop' }} />
    </Stack.Navigator>
  )

  const FavoriteStack = () => {
    useFocusEffect(
      useCallback(() => {
        // Cleanup code nếu cần khi ProfileStack không còn focus
        return () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Favorites' }]
            })
          )
        }
      }, [navigation])
    )
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorite' }} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ title: 'ProductDetail' }}
        />
      </Stack.Navigator>
    )
  }

  const BagStack = () => {
    useFocusEffect(
      useCallback(() => {
        // Cleanup code nếu cần khi ProfileStack không còn focus
        return () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'BagPage' }]
            })
          )
        }
      }, [navigation])
    )
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BagPage" component={BagPage} options={{ title: 'BagPage' }} />
        <Stack.Screen
          name="ReturnMethod"
          component={ReturnMethod}
          options={{ title: 'ReturnMethod' }}
        />
        <Stack.Screen name="MyChecks" component={MyChecks} options={{ title: 'MyChecks' }} />
        <Stack.Screen name="PayPage" component={PayPage} options={{ title: 'PayPage' }} />
        <Stack.Screen
          name="WebViewPayment"
          component={WebViewPayment}
          options={{ title: 'WebViewPayment' }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ title: 'EditProfile' }}
        />
        <Stack.Screen name="MyAddress" component={MyAddress} options={{ title: 'MyAddress' }} />
        <Stack.Screen name="MyOder" component={MyOder} options={{ title: 'MyOder' }} />
        <Stack.Screen name="SendOrders" component={SendOrders} />
        <Stack.Screen name="UserNavigation" component={UserNavigation} />
      </Stack.Navigator>
    )
  }

  const ProfileStack = ({ navigation }) => {
    const { user } = useContext(UserContext)
    useFocusEffect(
      useCallback(() => {
        // Cleanup code nếu cần khi ProfileStack không còn focus
        return () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Profile' }]
            })
          )
        }
      }, [navigation])
    )

    return user ? (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
        <Stack.Screen
          name="ReturnMethod"
          component={ReturnMethod}
          options={{ title: 'ReturnMethod' }}
        />
        <Stack.Screen
          name="WebViewPayment"
          component={WebViewPayment}
          options={{ title: 'WebViewPayment' }}
        />
        <Stack.Screen
          name="DetailMyOrder"
          component={DetailMyOrder}
          options={{ title: 'DetailMyOrder' }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ title: 'ProductDetail' }}
        />
        <Stack.Screen name="MyOder" component={MyOder} options={{ title: 'MyOder' }} />
        <Stack.Screen
          name="SettingProfile"
          component={SettingProfile}
          options={{ title: 'SettingProfile' }}
        />
        <Stack.Screen name="MyChecks" component={MyChecks} options={{ title: 'MyChecks' }} />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ title: 'EditProfile' }}
        />
        <Stack.Screen name="MyAddress" component={MyAddress} options={{ title: 'MyAddress' }} />
        <Stack.Screen
          name="EditAddress"
          component={EditAddress}
          options={{ title: 'EditAddress' }}
        />
        <Stack.Screen name="GoogleMaps" component={GoogleMaps} options={{ title: 'GoogleMaps' }} />
        <Stack.Screen name="UserNavigation" component={UserNavigation} />
        <Stack.Screen name="PayPage" component={PayPage} />
        <Stack.Screen name="PaymentResult" component={PaymentResult} />
      </Stack.Navigator>
    ) : (
      UserNavigation()
    )
  }

  const UserNavigation = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  )

  return (
    <StorageProvider>
      <FilterProvider>
        <View style={{ height: '4.5%', backgroundColor: '#CCCCCC' }} />
        <Button.Navigator
          initialRouteName="HomeStack"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.red,
            tabBarStyle: {
              backgroundColor: Colors.white,
              bottom: 0,
              paddingVertical: 8,
              height: 54
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
              tabBarIcon: ({ focused }) => {
                return (
                  <Icons.Ionicons
                    name={focused ? 'menu-outline' : 'menu-outline'}
                    color={!focused ? Colors.gray : Colors.red}
                    size={30}
                  />
                )
              }
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
              tabBarIcon: ({ focused }) => {
                return (
                  <Icons.Ionicons
                    name={focused ? 'bag-handle' : 'bag-handle-outline'}
                    color={!focused ? Colors.gray : Colors.red}
                    size={30}
                  />
                )
              }
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
