import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Colors from 'src/constants/Colors'

const GoogleMaps = () => {
  const [permissionGranter, setPermissionGranter] = useState(false)
  const [formattedAddress, setFormattedAddress] = useState('')
  const [markerList, setMarkerList] = useState([
    {
      id: 1,
      latitude: 10.852832,
      longitude: 106.629543,
      title: 'Nơi làm việc',
      description: 'Đây là địa chỉ giao hàng của tôi'
    }
  ])

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 10.852832,
    longitude: 106.629543,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  })

  const defaultMarkerPosition = {
    latitude: 10.852832,
    longitude: 106.629543,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  }

  const navigation = useNavigation()

  useEffect(() => {
    _getLocationPermission()
  }, [])

  async function _getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status === 'granted') {
      setPermissionGranter(true)
      _getCurrentLocation()
    } else {
      console.log('Location permission denied')
    }
  }

  async function _getCurrentLocation() {
    try {
      let location = await Location.getCurrentPositionAsync({})
      setCurrentPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      })
      _getAddress(location.coords)
    } catch (error) {
      console.log('Error getting current location', error)
    }
  }

  async function _getAddress(coords) {
    try {
      let addressArray = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude
      })
      if (addressArray.length > 0) {
        const formattedAddress = addressArray[0].formattedAddress
        setFormattedAddress(_extractAddressDetails(formattedAddress))
      }
    } catch (error) {
      console.log('Error getting address', error)
    }
  }

  function _extractAddressDetails(formattedAddress) {
    const addressParts = formattedAddress.split(', ')
    // Assuming the format is House Number, Street Name, Ward, District, City, Country
    // Adjust the indices as needed to get the desired parts
    const relevantParts = addressParts.slice(1, 4) // Adjust this as per your address format
    return relevantParts.join(', ')
  }

  const setLocation = () => {
    _getCurrentLocation()
  }

  const resetAddress = () => {
    setCurrentPosition(defaultMarkerPosition)
  }

  const onMarkerDragEnd = (e, index) => {
    // Handle marker drag end logic if needed
  }

  const goBackWithAddress = () => {
    navigation.navigate('Edit',{ formattedAddress: formattedAddress })
    // navigation.goBack()
  }

  if (!permissionGranter) {
    return <Text>Vui lòng chọn địa chỉ hiện tại rồi tiếp tục</Text>
  }

  return (
    <View style={styles.container}>
      <MapView provider={MapView.PROVIDER_GOOGLE} style={styles.map} region={currentPosition}>
        {markerList.map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
            draggable
            onDragEnd={e => onMarkerDragEnd(e, index)}
          />
        ))}
      </MapView>
      <View style={{ width: '100%', position: 'absolute', flexDirection: 'row', top: 0 }}>
        <View style={{ width: 8 }} />
        <TouchableOpacity style={styles.btn} onPress={resetAddress}>
          <Text style={{ textAlign: 'center', color: Colors.white }}>Địa chỉ giao hàng</Text>
        </TouchableOpacity>
        <View style={{ width: 8 }} />
        <TouchableOpacity style={styles.btn} onPress={setLocation}>
          <Text style={{ textAlign: 'center', color: Colors.white }}>Vị trí hiện tại</Text>
        </TouchableOpacity>
        <View style={{ width: 8 }} />
      </View>
      {formattedAddress && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{formattedAddress}</Text>
          <TouchableOpacity style={styles.btn} onPress={goBackWithAddress}>
            <Text style={{ textAlign: 'center', color: Colors.white }}>Xác nhận địa chỉ</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  btn: { backgroundColor: Colors.blue, flex: 1, padding: 8, marginTop: 8 },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  addressContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5
  },
  addressText: {
    color: Colors.white,
    fontSize: 16
  }
})

export default GoogleMaps
