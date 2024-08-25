import React, { useEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import 'react-native-url-polyfill/auto'
import { WebView } from 'react-native-webview'

const WebViewPayment = ({ route, navigation }) => {
  const { res, orderId } = route.params
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
  }, [])

  const handleNavigationChange = navState => {
    try {
      const { url } = navState
      console.log(url)
      // console.log('Navigated to URL:', url); // Log URL để debug
      // // Kiểm tra URL chuyển hướng, ví dụ: chuyển về ứng dụng nếu URL bắt đầu bằng "myapp://"
      // if (url.startsWith('myapp://')) {
      //   // Điều hướng người dùng hoặc thực hiện hành động nào đó
      //   navigation.navigate('HomeStack'); // Điều hướng trong ứng dụng bằng React Navigation
    } catch (error) {
      console.log('Error in handleNavigationChange:', error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: res.url }} // URL VNPay hoặc trang thanh toán
        onNavigationStateChange={handleNavigationChange} // Bắt sự kiện chuyển hướng URL
        onError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent
          console.warn('WebView error: ', nativeEvent)
        }}
        startInLoadingState={true} // Hiển thị trạng thái loading ban đầu
        renderError={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Failed to load page</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default WebViewPayment
