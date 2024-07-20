import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'

const WebViewPayment = ({ route }) => {
  const { url } = route.params
  // console.log(url)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: url.url }}
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
