// StyleCommon: là file chứa các style sheet chung dành cho toàn components
import { StyleSheet } from 'react-native';
const StyleCommon = StyleSheet.create({
  viewMain: {
    padding: 20,
  },
  button1: {
    backgroundColor: 'red',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
export default StyleCommon;
