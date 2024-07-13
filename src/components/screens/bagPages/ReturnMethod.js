import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Colors from 'src/constants/Colors'
import MyText from 'src/constants/FontsStyle'
import Icons from '../../icons/Icon'

const ReturnMethod = props => {
  const {
    navigation: { goBack }
  } = props
  return (
    <View style={{ backgroundColor: Colors.grayBg }}>
      <View
        style={{
          paddingVertical: 32,
          paddingHorizontal: 24,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View />
        <View>
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{
              MyTextAlign: 'center',
              fontSize: 24,
              fontWeight: '600'
            }}
          >
            Giao hàng và chọn
          </MyText>
          <MyText
            fontFamily={'Montserrat-SemiBold'}
            style={{
              MyTextAlign: 'center',
              fontSize: 24,
              fontWeight: '600'
            }}
          >
            Phương thức đổi trả
          </MyText>
        </View>
        <TouchableOpacity onPress={() => goBack()}>
          <Icons.Feather name={'x'} size={32} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 28,
          backgroundColor: Colors.white,
          height: '100%'
        }}
      >
        <MyText style={{ MyTextAlign: 'left', fontSize: 14 }}>
          Công ty bán hàng: Công ty TNHH H&M Hennes & Mauritz Việt Nam, Việt Nam
        </MyText>
        <MyText
          fontFamily={'Montserrat-SemiBold'}
          style={{
            paddingTop: 24,
            paddingBottom: 12,
            fontSize: 16,
            fontWeight: '600'
          }}
        >
          Miễn phí giao hàng cho Member với hóa đơn từ đ499.000, miến phí giao hàng cho Plus member.
        </MyText>
        <MyText style={{ MyTextAlign: 'left', fontSize: 14, marginBottom: 8 }}>
          Chọn giữa giao hàng tận nhà, địa chỉ thay thế hoặc địa điểm giao nhận.
        </MyText>
        <MyText
          fontFamily={'Montserrat-SemiBold'}
          style={{ marginVertical: 8, fontSize: 20, fontWeight: '600' }}
        >
          Đổi trả
        </MyText>
        <MyText>
          Chúng tôi áp dụng chính sách hoàn trả miễn phí và linh hoạt. Chúng tôi áp dụng hoàn lại
          tiền trong vòng 30 ngày cho bất kỳ sản phẩm không phù hợp nào, miễn là sản phẩm còn ở
          trong tình trạng có thể bán lại được. Xin lưu ý rằng chính sách Chính sách đổi &amp; trả
          đơn hàng của chúng tôi có thể khác đối với các bộ sưu tập Nhà thiết kế, bộ sưa tập Đặc
          biệt.
        </MyText>
      </View>
    </View>
  )
}

export default ReturnMethod

const styles = StyleSheet.create({})
