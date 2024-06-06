import React, { useState } from 'react'
import {
  Image,
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

  const [isShowMeasureSize, setIsShowMeasureSize] = useState(false)

  const measureSize = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          paddingHorizontal: 16,
          marginBottom: 16
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{
              marginVertical: 16,

              width: 210,
              height: 250
            }}
            source={require('@assets/image_size_body.png')}
          />
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={styles.container_ic_measure}>
            <Icons.MaterialCommunityIcons name={'numeric-1'} size={30} />
          </View>
          <View>
            <Text
              style={{ fontSize: 16, color: Colors.black, fontWeight: '700' }}
            >
              Ngực
            </Text>
            <Text style={styles.txt_measure_title}>
              Đo vòng ngực đầy đặn nhất khu vực xung quanh của ngực
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={styles.container_ic_measure}>
            <Icons.MaterialCommunityIcons name={'numeric-2'} size={30} />
          </View>
          <View>
            <Text
              style={{ fontSize: 16, color: Colors.black, fontWeight: '700' }}
            >
              Eo
            </Text>
            <Text style={{ fontSize: 12, color: Colors.black, marginTop: 8 }}>
              Đo vòng eo tại vị trí hẹp nhất
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={styles.container_ic_measure}>
            <Icons.MaterialCommunityIcons name={'numeric-3'} size={30} />
          </View>
          <View>
            <Text
              style={{ fontSize: 16, color: Colors.black, fontWeight: '700' }}
            >
              Chiều dài cánh tay
            </Text>
            <Text style={{ fontSize: 12, color: Colors.black, marginTop: 8 }}>
              Đo từ vai đến cổ tay
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={styles.container_ic_measure}>
            <Icons.MaterialCommunityIcons name={'numeric-4'} size={30} />
          </View>
          <View>
            <Text
              style={{ fontSize: 16, color: Colors.black, fontWeight: '700' }}
            >
              Đường viền cổ áo
            </Text>
            <Text style={{ fontSize: 12, color: Colors.black, marginTop: 8 }}>
              Để có kích thước chuẩn cho áo sơ mi khi đeo cà vạt
            </Text>
          </View>
        </View>
      </View>
    )
  }
  return (
    <KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
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
          <Text
            style={
              isShowMeasureSize ? styles.txt_measure_active : styles.txt_measure
            }
          >
            Cách đo lường
          </Text>
          <TouchableOpacity
            onPress={() => setIsShowMeasureSize(!isShowMeasureSize)}
          >
            <Icons.Entypo
              name={
                !isShowMeasureSize ? 'chevron-small-down' : 'chevron-small-up'
              }
              size={20}
            />
          </TouchableOpacity>
        </View>
        {isShowMeasureSize ? measureSize() : null}
        <View style={{ backgroundColor: Colors.white, paddingBottom: 50 }}>
          <Text style={styles.txt_size_range}>Chọn phạm vi kích cỡ</Text>
          <View style={styles.container_btn_tab}>
            <View
              style={
                !isShowSize ? styles.btn_Active_Tab : styles.btn_no_Active_Tab
              }
            >
              <TouchableOpacity onPress={() => handleNormally()}>
                <Text style={{ textAlign: 'center' }}>Thông thường</Text>
              </TouchableOpacity>
            </View>
            <View
              style={
                isShowSize ? styles.btn_Active_Tab : styles.btn_no_Active_Tab
              }
            >
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
  txt_measure_title: {
    fontSize: 12,
    color: Colors.black,
    marginTop: 8,
    maxWidth: '95%'
  },
  container_ic_measure: {
    borderWidth: 2,
    alignItems: 'center',
    height: 38,
    padding: 2,
    marginEnd: 16,
    borderRadius: 30
  },
  txt_measure_active: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.red
  },
  txt_measure: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black
  },
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
