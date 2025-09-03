import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  ImageSourcePropType,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../utils/theme';

import Slider from '@react-native-community/slider';
import CustomHeading from '../../components/customHeading';
import CustomHeader from '../../components/common/customHeader';
import ProductCard from '../../components/productCard';
import Header from '../../components/common/Header';
import WrapperContainer from '../../components/common/customWrapper';
import Customimage from '../../components/common/customImage';

const frameTypes = [
  { name: 'Full Rimmed', image: require('../../assets/cardImage/shades.png') },
  { name: 'Semi Rimless', image: require('../../assets/cardImage/shades.png') },
  { name: 'Rimless', image: require('../../assets/cardImage/shades.png') },
  {
    name: 'Double Rimless',
    image: require('../../assets/cardImage/shades.png'),
  },
];

const frameMaterials = [
  { name: 'Plastic', image: require('../../assets/cardImage/shades.png') },
  { name: 'Acetate', image: require('../../assets/cardImage/shades.png') },
  { name: 'Wood Texture', image: require('../../assets/cardImage/shades.png') },
  { name: 'Mixed', image: require('../../assets/cardImage/shades.png') },
];

const lensTypes = [
  'Progressive lenses',
  'Trifocal lenses',
  'Polarized lenses',
  'Progressive lenses',
];

const products = Array.from({ length: 6 }).map((_, index) => ({
  id: (index + 1).toString(),
  name: 'OH-12',
  price: 2495,
  image: require('../../assets/cardImage/shades.png'),
  fav: false,
}));

type CardItem = {
  name: string;
  image: ImageSourcePropType;
};
type HorizontalCardListProps = {
  data: CardItem[];
};

const Category = ({ navigation }: any) => {
  const [price, setPrice] = useState(3);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
      >
        <CustomHeader title="Category" onBack={() => navigation.goBack()} />

        <CustomHeading
          text="Frame Type"
          reverse
          style={styles.sectionHeading}
        />
        <HorizontalCardList data={frameTypes} />

        <CustomHeading text="Frame Materials" style={styles.sectionHeading} />
        <HorizontalCardList data={frameMaterials} />

        <CustomHeading
          text="Lense Type"
          reverse
          style={styles.sectionHeading}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {lensTypes.map((item, index) => (
            <Text key={index.toString()} style={styles.lensText}>
              {' '}
              {item}{' '}
            </Text>
          ))}
        </ScrollView>

        <CustomHeading text="Price Range" style={styles.sectionHeading} />
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={50}
          minimumTrackTintColor={COLORS.orange}
          maximumTrackTintColor={COLORS.gray}
          thumbTintColor={COLORS.orange}
          value={price}
          onValueChange={setPrice}
        />

        {/* <View style={styles.productContainer}>
          {products.map((item, index) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;

const HorizontalCardList = ({ data }: HorizontalCardListProps) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {data.map((item, index) => (
      <View key={index.toString()} style={styles.card}>
        <Customimage
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  sectionHeading: {
    marginTop: hp(3),
    marginBottom: 0,
  },
  card: {
    margin: wp(1),
    alignItems: 'center',
  },
  image: {
    width: wp(28),
    height: hp(12),
  },
  name: {
    fontWeight: '400',
    fontSize: RFValue(11),
  },
  lensText: {
    margin: wp(1),
    marginVertical: hp(2),
    padding: wp(2),
    paddingHorizontal: wp(3),
    borderRadius: wp(1.2),
    fontSize: RFValue(13),
    color: COLORS.darkGray,
    backgroundColor: COLORS.gray,
  },
  slider: {
    width: '100%',
  },
  productContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp(14),
  },
});
