import qs from 'qs'
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
import Spinner from 'react-native-loading-spinner-overlay'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import Names from 'src/constants/Names'
import { FilterContext } from 'src/contexts/FilterProvider'
import NewHTTP from 'src/utils/http/NewHTTP'

const windowWidth = Dimensions.get('window').width

const DetailFilter = props => {
  const {
    navigation,
    route: {
      params: { child, keySelected, queryString,action }
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
  const [loading, setloading] = useState(false)
  const [colors, setcolors] = useState([])
  const [childState, setchildState] = useState([])
  useEffect(() => {
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 250,
      useNativeDriver: true
    }).start()
  }, [position])

  useEffect(() => {
    setTimeout(() => {
      setloading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = child;
        if (!Array.isArray(child)) return
        console.log('>>>', child)
        if (filterState instanceof Map && filterState.has(keySelected)) {
          const filter = filterState.get(keySelected)
          console.log('filter', filter)
          const newChild = child.map(item => {
            const result = filter.includes(item.value)
            return { ...item, selected: result }
          })
          console.log(newChild)
          setvalues(newChild)
        } else setvalues(child)

        // fetchValues()
        // const newHashMap = new Map();
        // setSelectedId(response);
        // if (filterState) {
        //   for (const [key, value] of filterState.entries()) {
        //     if (keySelected === key) {
        //       setListItem(value);
        //     }
        //     newHashMap.set(key, value);
        //   }
        //   setmyHashMap(newHashMap);
        // }

        await fetchAttr()
      } catch (error) {
        // Handle error
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const [values, setvalues] = useState([])
  const fetchValues = () => {
    try {
      if (!(filterState instanceof Map)) {
        console.log('filterState rỗng')
        return
      }
      const filterValues = filterState.get(keySelected)
      if (!Array.isArray(filterValues)) {
        console.log('filterValues rỗng')
        return
      }
      const newValues = childState.map(item => {
        const check = filterValues.includes(item.value)
        return { ...item, selected: check }
      })
      setvalues(newValues)
    } catch (error) {
      console.log('fetchValues', error)
    }
  }

  const handleChecked = async (item, index) => {
    try {
      setloading(true)
      let newValues = values.map((obj, i) => {
        const { selected } = obj
        if (index == i) {
          return { ...obj, selected: !selected }
        }
        return obj
      })

      setvalues(newValues)
      newValues = newValues
        .filter(item => item.selected == true)
        .map(item => {
          return item.value
        })

      const updatedHashmap = new Map(filterState)
      updatedHashmap.set(keySelected, newValues)
      if (newValues.length == 0) updatedHashmap.delete(keySelected)
      console.log(updatedHashmap)
      setFilterState(updatedHashmap)
      console.log(filterState)
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log('ok')
      await fetchAttr()
    }
    fetchData()
  }, [filterState])

  const fetchAttr = async () => {
    try {
      setloading(true)

      const attr = []
      var newQs = qs.parse(queryString)
      for (const [key, value] of filterState.entries()) {
        if (key == 'Giá') {
          newQs.minPrice = value[0]
          newQs.maxPrice = value[1]
        } else {
          attr.push({
            key: key,
            value: value
          })
        }
      }

      newQs = { ...newQs, attributes: attr }
      newQs = qs.stringify(newQs)
      const res = await NewHTTP.getFilter(newQs)

      const { _attributes, _products } = res
      setproducts(_products)
    } catch (error) {
      console.log('fetchAttr', error)
    } finally {
      setloading(false)
    }
  }

  const handleDeleteAllFilter = () => {
    if (filterState instanceof Map) {
      filterState.delete(keySelected)
      setFilterState(filterState)
    }
    const newValues = values.map(item => {
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
        <Spinner visible={loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 16,
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                navigation.navigate('Filter', {
                  map: map,
                  action:action
                })
              }}
            >
              <Icons.AntDesign name="arrowleft" size={30} />
            </TouchableOpacity>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ fontSize: 20, flex: 2, textAlign: 'center' }}
            >
              {keySelected}
            </MyText>
            <View style={{ flex: 1 }}>
              {myHashMap instanceof Map && myHashMap.has(keySelected) && (
                <TouchableOpacity onPress={() => handleDeleteAllFilter()}>
                  <Text style={[styles.txt_description, { fontSize: 12 }]}>Xóa các bộ lọc</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View />
          {values.map((item, index) => {
            const { value } = item
            return (
              <View
                key={index}
                style={[
                  styles.section,
                  {
                    backgroundColor: values[index].selected ? Colors.lightgoldenrodyellow : 'white',
                    width: '100%'
                  },
                  values[index].quantity == 0 ? { opacity: 0.3, pointerEvents: 'none' } : null
                ]}
              >
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleChecked(item, index)}
                >
                  <Icons.MaterialCommunityIcons
                    name={values[index].selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={24}
                  />
                  <Text style={{ marginStart: 16 }}>{Names[value] ? Names[value] : value}</Text>
                  {keySelected == 'Màu sắc' ? (
                    <View
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 7,
                        borderColor: 'black',
                        borderWidth: 1,
                        backgroundColor: Colors[value] ? Colors[value] : 'white',
                        alignItems: 'center',
                        marginLeft: 5
                      }}
                    ></View>
                  ) : null}
                </TouchableOpacity>
                <Text style={styles.paragraph}>{item.quantity}</Text>
              </View>
            )
          })}
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
            console.log(action)
            if(action=='search')
              navigation.navigate('SearchDetail',{keyword:"",productsNe:products})
            else
              navigation.navigate('ItemCategories', { _products: products })
            //navigation.goBack()
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
  txt_title: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.black2
  },
  txt_description: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: Colors.black2
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  paragraph: {
    fontSize: 15
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
