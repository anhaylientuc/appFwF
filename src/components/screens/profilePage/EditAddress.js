import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card } from 'react-native-paper'

const EditAddress = props => {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <View style={styles.cardcontainer}>
        <Card>
          <Card.Title title="Tên" subtitle="00000xxxx" />
          <Card.Content>
            <Text>Địa chỉ ở dây</Text>
          </Card.Content>
          <Card.Actions>
            <Button textColor="black" style={{ borderColor: 'black' }}>
              Xóa
            </Button>
            <Button
              style={{ backgroundColor: 'black' }}
              onPress={() => navigation.navigate('Edit')}
            >
              Sửa
            </Button>
          </Card.Actions>
        </Card>
      </View>
      <View style={styles.cardcontainer}>
        <Card>
          <Card.Title title="Tên" subtitle="00000xxxx" />
          <Card.Content>
            <Text>Địa chỉ ở dây</Text>
          </Card.Content>
          <Card.Actions>
            <Button textColor="black" style={{ borderColor: 'black' }}>
              Xóa
            </Button>
            <Button
              style={{ backgroundColor: 'black' }}
              onPress={() => navigation.navigate('Edit')}
            >
              Sửa
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </View>
  )
}

export default EditAddress



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: '10'
  },
  cardcontainer: {
    margin: '10'
  },
})