import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'

const ReviewProduct = props => {
  const { navigation } = props
  const [isShowImage, setIsShowImage] = useState(false)
  const ImageRv = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image style={styles.imgRv} source={require('@assets/imgRv1.png')} />
        <Image style={styles.imgRv} source={require('@assets/imgRv2.png')} />
      </View>
    )
  }
  return (
    <KeyboardAvoidingView style={[styles.wrapper]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 16,
          marginTop: 32
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icons.Ionicons name={'chevron-back'} size={24} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 32,
            fontWeight: '700',
            color: Colors.black,
            marginTop: 30
          }}
        >
          Rating&Reviews
        </Text>
        <View
          style={{
            marginTop: 50,
            flexDirection: 'row'
          }}
        >
          <View>
            <Text
              style={{ fontSize: 44, fontWeight: '700', color: Colors.black }}
            >
              4.3
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: '400', color: Colors.gray }}
            >
              23 Ratings
            </Text>
          </View>
          <View style={{ paddingHorizontal: 30, width: '80%' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1
                }}
              >
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />

                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
              </View>
              <View
                style={{
                  marginStart: 10,
                  width: 114,
                  backgroundColor: Colors.red,
                  height: 8,
                  borderRadius: 4
                }}
              />
              <Text style={{ textAlign: 'right', flex: 1 }}>12</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1
                }}
              >
                <View style={styles.ic} />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />

                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
              </View>
              <View
                style={{
                  marginStart: 10,
                  width: 40,
                  backgroundColor: Colors.red,
                  height: 8,
                  borderRadius: 4
                }}
              />
              <Text style={{ textAlign: 'right', flex: 1 }}>5</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1
                }}
              >
                <View style={styles.ic} />
                <View style={styles.ic} />

                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
              </View>
              <View
                style={{
                  marginStart: 10,
                  width: 29,
                  backgroundColor: Colors.red,
                  height: 8,
                  borderRadius: 4
                }}
              />
              <Text style={{ textAlign: 'right', flex: 1 }}>5</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1
                }}
              >
                <View style={styles.ic} />
                <View style={styles.ic} />
                <View style={styles.ic} />

                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
              </View>
              <View
                style={{
                  marginStart: 10,
                  width: 16,
                  backgroundColor: Colors.red,
                  height: 8,
                  borderRadius: 4
                }}
              />
              <Text style={{ textAlign: 'right', flex: 1 }}>2</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1
                }}
              >
                <View style={styles.ic} />
                <View style={styles.ic} />
                <View style={styles.ic} />
                <View style={styles.ic} />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
              </View>
              <View
                style={{
                  marginStart: 10,
                  width: 8,
                  backgroundColor: Colors.red,
                  height: 8,
                  borderRadius: 4
                }}
              />
              <Text style={{ textAlign: 'right', flex: 1 }}>0</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 34
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 24, fontWeight: '500' }}>8 Reviews</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity onPress={() => setIsShowImage(!isShowImage)}>
              <Icons.MaterialCommunityIcons
                name={
                  !isShowImage ? 'checkbox-blank-outline' : 'checkbox-marked'
                }
                size={24}
                color={!isShowImage ? Colors.gray : Colors.black}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 14, marginStart: 13 }}>With photo</Text>
          </View>
        </View>
        <View>
          <View style={[styles.container_comment]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 25
                }}
                source={require('@assets/image7.png')}
              />
              <Text
                style={{
                  fontSize: 14,
                  marginStart: 8,
                  fontWeight: '500',
                  textAlign: 'center'
                }}
              >
                Helene Moore
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
              </View>
              <Text
                style={{ fontSize: 11, fontWeight: '400', color: Colors.gray }}
              >
                June 5, 2019
              </Text>
            </View>
            <Text
              style={{
                marginTop: 11,
                fontSize: 14,
                fontWeight: '400',
                color: Colors.black
              }}
            >
              The dress is great! Very classy and comfortable. It fit perfectly!
              I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too
              long for those who are shorter but could be hemmed. I wouldn't
              recommend it for those big chested as I am smaller chested and it
              fit me perfectly. The underarms were not too wide and the dress
              was made well.
            </Text>
            {isShowImage ? ImageRv() : null}
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 16
              }}
            >
              <View />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.gray,
                    marginEnd: 5,
                    textAlign: 'center'
                  }}
                >
                  Helpful
                </Text>
                <Icons.AntDesign name={'like1'} size={22} color={Colors.gray} />
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={[styles.container_comment]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 25
                }}
                source={require('@assets/image7.png')}
              />
              <Text
                style={{
                  fontSize: 14,
                  marginStart: 8,
                  fontWeight: '500',
                  textAlign: 'center'
                }}
              >
                Helene Moore
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
              </View>
              <Text
                style={{ fontSize: 11, fontWeight: '400', color: Colors.gray }}
              >
                June 5, 2019
              </Text>
            </View>
            <Text
              style={{
                marginTop: 11,
                fontSize: 14,
                fontWeight: '400',
                color: Colors.black
              }}
            >
              The dress is great! Very classy and comfortable. It fit perfectly!
              I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too
              long for those who are shorter but could be hemmed. I wouldn't
              recommend it for those big chested as I am smaller chested and it
              fit me perfectly. The underarms were not too wide and the dress
              was made well.
            </Text>
            {isShowImage ? ImageRv() : null}
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 16
              }}
            >
              <View />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.gray,
                    marginEnd: 5,
                    textAlign: 'center'
                  }}
                >
                  Helpful
                </Text>
                <Icons.AntDesign name={'like1'} size={22} color={Colors.gray} />
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={[styles.container_comment]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 25
                }}
                source={require('@assets/image7.png')}
              />
              <Text
                style={{
                  fontSize: 14,
                  marginStart: 8,
                  fontWeight: '500',
                  textAlign: 'center'
                }}
              >
                Helene Moore
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
                <Image
                  style={styles.ic}
                  source={require('@assets/activated.png')}
                />
              </View>
              <Text
                style={{ fontSize: 11, fontWeight: '400', color: Colors.gray }}
              >
                June 5, 2019
              </Text>
            </View>
            <Text
              style={{
                marginTop: 11,
                fontSize: 14,
                fontWeight: '400',
                color: Colors.black
              }}
            >
              The dress is great! Very classy and comfortable. It fit perfectly!
              I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too
              long for those who are shorter but could be hemmed. I wouldn't
              recommend it for those big chested as I am smaller chested and it
              fit me perfectly. The underarms were not too wide and the dress
              was made well.
            </Text>
            {isShowImage ? ImageRv() : null}
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 16
              }}
            >
              <View />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.gray,
                    marginEnd: 5,
                    textAlign: 'center'
                  }}
                >
                  Helpful
                </Text>
                <Icons.AntDesign name={'like1'} size={22} color={Colors.gray} />
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <LinearGradient
        colors={['transparent', '#fff']}
        style={{
          position: 'absolute',
          width: '100%',
          justifyContent: 'space-between',
          height: 135,
          bottom: 0
        }}
      >
        <View />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.red,
              flexDirection: 'row',
              alignItems: 'center',
              width: 138,

              borderRadius: 25,
              elevation: 4,
              shadowColor: '#52006A',
              marginRight: 17,
              marginBottom: 10
            }}
          >
            <Icons.MaterialCommunityIcons
              name={'pencil'}
              size={20}
              style={{
                marginStart: 8
              }}
              color={Colors.white}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: Colors.white,
                marginStart: 8,
                marginTop: 15,
                marginBottom: 12,
                marginEnd: 9
              }}
            >
              Write a review
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export default ReviewProduct

const styles = StyleSheet.create({
  container_comment: {
    marginTop: 44,
    backgroundColor: Colors.white,
    marginHorizontal: 12,
    borderRadius: 8,
    padding: 22,
    resizeMode: 'cover'
  },
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.grayBg
  },
  imgRv: {
    marginTop: 16,
    width: 104,
    height: 104,
    borderRadius: 4,
    marginEnd: 16
  },
  ic: {
    width: 14,
    height: 14
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.black,
    borderRadius: 20
  }
})
