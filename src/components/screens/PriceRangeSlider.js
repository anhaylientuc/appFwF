import Slider from '@react-native-community/slider'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from 'src/constants/Colors'
const PriceRangeSlider = () => {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100)

  const handleSliderChange = value => {
    if (value < minPrice) {
      setMinPrice(value)
    } else {
      setMaxPrice(value)
    }
  }

  const handleMinPriceChange = value => {
    setMinPrice(value)
    if (value > maxPrice) {
      setMaxPrice(value)
    }
  }

  const handleMaxPriceChange = value => {
    setMaxPrice(value)
    if (value < minPrice) {
      setMinPrice(value)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.priceRange}>
        <Text style={styles.priceLabel}>Giá từ:</Text>
        <View style={styles.inputContainer}>
          <Slider
            style={styles.priceSlider}
            minimumValue={0}
            maximumValue={maxPrice}
            value={minPrice}
            thumbTintColor={"#007bff"}
            onValueChange={handleSliderChange}
          />
          <TextInput
            style={styles.priceInput}
            keyboardType="number-pad"
            value={`${minPrice}`}
            onChangeText={value => handleMinPriceChange(parseInt(value))}
          />
        </View>
      </View>
      <View style={styles.priceRange}>
        <Text style={styles.priceLabel}>Giá đến:</Text>
        <View style={styles.inputContainer}>
          <Slider
            style={styles.priceSlider}
            minimumValue={minPrice}
            maximumValue={100}
            value={maxPrice}
            thumbTintColor="#007bff"
            onValueChange={handleSliderChange}
          />
          <TextInput
            style={styles.priceInput}
            keyboardType="number-pad"
            value={`${maxPrice}`}
            onChangeText={value => handleMaxPriceChange(parseInt(value))}
          />
        </View>
      </View>
    </View>
  )
}

export default PriceRangeSlider
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  priceRange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceSlider: {
    width: 200,
    height: 20,
    marginRight: 10
  },
  priceInput: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center'
  }
})
