import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import 'react-native-url-polyfill/auto';
import { WebView } from 'react-native-webview';

const WebViewPayment = ({ route, navigation }) => {
  const { res } = route.params;

  const handleNavigationChange = (navState) => {
    const { url } = navState;

    // Kiểm tra URL chuyển hướng, ví dụ: chuyển về ứng dụng nếu URL bắt đầu bằng "myapp://"
    if (url.startsWith('myapp://')) {
      // Xử lý URL, có thể là điều hướng người dùng hoặc thực hiện hành động nào đó
      navigation.navigate('Home', { url });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: res.url }}
        onNavigationStateChange={handleNavigationChange} // Theo dõi các thay đổi URL
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        startInLoadingState={true}
        renderError={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Failed to load page</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default WebViewPayment;
