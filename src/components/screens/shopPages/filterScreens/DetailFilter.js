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
import Colors from 'src/constants/Colors';
import MyText from 'src/constants/FontFamily';
import { FilterContext } from 'src/contexts/FilterProvider'
import Icons from 'src/components/icons/Icon';
import NewHTTP from 'src/utils/http/NewHTTP'
import qs from 'qs'
const windowWidth = Dimensions.get('window').width

const DetailFilter = props => {
  const {
    navigation,
    route: {
      params: { child, keySelected, queryString },
    }
  } = props

  const position = useRef(new Animated.ValueXY({ x: 500, y: 0 })).current
  const [isListItem, setListItem] = useState([])
  const [selectedId, setSelectedId] = useState(child)
  const [quantity, setQuantity] = useState()
  const [map, setmap] = useState([])
  const { filterState, setFilterState } = useContext(FilterContext)
  const [products, setproducts] = useState([])
  const [myHashMap, setmyHashMap] = useState(null)
  const [attr, setattr] = useState(null)
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

          for (const [key, value] of filterState.entries()) {

            if (keySelected === key) {
              setListItem(value)
            }
            newHashMap.set(key, value)
          }
          setmyHashMap(newHashMap)
          fetchValues()


        }
        fetchAttr()
      } catch (error) {
        // Handle error
        console.log(error)
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    setproducts(products)
  }, [products])
  const [values, setvalues] = useState([])
  const fetchValues = () => {
    try {
      const newValues = child.map((item, index) => {
        var isCheck = false
        if (filterState instanceof Map) {
          for (const value of filterState.get(keySelected)) {
            if (item.value == value) {
              isCheck = true;
              break;
            }

          }

        }
        return { ...item, selected: isCheck }

      });
      if (newValues.length > 0) {
        console.log(newValues)
        setvalues(newValues)

      }
    } catch (error) {
      console.log('fetchValues', error)
    }

  }

  const handleChecked = async (item, index) => {
    const newValues = values.map((obj, i) => {
      const { selected } = obj
      if (index == i) {
        return { ...obj, selected: !selected }
      }
      return obj
    })
    setvalues(newValues)
    const isDuplicate = isListItem.some(listItemValue => listItemValue === item.value)
    if (!isDuplicate) {
      const newList = [...isListItem, item.value]
      setListItem(newList)
      myHashMap.set(keySelected, newList)
    } else {
      const newCompanies = isListItem.filter(listItem => {
        if (listItem !== item.value) return listItem
      })
      setListItem(newCompanies)
      myHashMap.set(keySelected, newCompanies)
      if (newCompanies.length == 0)
        myHashMap.delete(keySelected)
    }
    setFilterState(myHashMap)
    await fetchAttr()
  }
  const fetchAttr = async () => {
    try {
      const attr = []
      for (const [key, value] of filterState.entries()) {
        attr.push({
          key: key,
          value: value
        })
      }

      var newQs = qs.parse(queryString)
      newQs = { ...newQs, attributes: attr }
      console.log('newQs', newQs)

      newQs = qs.stringify(newQs)
      const res = await NewHTTP.getFilter(newQs)
      const { _attributes, _products } = res
      
      setproducts(_products)
      console.log(products.length)
    } catch (error) {
      console.log('haha', error)
    }

  }
  const fetchProducts = async () => {

    //console.log(attr)
  }
  const handleSubmit = async () => {
    console.log(attr)
    await fetchProducts()
  }
  const handleDeleteAllFilter = () => {
    if (filterState instanceof Map) {
      filterState.delete(keySelected)
      setFilterState(filterState)
    }
    const newValues = values.map((item) => {
      return { ...item, selected: false }
    })
    setvalues(newValues)
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
            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, alignItems: 'center' }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                navigation.navigate('Filter', {
                  map: map,
                })
              }
              }

            >
              <Icons.AntDesign name="arrowleft" size={30} />
            </TouchableOpacity>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ fontSize: 20, flex: 2, textAlign: 'center' }}
            >
              Detail
            </MyText>
            <View style={{ flex: 1 }}>
              {
                myHashMap instanceof Map && myHashMap.has(keySelected) &&
                <TouchableOpacity onPress={() => handleDeleteAllFilter()}>
                  <Text>Xóa các bộ lọc</Text>
                </TouchableOpacity>
              }

            </View>
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
          onPress={() => {
            navigation.navigate('ItemCategories', { _products: products })

          }}
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
            Hiện thị {products && products.length} sản phẩm
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
