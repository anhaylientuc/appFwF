import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ItemListNew from './ItemListNews'
import ItemListSale from './ItemListSales'


const ListSale = () => {
  return (
    <KeyboardAvoidingView>
      <View>
        <View>
          <Image style={{ width: '100%', height: 250 }} source={require('@assets/pexel_911677.png')} />
          <View
            style={{
              position: 'absolute'
            }}
          >
            <Text
              style={{
                fontWeight: '900',
                top: 180,
                left: 21,
                color: '#fff',
                fontSize: 34,

              }}
            >Street clothes</Text>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{
              color: '#222',

              fontSize: 34,
              fontWeight: '700',
              fontStyle: 'normal'
            }}>Sale
            </Text>

            <Text style={{ textAlign: 'center' }}>
              View all
            </Text>
          </View>

          <Text style={{ color: '#9B9B9B', fontWeight: 400, }}>
            Super summer sale
          </Text>
        </View>

      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // thanh cuộn
        showsVerticalScrollIndicator={false} // thanh cuộn
      >
        {DaTaSale.map(item => (
          <ItemListSale
            key={item._id} data={item} />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const HomePage = () => {
  const [isShowSale, setIsShowSale] = useState(false)
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image style={{ width: '100%', height: 628, position: 'relative' }} source={require('@assets/image.png')} />
        <View style={{ position: 'absolute', left: 15, bottom: 40 }}>
          <Text style={styles.txt_fashion_sale}>
            Fashion
          </Text>
          <Text style={styles.txt_fashion_sale}>
            sale
          </Text>
          <TouchableOpacity onPress={() => { setIsShowSale(!isShowSale) }}>
            <View
              style={styles.btn_check}>
              <Text style={{ color: '#fff', fontWeight: '500' }}>Check</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {
        isShowSale ? ListSale() : null
      }
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{
            color: '#222',
            fontSize: 34,
            fontWeight: '700',
            fontStyle: 'normal'
          }}>News
          </Text>
          <Text style={{ textAlign: 'center' }}>
            View all
          </Text>
        </View>
        <Text style={{ color: '#9B9B9B', fontWeight: '400' }}>
          You’ve never seen it before!
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // thanh cuộn
        showsVerticalScrollIndicator={false} // thanh cuộn
      >
        {DaTaNews.map(item => (
          <ItemListNew
            key={item._id} data={item} />
        ))}
      </ScrollView>

      <View style={{marginTop: 20}}>
        <View>
          <Image style={{ height: 366, width: '100%' }} source={require('@assets/image5.png')} />
          <Text style={styles.txt_new_collection}>New collection</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
              <Text style={styles.txt_Summer_sale}>Summer</Text>
              <Text style={styles.txt_Summer_sale}>sale</Text>
            </View>
            <View>
              <Image style={{ width: '100%', height: 187 }} source={require('@assets/image7.png')} />
              <Text style={[styles.txt_new_collection, styles.txt_black]}>Black</Text>
            </View>

          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{ height: 374, width: '100%' }} source={require('@assets/image6.png')} />
            <Text style={{ position: 'absolute', fontSize: 34, color: '#fff', fontWeight: 700}}>Men’s
              hoodies</Text>
          </View>


        </View>
      </View>

    </ScrollView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  txt_black: {
    top: 131,
    left: 13,
  },

  txt_new_collection: {
    fontSize: 34,
    color: '#fff',
    fontWeight: '700',
    position: 'absolute',
    bottom: 17,
    right: 18,
  },

  txt_Summer_sale: {
    fontSize: 34,
    fontWeight: '700',
    color: '#DB3022',

  },

  btn_check: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DB3022',
    width: 160,
    height: 36,
    top: 8,
    borderRadius: 25,
  },
  txt_fashion_sale: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '900',
    // fontFamily: 'Metropolis'
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#fff'
  }
})

