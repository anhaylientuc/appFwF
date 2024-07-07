import React, { useEffect, useState } from 'react'
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
import Icons from '../icons/Icon'
const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const DetailFilter = props => {
  const {
    navigation,
    route: {
      params: { child }
    }
  } = props
  const position = new Animated.ValueXY({ x: 500, y: 0 })
  Animated.timing(position, {
    toValue: { x: 0, y: 0 },
    duration: 250,
    useNativeDriver: true
  }).start()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = child
        setChecked(response)
      } catch (error) {}
    }
    fetchData()
  }, [])

  const [isListItem, setListItem] = useState([])
  const [selectedId, setSelectedId] = useState(child)
  const [quantity, setQuantity] = useState() // Initialize with an array or empty array

  const handleChecked = (item, index) => {
    // Create a copy of the selectedId array to avoid mutation
    const newSelectedId = [...selectedId]
    // Find the index of the item based on value (assuming unique values)
    const itemIndex = newSelectedId.findIndex(e => e.value === item.value)
    // Toggle the selected state for the matching item
    if (itemIndex !== -1) {
      newSelectedId[itemIndex] = {
        ...newSelectedId[itemIndex],
        selected: !newSelectedId[itemIndex].selected
      }
    } else {
      // Add the item to the array if not already present
      newSelectedId.push({ ...item, selected: true })
    }

    // Update the state with the modified array
    setSelectedId(newSelectedId)
    setQuantity(selectedId[index].quantity)
    // console.log(JSON.stringify(selectedId[index], null, 2))

    const isDuplicate = isListItem.some(listItemValue => listItemValue === item.value)

    // Add unique values to isListItem
    if (!isDuplicate) {
      setListItem([...isListItem, item.value])
      console.log('Đã thêm giá trị duy nhất:', item.value) // For debugging
    } else {
      console.log('Xóa giá trị đã chọn khỏi mảng:', item.value) // For debuggin
      const newCompanies = isListItem.filter(listItem => listItem !== item.value)
      // Cập nhật state
      setListItem(newCompanies)
    }
  }
  console.log('>>> Các giá trị đã select', JSON.stringify(isListItem, null, 2))
  return (
    <KeyboardAvoidingView>
      <Animated.View
        style={{
          backgroundColor: Colors.white,
          width: windowWith,
          height: '100%',
          transform: [{ translateX: position.x }, { translateY: position.y }]
        }}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Filter', { listItemSelected: isListItem.toString() })
              }
            >
              <Icons.AntDesign name="arrowleft" size={30} />
            </TouchableOpacity>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ fontSize: 20, flex: 1, marginStart: 32 }}
            >
              Detail
            </MyText>
          </View>
          <View />
          {child.map((item, index) => (
            <View key={index} style={styles.section}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => handleChecked(item, index)}
              >
                <Icons.MaterialCommunityIcons
                  name={selectedId[index].selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={24}
                />
                <Text style={{ marginStart: 16 }}>{item.value}</Text>
              </TouchableOpacity>
              <Text style={styles.paragraph}>{item.quantity}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          paddingVertical: 16,
          paddingHorizontal: 20,
          backgroundColor: Colors.grayBg,
          width: '100%'
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.black,
            padding: 16
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontSize: 16,
              textAlign: 'center',
              fontFamily: 'Montserrat-SemiBold'
            }}
          >
            Hiện thị {quantity} sản phẩm
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default DetailFilter

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  paragraph: {
    fontSize: 15
  },
  checkbox: {
    margin: 8
  }
})
