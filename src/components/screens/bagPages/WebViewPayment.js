import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import 'react-native-url-polyfill/auto'
import { WebView } from 'react-native-webview'

const WebViewPayment = ({ route, navigation }) => {
  const { res } = route.params
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: res.url }}
        onError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent
          console.warn('WebView error: ', nativeEvent)
        }}
        startInLoadingState={true}
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
