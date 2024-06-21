import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'

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
          <MyText style={styles.txt_size}>XSS-S</MyText>
        </Pressable>
        <Pressable style={styles.btn_size}>
          <MyText style={styles.txt_size}>M-XL</MyText>
        </Pressable>
        <Pressable style={styles.btn_size}>
          <MyText style={styles.txt_size}>XXL-3XL</MyText>
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
          <MyText style={styles.txt_size_parameters}>XXL</MyText>
          <MyText style={styles.txt_size_parameters}>XS</MyText>
          <MyText style={styles.txt_size_parameters}>S</MyText>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MyText style={styles.txt_body_parameters}>EUR</MyText>
        <View style={styles.container_size_parameters}>
          <MyText style={styles.txt_size_parameters}>38</MyText>
          <MyText style={styles.txt_size_parameters}>40-42</MyText>
          <MyText style={styles.txt_size_parameters}>44-46</MyText>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <MyText style={styles.txt_body_parameters}>US</MyText>
        <View style={[styles.container_size_parameters, styles.container_size_parameters_pink]}>
          <MyText style={styles.txt_size_parameters}>28</MyText>
          <MyText style={styles.txt_size_parameters}>30R-32</MyText>
          <MyText style={styles.txt_size_parameters}>34R-36R</MyText>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MyText style={styles.txt_body_parameters}>Ngực cm</MyText>
        <View style={styles.container_size_parameters}>
          <MyText style={styles.txt_size_parameters}>74-78</MyText>
          <MyText style={styles.txt_size_parameters}>78-86</MyText>
          <MyText style={styles.txt_size_parameters}>86-90</MyText>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MyText style={styles.txt_body_parameters}>Eo cm</MyText>
        <View style={[styles.container_size_parameters, styles.container_size_parameters_pink]}>
          <MyText style={styles.txt_size_parameters}>62-66</MyText>
          <MyText style={styles.txt_size_parameters}>66-74</MyText>
          <MyText style={styles.txt_size_parameters}>74-78</MyText>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MyText style={styles.txt_body_parameters}>Chiều dài cánh tay cm</MyText>
        <View style={styles.container_size_parameters}>
          <MyText style={styles.txt_size_parameters}>59</MyText>
          <MyText style={styles.txt_size_parameters}>59</MyText>
          <MyText style={styles.txt_size_parameters}>59-60</MyText>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MyText style={styles.txt_body_parameters}>Cổ cm</MyText>
        <View style={[styles.container_size_parameters, styles.container_size_parameters_pink]}>
          <MyText style={styles.txt_size_parameters}>33</MyText>
          <MyText style={styles.txt_size_parameters}>34-35</MyText>
          <MyText style={styles.txt_size_parameters}>36</MyText>
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
          <MyText style={styles.txt_size}>XS/L-M/L</MyText>
        </Pressable>
        <Pressable style={styles.btn_size}>
          <MyText style={styles.txt_size}>L/L-XXL/L</MyText>
        </Pressable>
        <Pressable style={styles.btn_size}>
          <MyText style={styles.txt_size}>3XL/L</MyText>
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
          <MyText style={styles.txt_size_parameters}>XS/L</MyText>
          <MyText style={styles.txt_size_parameters}>S/L</MyText>
          <MyText style={styles.txt_size_parameters}>M/L</MyText>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MyText style={styles.txt_body_parameters}>EUR</MyText>
        <View style={styles.container_size_parameters}>
          <MyText style={styles.txt_size_parameters}>38</MyText>
          <MyText style={styles.txt_size_parameters}>40-42</MyText>
          <MyText style={styles.txt_size_parameters}>44-46</MyText>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <MyText style={styles.txt_body_parameters}>US</MyText>
        <View style={[styles.container_size_parameters, styles.container_size_parameters_pink]}>
          <MyText style={styles.txt_size_parameters}>28</MyText>
          <MyText style={styles.txt_size_parameters}>30R-32</MyText>
          <MyText style={styles.txt_size_parameters}>34R-36R</MyText>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MyText style={styles.txt_body_parameters}>Ngực cm</MyText>
        <View style={styles.container_size_parameters}>
          <MyText style={styles.txt_size_parameters}>74-78</MyText>
          <MyText style={styles.txt_size_parameters}>78-86</MyText>
          <MyText style={styles.txt_size_parameters}>86-90</MyText>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MyText style={styles.txt_body_parameters}>Eo cm</MyText>
        <View style={[styles.container_size_parameters, styles.container_size_parameters_pink]}>
          <MyText style={styles.txt_size_parameters}>62-66</MyText>
          <MyText style={styles.txt_size_parameters}>66-74</MyText>
          <MyText style={styles.txt_size_parameters}>74-78</MyText>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MyText style={styles.txt_body_parameters}>Chiều dài cánh tay cm</MyText>
        <View style={styles.container_size_parameters}>
          <MyText style={styles.txt_size_parameters}>59</MyText>
          <MyText style={styles.txt_size_parameters}>59</MyText>
          <MyText style={styles.txt_size_parameters}>59-60</MyText>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MyText style={styles.txt_body_parameters}>Cổ cm</MyText>
        <View style={[styles.container_size_parameters, styles.container_size_parameters_pink]}>
          <MyText style={styles.txt_size_parameters}>33</MyText>
          <MyText style={styles.txt_size_parameters}>34-35</MyText>
          <MyText style={styles.txt_size_parameters}>36</MyText>
        </View>
      </View>
    </View>
  )
}
const SizeInfo = props => {
  const {
    navigation: { goBack }
  } = props
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
            source={require('@assets/images/image_size_body.png')}
          />
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={styles.container_ic_measure}>
            <Icons.MaterialCommunityIcons name={'numeric-1'} size={30} />
          </View>
          <View>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ fontSize: 16, color: Colors.black, fontWeight: '700' }}
            >
              Ngực
            </MyText>
            <MyText style={styles.txt_measure_title}>
              Đo vòng ngực đầy đặn nhất khu vực xung quanh của ngực
            </MyText>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={styles.container_ic_measure}>
            <Icons.MaterialCommunityIcons name={'numeric-2'} size={30} />
          </View>
          <View>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ fontSize: 16, color: Colors.black, fontWeight: '700' }}
            >
              Eo
            </MyText>
            <MyText style={{ fontSize: 12, color: Colors.black, marginTop: 8 }}>
              Đo vòng eo tại vị trí hẹp nhất
            </MyText>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={styles.container_ic_measure}>
            <Icons.MaterialCommunityIcons name={'numeric-3'} size={30} />
          </View>
          <View>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ fontSize: 16, color: Colors.black, fontWeight: '700' }}
            >
              Chiều dài cánh tay
            </MyText>
            <MyText style={{ fontSize: 12, color: Colors.black, marginTop: 8 }}>
              Đo từ vai đến cổ tay
            </MyText>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={styles.container_ic_measure}>
            <Icons.MaterialCommunityIcons name={'numeric-4'} size={30} />
          </View>
          <View>
            <MyText
              fontFamily={'Montserrat-SemiBold'}
              style={{ fontSize: 16, color: Colors.black, fontWeight: '700' }}
            >
              Đường viền cổ áo
            </MyText>
            <MyText style={{ fontSize: 12, color: Colors.black, marginTop: 8 }}>
              Để có kích thước chuẩn cho áo sơ mi khi đeo cà vạt
            </MyText>
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
            <MyText fontFamily={'Montserrat-SemiBold'} style={{ fontSize: 24, fontWeight: '600' }}>
              Áo và áo khoác
            </MyText>
            <TouchableOpacity onPress={() => goBack()}>
              <Icons.EvilIcons name={'close'} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container_measure}>
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={isShowMeasureSize ? styles.txt_measure_active : styles.txt_measure}
          >
            Cách đo lường
          </MyText>
          <TouchableOpacity onPress={() => setIsShowMeasureSize(!isShowMeasureSize)}>
            <Icons.Entypo
              name={!isShowMeasureSize ? 'chevron-small-down' : 'chevron-small-up'}
              size={20}
            />
          </TouchableOpacity>
        </View>
        {isShowMeasureSize ? measureSize() : null}
        <View style={{ backgroundColor: Colors.white, paddingBottom: 50 }}>
          <MyText fontFamily={'Montserrat-SemiBold'} style={styles.txt_size_range}>
            Chọn phạm vi kích cỡ
          </MyText>
          <View style={styles.container_btn_tab}>
            <View style={!isShowSize ? styles.btn_Active_Tab : styles.btn_no_Active_Tab}>
              <TouchableOpacity onPress={() => handleNormally()}>
                <MyText style={{ textAlign: 'center' }}>Thông thường</MyText>
              </TouchableOpacity>
            </View>
            <View style={isShowSize ? styles.btn_Active_Tab : styles.btn_no_Active_Tab}>
              <TouchableOpacity onPress={() => handleLongShape()}>
                <MyText style={{ textAlign: 'center' }}>Dáng dài</MyText>
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
