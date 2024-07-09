import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { FilterContext } from 'src/contexts/FilterProvider'
import Icons from '../icons/Icon'

const windowWidth = Dimensions.get('window').width

const DetailFilter = props => {
  const {
    navigation,
    route: {
      params: { child, keySelected }
    }
  } = props

  const position = useRef(new Animated.ValueXY({ x: 500, y: 0 })).current
  const [isListItem, setListItem] = useState([])
  const [selectedId, setSelectedId] = useState(child)
  const [quantity, setQuantity] = useState()
  const [map, setmap] = useState([])
  const { filterState, setFilterState } = useContext(FilterContext)
  const [myHashMap, setmyHashMap] = useState(null)
  console.log('>>>', isListItem)

  useEffect(() => {
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 250,
      useNativeDriver: true
    }).start()
  }, [position])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = child
        setvalues(child)
        const newHashMap = new Map()
        setSelectedId(response)
        if (filterState) {
          let it = filterState.entries()
          for (const [key, value] of filterState.entries()) {
            if (keySelected == key) {
              setListItem(value)
            }
            newHashMap.set(key, value)
          }
          setmyHashMap(newHashMap)
        }
      } catch (error) {
        // Handle error
      }
    }
    fetchData()
  }, [child])
  const [values, setvalues] = useState([])

  const handleChecked = (item, index) => {
    console.log(index)
    const newValues = values.map((obj, i) => {
      const { selected } = obj

      if (index == i) {
        console.log(i)
        return { ...obj, selected: !selected }
      }
      return obj
    })
    setvalues(newValues)
    console.log(newValues)

    const isDuplicate = isListItem.some(listItemValue => listItemValue === item.value)
    console.log('Before: ', myHashMap)
    if (!isDuplicate) {
      const newList = [...isListItem, item.value]
      setListItem(newList)
      myHashMap.set(keySelected, newList)
      console.log('Check', myHashMap)
    } else {
      const newCompanies = isListItem.filter(listItem => {
        if (listItem !== item.value) return listItem
      })
      setListItem(newCompanies)
      myHashMap.set(keySelected, newCompanies)
      console.log('Uncheck', myHashMap)
    }

    setFilterState(myHashMap)
  }

  return (
    <KeyboardAvoidingView>
      <Animated.View
        style={{
          backgroundColor: Colors.white,
          width: windowWidth,
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
                navigation.navigate('Filter', {
                  map: map
                })
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
          {values.map((item, index) => (
            <View key={index} style={styles.section}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => handleChecked(item, index)}
              >
                <Icons.MaterialCommunityIcons
                  name={values[index].selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
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