const DaTaSale = [
  {
    "_id": "1",
    "title": "Dorothy Perkins",
    "content": "Evening Dress",
    "image": "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fe4%2Fa1%2Fe4a18d1c0f420e9a1014d3ee9aba043055278148.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
    "cost": 15,
    "reduced_price": 12,
  },
  {
    "_id": "2",
    "title": "Lịch thi đánh giá năng lực, tư duy năm 2023",
    "content": "Các kỳ thi đánh giá năng lực, tư duy diễn ra từ tháng 3 đến 7, thí sinh có thể tham dự nhiều đợt và đăng ký từ đầu tháng 2.",
    "image": "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fcb%2Fd3%2Fcbd3a13104d3d0fe1ebb45e4207e3b159971f79a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
    "createdAt": "2023-01-12T06:26:17.539Z",

    "cost": 15,
    "reduced_price": 12,
  },
  {
    "_id": "3",
    "title": "Đối phó với bài tập Tết",
    "content": "Ngày nghỉ Tết cuối cùng, hàng chục trang bài tập Toán, Tiếng Việt và Tiếng Anh của Anh Thư được giải quyết, nhưng do mẹ và dì làm giúp.",
    "image": "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F7f%2F01%2F7f01170092efe9f45a621a207c09c972e026608d.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_lingerie_briefsknickers_brazilian%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",

    "cost": 15,
    "reduced_price": 12,
  },
  {
    "_id": "4",
    "title": "Đường trở thành giáo viên ở Mỹ của một phụ nữ Việt",
    "content": "Chị Đinh Thu Hồng phải theo học chương trình đào tạo giáo viên và hoàn thành nhiều thủ tục để được cấp phép hành nghề dạy học ở Mỹ.",
    "image": "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F4c%2Fbb%2F4cbb9b4fce8b53feeda801ccfcad96b1d5b49264.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    "cost": 15,
    "reduced_price": 12,
  },
  {
    "_id": "5",
    "title": "Cô giáo đèo hai con giữa mưa rét, vượt 100 km đến trường",
    "content": "Cô Nguyễn Thị Hà gây xúc động khi đèo hai con, vượt 100 km trong mưa lạnh để trở lại điểm trường ở xã Trà Dơn, huyện Nam Trà My, sau Tết.",
    "image": "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fcc%2F6e%2Fcc6e3e030b0f3797eaef4045a48c858cf2f3c97f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
    "cost": 15,
    "reduced_price": 12,
  },

]


const DaTaNews = [
  {
    "_id": "1",
    "title": "Dorothy Perkins",
    "content": "Evening Dress",
    "image": "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fe4%2Fa1%2Fe4a18d1c0f420e9a1014d3ee9aba043055278148.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
    "createdAt": "2023-01-12T06:26:17.539Z",
    "createdBy": {
      "_id": "63ac39aeedf7c80016c57a67",
      "name": "",
      "avatar": ""
    },
    "cost": 15,
    "reduced_price": 12,
  },
  {
    "_id": "2",
    "title": "Lịch thi đánh giá năng lực, tư duy năm 2023",
    "content": "Các kỳ thi đánh giá năng lực, tư duy diễn ra từ tháng 3 đến 7, thí sinh có thể tham dự nhiều đợt và đăng ký từ đầu tháng 2.",
    "image": "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fcb%2Fd3%2Fcbd3a13104d3d0fe1ebb45e4207e3b159971f79a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
    "createdAt": "2023-01-12T06:26:17.539Z",
    "createdBy": {
      "_id": "63ac39aeedf7c80016c57a67",
      "name": "",
      "avatar": ""
    },
    "cost": 12,
    "reduced_price": 20,
  },
  {
    "_id": "3",
    "title": "Đối phó với bài tập Tết",
    "content": "Ngày nghỉ Tết cuối cùng, hàng chục trang bài tập Toán, Tiếng Việt và Tiếng Anh của Anh Thư được giải quyết, nhưng do mẹ và dì làm giúp.",
    "image": "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F7f%2F01%2F7f01170092efe9f45a621a207c09c972e026608d.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_lingerie_briefsknickers_brazilian%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    "createdAt": "2023-01-12T06:26:17.539Z",
    "createdBy": {
      "_id": "63ac39aeedf7c80016c57a67",
      "name": "",
      "avatar": ""
    },
    "cost": 12,
    "reduced_price": 20,
  },
  {
    "_id": "4",
    "title": "Đường trở thành giáo viên ở Mỹ của một phụ nữ Việt",
    "content": "Chị Đinh Thu Hồng phải theo học chương trình đào tạo giáo viên và hoàn thành nhiều thủ tục để được cấp phép hành nghề dạy học ở Mỹ.",
    "image": "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F4c%2Fbb%2F4cbb9b4fce8b53feeda801ccfcad96b1d5b49264.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    "createdAt": "2023-01-12T06:26:17.539Z",
    "createdBy": {
      "_id": "63ac39aeedf7c80016c57a67",
      "name": "",
      "avatar": ""
    },
    "cost": 12,
    "reduced_price": 20,
  },
  {
    "_id": "5",
    "title": "Cô giáo đèo hai con giữa mưa rét, vượt 100 km đến trường",
    "content": "Cô Nguyễn Thị Hà gây xúc động khi đèo hai con, vượt 100 km trong mưa lạnh để trở lại điểm trường ở xã Trà Dơn, huyện Nam Trà My, sau Tết.",
    "image": "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fcc%2F6e%2Fcc6e3e030b0f3797eaef4045a48c858cf2f3c97f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
    "createdAt": "2023-01-12T06:26:17.539Z",
    "createdBy": {
      "_id": "63ac39aeedf7c80016c57a67",
      "name": "",
      "avatar": ""
    },
    "cost": 12,
    "reduced_price": 20,
  },

]