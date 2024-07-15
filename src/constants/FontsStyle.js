import React from 'react'
import { Text as ReactNativeText } from 'react-native'
function MyText({ children, style, fontFamily }) {
  const textStyle = {
    fontFamily: fontFamily || 'Montserrat-Medium' || 'Montserrat-SemiBold' || 'Montserrat-Regular',
    ...style
  }
  return <ReactNativeText style={textStyle}>{children}</ReactNativeText>
}

export default MyText

// // import React from 'react';
// import { Button, View } from 'react-native'
// import Toast from 'react-native-toast-message'

// const showToast = () => {
//   Toast.show({
//     type: 'success', // 'info' | 'error' | 'success'
//     text1: 'Xin chào',
//     text2: 'Đây là một cái gì đó 👋'
//   })
// }

// const App = () => {
//   return (
//     <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
//       <Button title="Hiển thị Thông báo" onPress={showToast} />
//       <Toast ref={ref => Toast.setRef(ref)} />
//     </View>
//   )
// }

// export default App
