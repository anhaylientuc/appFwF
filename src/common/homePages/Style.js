//
import { StyleSheet } from 'react-native'
import Colors from 'src/constants/Colors'

const StyleHome = StyleSheet.create({
  txt_black: {
    top: '60%',
    left: 13
  },
  txt_new_collection: {
    fontSize: 34,
    color: Colors.white,
    fontWeight: '700',
    position: 'absolute',
    bottom: 17,
    right: 18
  },
  txt_Summer_sale: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.red
  },

  btn_check: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
    width: 160,
    height: 36,
    top: 8,
    borderRadius: 25
  },
  txt_fashion_sale: {
    color: Colors.white,
    fontSize: 48,
    fontWeight: '900'
    // fontFamily: 'Metropolis'
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: Colors.white
  }
})
export default StyleHome
