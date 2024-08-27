import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Colors from 'src/constants/Colors'
const windowWith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const HomePage = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ paddingVertical: 16 }}>
        <Text style={[styles.txt_description, { fontSize: 12, textAlign: 'center' }]}>
          Miễn phí giao hàng cho Member với đơn từ 499k
        </Text>
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <Image
          style={{ width: '100%', height: windowHeight / 2 }}
          source={require('@assets/images/fwfBackgroud.jpg')}
        />
        <View style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
          <LinearGradient
            colors={[Colors.transparent0, Colors.black]}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 16
            }}
          >
            <Text
              style={[
                styles.txt_description,
                { color: Colors.white, fontSize: 16, textAlign: 'center' }
              ]}
            >
              Hàng mới về
            </Text>
            <Text
              style={[styles.txt_title, { color: Colors.white, fontSize: 20, textAlign: 'center' }]}
            >
              Phong cách đón thu
            </Text>
          </LinearGradient>
        </View>
      </View>
      <View style={{ height: 36 }} />
      <View style={{ marginHorizontal: 16 }}>
        <Image
          style={{ width: '100%', height: windowHeight / 2 }}
          source={require('@assets/images/fwfBackgroud2.jpg')}
        />
        <View style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
          <LinearGradient
            colors={[Colors.transparent0, Colors.black]}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingVertical: 32,
              paddingHorizontal: 16
            }}
          >
            <Text
              style={[
                styles.txt_description,
                { color: Colors.white, fontSize: 14, textAlign: 'left' }
              ]}
            >
              HÀNG MỚI VỀ
            </Text>
            <Text
              style={[
                styles.txt_title,
                { color: Colors.white, fontSize: 20, textAlign: 'left', marginTop: 8 }
              ]}
            >
              Nâng cấp phong cách thể thao
            </Text>
            <Text
              style={[
                styles.txt_description,
                { color: Colors.white, fontSize: 12, textAlign: 'left', marginTop: 8 }
              ]}
            >
              Trang phục thường ngày với cảm hứng thể thao
            </Text>
          </LinearGradient>
        </View>
      </View>
      <View style={{ height: 36 }} />
      <View style={{ padding: 16, backgroundColor: Colors.grayBg, marginHorizontal: 16 }}>
        <Text style={[styles.txt_title, { textAlign: 'center', fontSize: 20 }]}>
          Trang phục basic cho ngày giao mùa
        </Text>
        <Text style={[styles.txt_description, { fontSize: 14, textAlign: 'center', marginTop: 4 }]}>
          Từ áo thun tới áo nỉ, khám phá ngay
        </Text>
      </View>
      <View style={{ height: 36 }} />
      <View style={{ marginHorizontal: 16 }}>
        <Image
          style={{ width: '100%', height: windowHeight / 2 }}
          source={require('@assets/images/fwfBackgroud3.jpg')}
        />
        <View style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
          <LinearGradient
            colors={[Colors.transparent0, Colors.black]}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 32,
              paddingHorizontal: 16
            }}
          >
            <Text
              style={[styles.txt_title, { color: Colors.white, fontSize: 20, textAlign: 'center' }]}
            >
              New Season
            </Text>
          </LinearGradient>
        </View>
      </View>
      <View style={{ height: 36 }} />
      <View style={{ backgroundColor: '#EEE8AA', padding: 24, marginHorizontal: 16 }}>
        <Text style={[styles.txt_description, { fontSize: 12, textAlign: 'center' }]}>
          Công ty TNHH FwF Fashion with Freedom Việt Nam - Trụ sở chính: 139 Chiến Lược, Phường Bình
          Trị Đông, Quận Bình Tân, Thành Phố Hồ Chí Minh, Việt Nam
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 4,
            justifyContent: 'center'
          }}
        >
          <Text style={[styles.txt_description, { fontSize: 12 }]}>Số hotline: </Text>
          <Text style={styles.txt_title}>1800 678 789</Text>
        </View>
      </View>
      <View style={{ height: 36 }} />
    </ScrollView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  txt_black: {
    top: '60%',
    left: 13
  },
  txt_new_collection: {
    fontSize: 34,
    color: Colors.white,
    fontWeight: '700',
    position: 'absolute',
    bottom: 17,
    right: 18
  },
  txt_Summer_sale: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.red
  },

  btn_check: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
    width: 160,
    height: 36,
    top: 8,
    borderRadius: 25
  },
  txt_fashion_sale: {
    color: Colors.white,
    fontSize: 48,
    fontWeight: '900'
    // fontFamily: 'Metropolis'
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: Colors.white
  },
  txt_title: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.black2
  },
  txt_description: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: Colors.black2
  }
})
