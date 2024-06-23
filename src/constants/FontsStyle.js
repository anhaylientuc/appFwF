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
