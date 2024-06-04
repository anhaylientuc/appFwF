import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'

const Tab1 = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        padding: 16
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          marginVertical: 16
        }}
      >
        <Pressable onPress={() => {}} style={styles.btn_size}>
          <Text style={styles.txt_size}>XSS-S</Text>
        </Pressable>
        <Pressable style={styles.btn_size}>
          <Text style={styles.txt_size}>M-XL</Text>
        </Pressable>
        <Pressable style={styles.btn_size}>
          <Text style={styles.txt_size}>XXL-3XL</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={{ flex: 1 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            flex: 3
          }}
        >
          <Text style={styles.txt_size_parameters}>XXL</Text>
          <Text style={styles.txt_size_parameters}>XS</Text>
          <Text style={styles.txt_size_parameters}>S</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.txt_body_parameters}>EUR</Text>
        <View style={styles.container_size_parameters}>
          <Text style={styles.txt_size_parameters}>38</Text>
          <Text style={styles.txt_size_parameters}>40-42</Text>
          <Text style={styles.txt_size_parameters}>44-46</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.txt_body_parameters}>US</Text>
        <View
          style={[
            styles.container_size_parameters,
            styles.container_size_parameters_pink
          ]}
        >
          <Text style={styles.txt_size_parameters}>28</Text>
          <Text style={styles.txt_size_parameters}>30R-32</Text>
          <Text style={styles.txt_size_parameters}>34R-36R</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.txt_body_parameters}>Ngực cm</Text>
        <View style={styles.container_size_parameters}>
          <Text style={styles.txt_size_parameters}>74-78</Text>
          <Text style={styles.txt_size_parameters}>78-86</Text>
          <Text style={styles.txt_size_parameters}>86-90</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.txt_body_parameters}>Eo cm</Text>
        <View
          style={[
            styles.container_size_parameters,
            styles.container_size_parameters_pink
          ]}
        >
          <Text style={styles.txt_size_parameters}>62-66</Text>
          <Text style={styles.txt_size_parameters}>66-74</Text>
          <Text style={styles.txt_size_parameters}>74-78</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.txt_body_parameters}>Chiều dài cánh tay cm</Text>
        <View style={styles.container_size_parameters}>
          <Text style={styles.txt_size_parameters}>59</Text>
          <Text style={styles.txt_size_parameters}>59</Text>
          <Text style={styles.txt_size_parameters}>59-60</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.txt_body_parameters}>Cổ cm</Text>
        <View
          style={[
            styles.container_size_parameters,
            styles.container_size_parameters_pink
          ]}
        >
          <Text style={styles.txt_size_parameters}>33</Text>
          <Text style={styles.txt_size_parameters}>34-35</Text>
          <Text style={styles.txt_size_parameters}>36</Text>
        </View>
      </View>
    </View>
  )
}
const Tab2 = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        padding: 16
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',

          marginVertical: 32
        }}
      >
        <Pressable onPress={() => {}} style={styles.btn_size}>
          <Text style={styles.txt_size}>XS/L-M/L</Text>
        </Pressable>
        <Pressable style={styles.btn_size}>
          <Text style={styles.txt_size}>L/L-XXL/L</Text>
        </Pressable>
        <Pressable style={styles.btn_size}>
          <Text style={styles.txt_size}>3XL/L</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={{ flex: 1 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            flex: 3
          }}
        >
          <Text style={styles.txt_size_parameters}>XS/L</Text>
          <Text style={styles.txt_size_parameters}>S/L</Text>
          <Text style={styles.txt_size_parameters}>M/L</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.txt_body_parameters}>EUR</Text>
        <View style={styles.container_size_parameters}>
          <Text style={styles.txt_size_parameters}>38</Text>
          <Text style={styles.txt_size_parameters}>40-42</Text>
          <Text style={styles.txt_size_parameters}>44-46</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.txt_body_parameters}>US</Text>
        <View
          style={[
            styles.container_size_parameters,
            styles.container_size_parameters_pink
          ]}
        >
          <Text style={styles.txt_size_parameters}>28</Text>
          <Text style={styles.txt_size_parameters}>30R-32</Text>
          <Text style={styles.txt_size_parameters}>34R-36R</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.txt_body_parameters}>Ngực cm</Text>
        <View style={styles.container_size_parameters}>
          <Text style={styles.txt_size_parameters}>74-78</Text>
          <Text style={styles.txt_size_parameters}>78-86</Text>
          <Text style={styles.txt_size_parameters}>86-90</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.txt_body_parameters}>Eo cm</Text>
        <View
          style={[
            styles.container_size_parameters,
            styles.container_size_parameters_pink
          ]}
        >
          <Text style={styles.txt_size_parameters}>62-66</Text>
          <Text style={styles.txt_size_parameters}>66-74</Text>
          <Text style={styles.txt_size_parameters}>74-78</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.txt_body_parameters}>Chiều dài cánh tay cm</Text>
        <View style={styles.container_size_parameters}>
          <Text style={styles.txt_size_parameters}>59</Text>
          <Text style={styles.txt_size_parameters}>59</Text>
          <Text style={styles.txt_size_parameters}>59-60</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.txt_body_parameters}>Cổ cm</Text>
        <View
          style={[
            styles.container_size_parameters,
            styles.container_size_parameters_pink
          ]}
        >
          <Text style={styles.txt_size_parameters}>33</Text>
          <Text style={styles.txt_size_parameters}>34-35</Text>
          <Text style={styles.txt_size_parameters}>36</Text>
        </View>
      </View>
    </View>
  )
}
const SizeInfo = props => {
  const { navigation } = props
  const [isShowSize, setIsShowSize] = useState(false)

  // Logic: Onclick show size parameters  thông thường
  const handleNormally = () => {
    setIsShowSize(false)
  }
  // Logic: Onclick show size parameters Dáng dài
  const handleLongShape = () => {
    setIsShowSize(true)
  }
  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.wrapper}>
        <View style={{ marginTop: 32, paddingHorizontal: 9 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View />
            <Text style={{ fontSize: 24, fontWeight: '600' }}>
              Áo và áo khoác
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductWomen')}
            >
              <Icons.EvilIcons name={'close'} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container_measure}>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>Cách đo lường</Text>
          <Icons.Entypo name={'chevron-small-down'} size={20} />
        </View>
        <View style={{ backgroundColor: Colors.white, paddingBottom: 50 }}>
          <Text style={styles.txt_size_range}>Chọn phạm vi kích cỡ</Text>
          <View style={styles.container_btn_tab}>
            <View style={styles.btn_Active_Tab}>
              <TouchableOpacity onPress={() => handleNormally()}>
                <Text style={{ textAlign: 'center' }}>Thông thường</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_no_Active_Tab}>
              <TouchableOpacity onPress={() => handleLongShape()}>
                <Text style={{ textAlign: 'center' }}>Dáng dài</Text>
              </TouchableOpacity>
            </View>
          </View>
          {
            /**
             * Logic: Khi ấn vào Button thông thường => show Tab1() và ngược lại với button Dáng dài
             */

            !isShowSize ? Tab1() : Tab2()
          }
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SizeInfo

const styles = StyleSheet.create({
  container_measure: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 20,
    backgroundColor: Colors.white
  },
  txt_size_range: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    padding: 10,
    backgroundColor: Colors.white
  },
  btn_no_Active_Tab: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.white,
    paddingVertical: 20,
    flex: 1
  },
  btn_Active_Tab: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.red,
    paddingVertical: 20,
    flex: 1
  },
  container_btn_tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16
  },
  txt_size: {
    color: Colors.white,
    fontWeight: '500'
  },
  btn_size: {
    backgroundColor: Colors.red,
    borderRadius: 8,
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 10
  },
  txt_body_parameters: { flex: 1, paddingVertical: 10 },
  txt_size_parameters: { textAlign: 'center', flex: 1 },
  container_size_parameters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFE4B5',
    flex: 3
  },
  container_size_parameters_pink: {
    backgroundColor: '#FDF5E6'
  },
  wrapper: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: Colors.grayBg
  }
})
