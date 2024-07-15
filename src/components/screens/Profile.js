import { TouchableOpacity } from 'react-native'
import Icons from 'src/components/icons/Icon'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ToastAndroid
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-elements'

const Profile = () => {
  return (
    <View
      style={{ margin: 5, flexDirection: 'column', backgroundColor: '#F9F9F9' }}
    >
      <View style={styles.view_search}>
        <TouchableOpacity>
          <Icons.Ionicons name={'search'} size={24} />
        </TouchableOpacity>
      </View>
      <Text style={styles.txt_profile}>Profile</Text>
      <View style={styles.view_pic}>
        <Avatar
          size={'large'}
          rounded
          source={{
            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
          }}
        />
        <View style={{ marginLeft: 16 }}>
          <Text
            style={{
              width: 126,
              height: 22,
              fontSize: 18,
              fontWeight: '600',
              fontStyle: 'normal',
              lineHeight: 22,
              color: '#222222'
            }}
          >
            Matilda Brown
          </Text>
          <Text
            style={{
              width: 166,
              height: 20,
              fontSize: 14,
              fontWeight: '500',
              fontStyle: 'normal',
              lineHeight: 20,
              color: '#9B9B9B'
            }}
          >
            matildabrown@mail.com
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 25 }}>
        <View style={styles.view_info}>
          <Text style={styles.txt_info}>My orders</Text>
          <Text style={styles.txt_underinfo}>Already have 12 orders</Text>
        </View>
        <TouchableOpacity>
          <Icons.Ionicons name={'chevron-forward-outline'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 25 }}>
        <View style={styles.view_info}>
          <Text style={styles.txt_info}>Shipping addresses</Text>
          <Text style={styles.txt_underinfo}>3 ddresses</Text>
        </View>
        <TouchableOpacity>
          <Icons.Ionicons name={'chevron-forward-outline'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 25 }}>
        <View style={styles.view_info}>
          <Text style={styles.txt_info}>Payment methods</Text>
          <Text style={styles.txt_underinfo}>Visa **34</Text>
        </View>
        <TouchableOpacity>
          <Icons.Ionicons name={'chevron-forward-outline'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 25 }}>
        <View style={styles.view_info}>
          <Text style={styles.txt_info}>Promocodes</Text>
          <Text style={styles.txt_underinfo}>You have special promocodes</Text>
        </View>
        <TouchableOpacity>
          <Icons.Ionicons name={'chevron-forward-outline'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 25 }}>
        <View style={styles.view_info}>
          <Text style={styles.txt_info}>My reviews</Text>
          <Text style={styles.txt_underinfo}>Reviews for 4 items</Text>
        </View>
        <TouchableOpacity>
          <Icons.Ionicons name={'chevron-forward-outline'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 25 }}>
        <View style={styles.view_info}>
          <Text style={styles.txt_info}>Settings</Text>
          <Text style={styles.txt_underinfo}>Notifications, password</Text>
        </View>
        <TouchableOpacity>
          <Icons.Ionicons name={'chevron-forward-outline'} size={24} />
        </TouchableOpacity>
      </View>
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
