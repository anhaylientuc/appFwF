import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

const Profile = () => {
  const windowWith = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  txt_underinfo: {
    marginTop: 10,
    width: 121,
    height: 11,

    fontSize: 11,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 11,
    color: '#9B9B9B'
  },
  txt_info: {
    width: 200,
    height: 16,
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 16,
    color: '#222222'
  },
  view_info: {
    width: 350,
    height: 45
  },
  view_search: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 44
  },
  txt_profile: {
    width: 169,
    height: 34,

    fontSize: 34,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 34,
    color: '#222222'
  },
  view_pic: {
    marginTop: 24,
    flexDirection: 'row',
    backgroundColor: '#F9F9F9'
  }
})
