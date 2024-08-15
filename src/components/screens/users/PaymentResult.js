import React from 'react'
import { SafeAreaView, Text, View } from 'react-native';
export const PaymentResult = ({ route }) => {
    const { vnp_ResponseCode } = route.params || {}
    console.log('code',vnp_ResponseCode)
    return (
        <View>
            <Text>Mã phản hồi: {vnp_ResponseCode}</Text>
        </View>
    )
}
