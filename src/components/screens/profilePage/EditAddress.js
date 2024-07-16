import React from 'react'
import { Button, Card } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native'


const EditAddress = props => {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text style={styles.txtHeader}>Địa chỉ của tôi</Text>
      <View style={styles.cardcontainer} >
        <Card onPress={() => navigation.navigate('Edit')}>
          <Card.Title title="Tên" subtitle="00000xxxx" />
          <Card.Content>
            <Text>Địa chỉ ở dây</Text>
          </Card.Content>
          
        </Card>
      </View>
      <View style={styles.cardcontainer}>
        <Card>
          <Card.Title title="Tên" subtitle="00000xxxx" />
          <Card.Content>
            <Text>Địa chỉ ở dây</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  )
}

export default EditAddress



const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '1',
    margin: '10'
  },
  cardcontainer: {
    marginBottom: 1
  },
  txtHeader:{
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 5,
    marginBottom: 11,
    
  }
})