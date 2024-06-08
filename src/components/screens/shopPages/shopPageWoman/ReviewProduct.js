import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef, useState } from 'react'
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import ImageView from 'react-native-image-viewing'
import Icons from 'src/components/icons/Icon'
import Colors from 'src/constants/Colors'

const ReviewProduct = props => {
  const [visible, setVisible] = useState(false)
  const showModelImageRv = () => setVisible(true)
  const BottomSheetRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const snapPoints = ['60%', '70%', '90%']
  const handlePresentModal = () => {
    BottomSheetRef.current?.present()
    setTimeout(() => {
      setIsOpen(true)
    }, 300)
  }
  const { navigation } = props
  const [isShowImage, setIsShowImage] = useState(false)
  const starRatingOptions = [1, 2, 3, 4, 5]
  const [starRating, setStarRating] = useState(null)
  const animatedButtonScale = new Animated.Value(1)
  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4
    }).start()
  }

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }]
  }

  const [textInputRv, setTextInputRv] = useState('')
  const ImageRv = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={showModelImageRv}>
          <Image style={styles.imgRv} source={require('@assets/imgRv1.png')} />
        </TouchableOpacity>
        <Image style={styles.imgRv} source={require('@assets/imgRv2.png')} />
      </View>
    )
  }

  const [images, setImages] = useState([])
  // const { width } = useWindowDimensions()
  const [isLoading, setIsLoading] = useState(false)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 3,
      aspect: [4, 3],
      quality: 1
    })

    console.log(result)
    setIsLoading(false)
    if (!result.canceled) {
      const selectedImageUris = result.assets.map(assets => assets.uri)
      setImages(selectedImageUris)
    }
  }

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView
        style={[
          styles.wrapper,
          { backgroundColor: isOpen ? Colors.bgBottomSheet : Colors.grayBg }
        ]}
      >
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
            <View style={{ top: 0 }}>
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
            <View style={{ paddingHorizontal: 30, width: '90%' }}>
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
            <View
              style={[
                styles.container_comment,
                {
                  backgroundColor: isOpen ? Colors.bgBottomSheet : Colors.white
                }
              ]}
            >
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
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
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
                  style={{
                    fontSize: 11,
                    fontWeight: '400',
                    color: Colors.gray
                  }}
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
                The dress is great! Very classy and comfortable. It fit
                perfectly! I'm 5'7" and 130 pounds. I am a 34B chest. This dress
                would be too long for those who are shorter but could be hemmed.
                I wouldn't recommend it for those big chested as I am smaller
                chested and it fit me perfectly. The underarms were not too wide
                and the dress was made well.
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
                  <Icons.AntDesign
                    name={'like1'}
                    size={22}
                    color={Colors.gray}
                  />
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
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
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
                  style={{
                    fontSize: 11,
                    fontWeight: '400',
                    color: Colors.gray
                  }}
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
                The dress is great! Very classy and comfortable. It fit
                perfectly! I'm 5'7" and 130 pounds. I am a 34B chest. This dress
                would be too long for those who are shorter but could be hemmed.
                I wouldn't recommend it for those big chested as I am smaller
                chested and it fit me perfectly. The underarms were not too wide
                and the dress was made well.
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
                  <Icons.AntDesign
                    name={'like1'}
                    size={22}
                    color={Colors.gray}
                  />
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
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
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
                  style={{
                    fontSize: 11,
                    fontWeight: '400',
                    color: Colors.gray
                  }}
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
                The dress is great! Very classy and comfortable. It fit
                perfectly! I'm 5'7" and 130 pounds. I am a 34B chest. This dress
                would be too long for those who are shorter but could be hemmed.
                I wouldn't recommend it for those big chested as I am smaller
                chested and it fit me perfectly. The underarms were not too wide
                and the dress was made well.
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
                  <Icons.AntDesign
                    name={'like1'}
                    size={22}
                    color={Colors.gray}
                  />
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
              onPress={() => handlePresentModal()}
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

        <BottomSheetModal
          ref={BottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{
            backgroundColor: Colors.grayBg,
            borderRadius: 34
          }}
          onDismiss={() => setIsOpen(false)}
        >
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={styles.txt_write_review}>What is you rate?</Text>
            {/* <Text style={styles.heading}>
            {starRating ? `${starRating}*` : 'Tap to rate'}
          </Text> */}
            <View style={styles.stars}>
              {starRatingOptions.map(option => (
                <TouchableWithoutFeedback
                  onPressIn={() => handlePressIn(option)}
                  onPressOut={() => handlePressOut(option)}
                  onPress={() => setStarRating(option)}
                  key={option}
                >
                  <Animated.View style={animatedScaleStyle}>
                    <Icons.FontAwesome
                      name={starRating >= option ? 'star' : 'star-o'}
                      size={36}
                      style={
                        starRating >= option
                          ? styles.starSelected
                          : styles.starUnselected
                      }
                    />
                  </Animated.View>
                </TouchableWithoutFeedback>
              ))}
            </View>
            <Text style={styles.txt_write_review}>
              Please share your opinion
            </Text>
            <Text style={styles.txt_write_review}>about the product</Text>
            <View style={styles.container_text_input}>
              <TextInput
                multiline
                style={styles.input}
                onChangeText={setTextInputRv}
                value={textInputRv}
                placeholder="Your review"

                // keyboardType="numeric"
              />
            </View>
            <View
              style={{
                padding: 15,
                flexDirection: 'row'
              }}
            >
              {/* {images && <Image source={{ uri: images }} style={styles.image} />} */}
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={images}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <Image source={{ uri: item }} style={styles.image} />
                )}
                contentContainerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 16
                }}
                ListHeaderComponent={
                  isLoading ? (
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 21
                        }}
                      >
                        Loading...
                      </Text>
                      <ActivityIndicator size={'large'} />
                    </View>
                  ) : null
                }
              />
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: Colors.white,
                  borderRadius: 8
                }}
              >
                <TouchableOpacity
                  onPress={pickImage}
                  style={{
                    backgroundColor: Colors.red,
                    padding: 13,
                    borderRadius: 100,
                    marginHorizontal: 16,
                    marginBottom: 12,
                    marginTop: 15,
                    width: 52,
                    height: 52,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Icons.FontAwesome
                    name={'camera'}
                    size={20}
                    color={Colors.white}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: Colors.black,
                    marginHorizontal: 6,
                    marginBottom: 16
                  }}
                >
                  Add your photos
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginHorizontal: 16,
                bottom: 10,
                marginTop: 44
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.red,
                  paddingVertical: 14,
                  borderRadius: 25
                }}
              >
                <Text
                  style={{
                    fontWeight: '500',
                    lineHeight: 20,
                    fontSize: 16,
                    textAlign: 'center',
                    color: Colors.white
                  }}
                >
                  SEND REVIEW
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      </KeyboardAvoidingView>

      <View style={{ backgroundColor: '#000' }}>
        <ImageView
          animationType="slide"
          images={imagess}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      </View>
    </BottomSheetModalProvider>
  )
}

