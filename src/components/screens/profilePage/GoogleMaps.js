import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const GoogleMaps = () => {
  const [permissionGranter, setPermissionGranter] = useState(false)
  const [markerList, setMarkerList] = useState([
    {
      id: 1,
      latitude: 10.807503,
      longitude: 106.674629,
      title: 'Nhà tôi đây',
      description: 'Đây là địa chỉ giao hàng của tôi'
    }
  ])

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 10.807503,
    longitude: 106.674629,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  })

  // Save the default marker position
  const defaultMarkerPosition = {
    latitude: 10.807503,
    longitude: 106.674629,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  }

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

  function _getCurrentLocation() {
    Location.getCurrentPositionAsync({})
      .then(location => {
        setCurrentPosition({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        })
      })
      .catch(error => {
        console.log('Error getting current location', error)
      })
  }

  const setLocation = () => {
    _getCurrentLocation()
  }

  const resetAddress = () => {
    // Reset currentPosition to defaultMarkerPosition
    setCurrentPosition(defaultMarkerPosition)
  }

  const onMarkerDragEnd = (e, index) => {
    // Handle marker drag end logic if needed
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
      <Button title="Reset Address" onPress={resetAddress} />
      <Button title="Set Location" onPress={setLocation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

export default GoogleMaps
