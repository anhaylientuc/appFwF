import React, { useContext, useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
import { FilterContext } from 'src/contexts/FilterProvider'
import { getFilter } from 'src/utils/http/NewHTTP'
import Icons from '../icons/Icon'

const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Filter = props => {
  const {
    navigation,
    route: {
      params: { category_id, quantityPr, map }
    }
  } = props

  const [Filter, setFilter] = useState([])
  const { filterState, setFilterState } = useContext(FilterContext)
  console.log('mh1', filterState)
  const [newValues, setnewValues] = useState([])
  const [newKey, setnewKey] = useState()

  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
    const fetchData = async () => {
      try {
        const response = await getFilter({ category_id: category_id })
        setFilter(response)
      } catch (error) {}
    }
    fetchData()
  }, [filterState])
  // console.log('Data nè cu :))', JSON.stringify(filterState, null, 2))

  // set Bottom navigation on
  const setBottomBar = () => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        backgroundColor: Colors.white,
        bottom: 0,
        paddingVertical: 16,
        height: 68
        // position: 'absolute'
      }
    })
  }

  const handleBack = () => {
    props.navigation.goBack()
    setBottomBar()
    setFilterState([])
  }

  const renderItem = ({ item, index }) => {
    const { key, quantity, child } = item
    const value = child
    if (filterState && filterState.size > 0) console.log('dkm', filterState.get(key))

    // const newMap = map.map(obj => obj.values)
    return (
      <Pressable
        onPress={() =>
          props.navigation.navigate('DetailFilter', { child: item.child, keySelected: key })
        }
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 16
        }}
      >
        <MyText>{key}</MyText>

        <View style={{ flexDirection: 'row' }}>
          {true ? (
            <Text numberOfLines={1} style={{ marginEnd: 16, maxWidth: windowWith / 1.5 }}>
              cmm
            </Text>
          ) : null}
          <Icons.AntDesign name="arrowright" size={20} />
        </View>
      </Pressable>
    )
  }

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 }}
        >
          <TouchableOpacity onPress={() => handleBack()}>
            <Icons.Feather name="x" size={30} />
          </TouchableOpacity>
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{ fontSize: 20, flex: 1, marginStart: 32 }}
          >
            Bộ lọc & sắp xếp
          </MyText>
        </View>

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
        >
          <MyText>Giá</MyText>
          <Icons.AntDesign name="plus" size={20} />
        </Pressable>

        <FlatList data={Filter} renderItem={renderItem} keyExtractor={item => item.key} />
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
        >
          <Text
            style={{
              color: Colors.white,
              fontSize: 16,
              textAlign: 'center',
              fontFamily: 'Montserrat-SemiBold'
            }}
          >
            Hiện thị {quantityPr} sản phẩm
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Filter

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    paddingHorizontal: 16
  }
})
