import { StyleSheet, View } from 'react-native'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
const Profile = () => {
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}
    >
      <MyText
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: 24,
          color: Colors.black
        }}
      >
        Profile
      </MyText>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})
