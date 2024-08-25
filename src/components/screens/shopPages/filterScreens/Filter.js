import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { useIsFocused } from '@react-navigation/native'
import qs from 'qs'
import React, { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator, // Import ActivityIndicator
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontFamily'
import { FilterContext } from 'src/contexts/FilterProvider'
import NewHTTP from 'src/utils/http/NewHTTP'
const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Filter = props => {
  const {
    navigation,
    route: {
      params: { category_id }
    }
  } = props

  const [filterData, setFilterData] = useState([]) // Renamed to avoid confusion with Filter component
  const { filterState, setFilterState } = useContext(FilterContext)
  const { _category_id, set_category_id } = useContext(FilterContext)
  const [products, setProducts] = useState([]) // Initialize with an empty array
  const [queryStringState, setqueryStringState] = useState(null)
  const isFocusScreen = useIsFocused()
  const [loading, setLoading] = useState(false) // Add loading state
  const [minPrice, setminPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100)
  const [showSlider, setshowSlider] = useState(false)
  const [twoWayValues, settwoWayValues] = useState([0, 100])
  const [priceLeft, setpriceLeft] = useState(0)
  const [priceRight, setpriceRight] = useState(100)
  const [finishSlider, setfinishSlider] = useState(false)
  const [step, setstep] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
        if (category_id) {
          set_category_id(category_id)
        }
        const query = {}
        const attributes = []
        for (const [key, value] of filterState.entries()) {
          if (key == 'Giá') {
            console.log('ok')
            const listPrice = filterState.get('Giá')
            query.minPrice = listPrice[0]
            query.maxPrice = listPrice[1]
          } 
          else
             attributes.push({ key, value })
        }
        if (attributes.length > 0) query.attributes = attributes
        query.category_id = category_id ? category_id : _category_id
        const queryString = qs.stringify(query)
        setqueryStringState(queryString)
        const response = await NewHTTP.getFilter(queryString)
        const { _attributes, _products } = response
        setFilterData(_attributes)
        const listPrice = _products.map(item => item.base_price)
        const min = Math.min(...listPrice)
        const max = Math.max(...listPrice)
       
        setProducts(_products) // Ensure products are set here
      } catch (error) {
        console.log('Error fetching data:', error)
      } finally {
        setLoading(false) // Stop loading
      }
    }
    fetchData()
  }, [filterState])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = { category_id: category_id, version: 2 }
        const res = await NewHTTP.getProducts(query)
        const listPrice = res.map(item => item.base_price)
        let min = Math.min(...listPrice)
        let max = Math.max(...listPrice)
       
        setminPrice(min)
        setMaxPrice(max)
        if (filterState instanceof Map && filterState.has('Giá')) {
          const values = filterState.get('Giá')
          min = values[0]
          max = values[1]
        }
        if(min==max){
          setstep(0)
          setminPrice(min)
          setMaxPrice(max)
        }
         
        else
          setstep(100)
        setpriceLeft(min)
        setpriceRight(max)
        settwoWayValues([min, max])
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const toggleSlider = () => {
    setshowSlider(!showSlider)
  }
  const setBottomBar = () => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        backgroundColor: Colors.white,
        bottom: 0,
        paddingVertical: 16,
        height: 68
      }
    })
  }

  const renderItem = ({ item }) => {
    const { key, child } = item

    return (
      <Pressable
        onPress={() => {
          props.navigation.navigate('DetailFilter', {
            child: item.child,
            keySelected: key,
            queryString: queryStringState
          })
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 16
        }}
      >
        <Spinner visible={loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
        <MyText>{key}</MyText>

        <View style={{ flexDirection: 'row' }}>
          {filterState instanceof Map && filterState.has(key)
            ? filterState.get(key).map((item, index) => (
              <Text
                key={index}
                numberOfLines={1}
                style={{ marginEnd: 16, maxWidth: windowWith / 1.5 }}
              >
                {item}
              </Text>
            ))
            : null}
          <Icons.AntDesign name="arrowright" size={20} />
        </View>
      </Pressable>
    )
  }

  const handleDeleteAllFilter = () => {
    if (filterState instanceof Map) {
      setFilterState(new Map())
      settwoWayValues([minPrice,maxPrice])
      setpriceLeft(minPrice)
      setMaxPrice(maxPrice)
    }
  }
  const handleValuesChange = values => {
    if(values[0]==values[1]){
      console.log('cc')
      return
    }
      
    console.log(values)
    setpriceLeft(values[0])
    setpriceRight(values[1])
  }
  function formatCurrencyVND(amount) {
    // Tạo một đối tượng NumberFormat cho tiếng Việt (Việt Nam)
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0 // Không hiển thị phần thập phân
    })

    return formatter.format(amount)
  }
  useEffect(() => {
    const fetchData = async () => {
      console.log('on finish', twoWayValues)
      // const query = { category_id: category_id, version: 2 }
      // const res = await NewHTTP.getProducts(query)
      const min = twoWayValues[0]
      const max = twoWayValues[1]
      console.log(twoWayValues)
      // const newProducts=res.filter(item=>(item['base_price']>=min&&item['base_price']<=max))
      // console.log(newProducts.length)
      // setProducts(newProducts)
      if (min != 0 && max != 100) {
        const map = new Map()
        map.set('Giá', [min, max])
        setFilterState(map)
      }
    }
    fetchData()
  }, [finishSlider])
  const handleValuesChangeFinish = values => {
    if(values[0]==values[1]){
      console.log('dkm')
      return
    }
      
    settwoWayValues(values)
    setfinishSlider(!finishSlider)
  }
  
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
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
              navigation.goBack({ categoryById: category_id })
            }}
          >
            <Icons.Feather name="x" size={30} />
          </TouchableOpacity>
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{ fontSize: 20, textAlign: 'center', flex: 2 }}
          >
            Bộ lọc & sắp xếp
          </MyText>
          <View style={{ flex: 1 }}>
            {filterState instanceof Map && filterState.size > 0 ? (
              <TouchableOpacity onPress={handleDeleteAllFilter}>
                <Text style={[styles.txt_description, { textAlign: 'right', fontSize: 12 }]}>
                  Xóa bộ lọc
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {loading ? ( // Display loading indicator
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.black} />
          </View>
        ) : (
          <>
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 16
              }}
            >
              <MyText>Sắp xếp theo</MyText>
              <Icons.AntDesign name="arrowright" size={20} />
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 16
              }}
              onPress={() => {
                toggleSlider()
              }}
            >
              <MyText>Giá</MyText>
              <Icons.AntDesign name="plus" size={20} />
            </Pressable>
            <View>
              {
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text style={styles.txt_title}>{formatCurrencyVND(priceLeft)}</Text>
                    <Text style={styles.txt_title}>{formatCurrencyVND(priceRight)}</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <MultiSlider
                      values={twoWayValues}
                      min={minPrice}
                      max={maxPrice}
                      sliderLength={350}
                      allowOverlap={true}
                      onValuesChangeFinish={handleValuesChangeFinish}
                      step={step}
                      onValuesChange={handleValuesChange}
                      selectedStyle={{
                        backgroundColor: 'black' // Màu của thanh trượt đã chọn
                      }}
                      unselectedStyle={{
                        backgroundColor: 'black' // Màu của thanh trượt chưa chọn
                      }}
                      markerStyle={{
                        backgroundColor: 'black' // Màu của điểm đánh dấu trên thanh trượt
                      }}
                    />
                  </View>
                </View>
              }
            </View>
            <FlatList data={filterData} renderItem={renderItem} keyExtractor={item => item.key} />
          </>
        )}
      </View>
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
          onPress={() => {
            if (Array.isArray(products) && products.length > 0) {
              console.log(products.length)
              navigation.navigate('ItemCategories', { _products: products })
            } else {
              console.log('No products to display')
            }
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
            Hiện thị {products ? products.length : ''} sản phẩm
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Filter

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
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    paddingHorizontal: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
