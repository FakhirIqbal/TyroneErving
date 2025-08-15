import { useState } from 'react';
import { COLORS } from '../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import RatingStars from '../../components/ratingStars';
import CustomHeader from '../../components/common/customHeader';
import CustomButton from '../../components/common/customButton';
import QuantitySelector from '../../components/quantitySelector';
import CustomDropdown from '../../components/common/customDropdown';
import WrapperContainer from '../../components/common/customWrapper';
import { CameraPan } from '../../components/3dComp';
import { FilamentScene, Model } from 'react-native-filament';
import Customimage from '../../components/common/customImage';

const ProductDetail = ({ navigation }: any) => {
  const colors = ['#FF5722', '#FF9800', '#2196F3', '#212121'];
  const images = [
    require('../../assets/men.png'),
    require('../../assets/men.png'),
    require('../../assets/men.png'),
    require('../../assets/men.png'),
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <WrapperContainer>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
      >
        <CustomHeader
          title="Product Detail"
          onBack={() => navigation.goBack()}
        />
        {/* <MyScene />
         */}
        {/* <View style={{ height: hp(30) }}>
          <FilamentScene>
            <CameraPan />
          </FilamentScene>
        </View> */}

        <View style={{}}>
          <Customimage
            source={require('../../assets/gls2.png')}
            style={{
              width: wp(50),
              height: wp(50),
              // borderRadius: wp(2),
              alignSelf: 'center',
              // marginVertical: hp(3),
            }}
            // resizeMode={'contain'}
          />
        </View>

        <View style={styles.imgContainer}>
          {images.slice(0, 4).map((img, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={img} style={styles.image} resizeMode="contain" />
            </View>
          ))}
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.name}>OH-13</Text>
            <RatingStars value={3} />
          </View>
          <Text style={styles.price}>$2,495.00</Text>
        </View>

        <Text style={styles.subHeading}>select size:</Text>
        <CustomDropdown
          label=""
          options={[
            { label: 'Small', value: 's' },
            { label: 'Medium', value: 'm' },
            { label: 'Large', value: 'l' },
          ]}
          placeholder="Select size"
          value="s"
          onChange={(item: any) => console.log(item)}
          style={{ marginBottom: 0 }}
        />

        <View style={styles.colorContainer}>
          <Text style={styles.label}>Color</Text>
          <View style={styles.clrContainer}>
            {colors.map(color => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColor,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.label}>Quantity</Text>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </View>

        <Text style={styles.subHeading}>Description:</Text>
        <Text style={styles.text}>
          The lenses of polarized sunglasses reduce glare reflected at some
          angles off shiny non-metallic surfaces such as water. They allow
          wearers to see into water.
        </Text>

        <Text style={styles.subHeading}>Add prescription:</Text>
        <Text style={styles.text}>
          The lenses of polarized sunglasses reduce glare reflected at some
          angles off shiny non-metallic surfaces such as water. They allow
          wearers to see into water.
        </Text>

        <View
          style={{ marginBottom: hp(2), flex: 1, justifyContent: 'flex-end' }}
        >
          <CustomButton
            onPress={() => navigation.navigate('Cart')}
            title="Add to cart"
            style={{ marginTop: hp(4) }}
          />
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1),
  },
  imageWrapper: {
    width: wp(20),
    height: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: wp(1),
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(1.5),
  },
  name: {
    fontWeight: '700',
    fontSize: RFValue(18),
  },
  price: {
    fontWeight: '600',
    fontSize: RFValue(15),
  },
  label: {
    color: COLORS.black,
    fontSize: RFValue(10),
  },
  subHeading: {
    fontSize: RFValue(14),
    fontWeight: '500',
    color: COLORS.black,
    marginVertical: hp(1.8),
  },
  text: {
    fontSize: RFValue(10),
    fontWeight: '400',
    color: COLORS.darkGray,
    marginBottom: hp(1),
  },
  colorContainer: {
    borderWidth: wp(0.3),
    borderColor: COLORS.gray,
    borderRadius: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(2.5),
    marginTop: hp(1),
  },
  clrContainer: {
    flexDirection: 'row',
    gap: wp(2),
  },
  colorCircle: {
    width: wp(6),
    height: hp(2.8),
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: COLORS.orange,
  },
  quantityContainer: {
    borderWidth: wp(0.3),
    borderColor: COLORS.gray,
    borderRadius: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(2.5),
    marginTop: hp(1),
  },
});