export default ReviewProduct

const styles = StyleSheet.create({
  input: {
    marginTop: 12,
    marginStart: 20,
    marginBottom: 22,
    marginEnd: 9,
    overflow: 'hidden',
    fontSize: 14,
    fontWeight: '400',
    color: Colors.gray,
    lineHeight: 24,
    letterSpacing: 0.12,
    maxWidth: '95%'
  },
  container_text_input: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 18,
    height: 154
  },
  container_comment: {
    marginTop: 44,
    marginHorizontal: 12,
    borderRadius: 8,
    padding: 22,
    resizeMode: 'cover'
  },
  wrapper: {
    width: '100%',
    height: '100%'
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
  },
  heading_star: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 33,
    marginHorizontal: 50
  },
  starUnselected: {
    color: Colors.gray
  },
  starSelected: {
    color: Colors.yellow
  },
  txt_write_review: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.black,
    textAlign: 'center',
    lineHeight: 22
  },
  image: {
    width: 104,
    height: 104,
    borderRadius: 4,
    marginEnd: 16
  }
})
const imagess = [
  {
    uri: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTbyNyLxq6CsGjR7nhyJs0oRhnTSW0SUNYWnMnC-JSExpKha0bac6xzTufwCzAoqLed4J0zztdsnd0wy6U'
  },
  {
    uri: 'https://icdn.24h.com.vn/upload/2-2024/images/2024-05-23/SAO-dang-xem-nhat-EURO-2024-Ronaldo-28-1716410323-808-width740height493.jpg'
  },
  {
    uri: 'https://icdn.24h.com.vn/upload/2-2024/images/2024-05-23/SAO-dang-xem-nhat-EURO-2024-Ronaldo-11-1716473471-841-width740height552.jpg'
  }
]
