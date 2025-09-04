import { useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
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
import { TextNormal, TextSmall } from '../../components/common/customText';
import { addToWishlist } from '../../redux/features/whishList';
import { addToCart } from '../../redux/features/addCart';
import { useDispatch } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import useCate from './useCate';
import { Font } from '../../utils/ImagePath';
import { HorizontalSelection } from '../../components/horizontalSelect';

const frameTypes = [
  { name: 'Rimless', image: require('../../assets/cardImage/shades.png') },
  { name: 'Full Rimmed', image: require('../../assets/cardImage/shades.png') },
  { name: 'Semi Rimless', image: require('../../assets/cardImage/shades.png') },
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

const Category = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const TABBARHEIGHT = useBottomTabBarHeight();
  const [price, setPrice] = useState(50);
  const [selectedFrameTypes, setSelectedFrameTypes] = useState<string | null>(
    null,
  );
  const [selectedFrameMaterials, setSelectedFrameMaterials] = useState<
    string | null
  >(null);
  const [selectedLensType, setSelectedLensType] = useState<string | null>(null);
  console.log('s', selectedFrameMaterials);
  const {
    allProducts,
    error,
    hasMorePages,
    initialLoading,
    isLoading,
    isLoadmore,
    refetchProduct,
  } = useCate(
    price,
    selectedFrameTypes,
    selectedFrameMaterials,
    selectedLensType,
  );

  const addCart = useCallback(
    (item: any) => {
      if (!item) return;
      dispatch(addToCart({ ...item, quantity: 1 }));
    },
    [dispatch],
  );
  const headerComp = useMemo(
    () => (
      <>
        <Header title="Category" navigation={navigation} />

        <CustomHeading
          text="Frame Type"
          reverse
          style={styles.sectionHeading}
        />
        <FlatList
          data={frameTypes}
          horizontal={true} // If you want horizontal scrolling
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.name}
          renderItem={({ item, index }) => (
            <HorizontalSelection
              onPress={() => setSelectedFrameTypes(item.name)}
              item={item}
              index={index}
              selected={selectedFrameTypes}
            />
          )}
        />

        <CustomHeading text="Frame Materials" style={styles.sectionHeading} />

        <FlatList
          data={frameMaterials}
          horizontal={true} // If you want horizontal scrolling
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.name}
          renderItem={({ item, index }) => (
            <HorizontalSelection
              onPress={() => setSelectedFrameMaterials(item.name)}
              item={item}
              index={index}
              selected={selectedFrameMaterials}
            />
          )}
        />

        <CustomHeading text="Lens Type" reverse style={styles.sectionHeading} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {lensTypes.map((item, index) => {
            const isSelected = selectedLensType === item;
            return (
              <Text
                key={index.toString()}
                style={[
                  styles.lensText,
                  isSelected && {
                    backgroundColor: COLORS.orange,
                    color: COLORS.white,
                    fontWeight: '600',
                  },
                ]}
                onPress={() => setSelectedLensType(item)}
              >
                {item}
              </Text>
            );
          })}
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: hp(2),
          }}
        >
          <CustomHeading text="Price Range" style={styles.sectionHeading} />
          <TextNormal>{price + '$'}</TextNormal>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={50}
          maximumValue={1000}
          step={10}
          minimumTrackTintColor="#FB5823"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#FB5823"
          value={price}
          onValueChange={setPrice}
        />

        <View style={styles.limitLabels}>
          <TextSmall style={styles.limitText}>50$</TextSmall>
          <TextSmall style={styles.limitText}>1000$ </TextSmall>
        </View>
      </>
    ),
    [frameMaterials, selectedFrameMaterials, selectedFrameTypes],
  );
  const renderItem = useCallback(
    ({ item }: any) => (
      <ProductCard
        isLoading={!item}
        item={item}
        favOnpress={() => item && dispatch(addToWishlist(item))}
        crtOnpress={() => item && addCart(item)}
        navigation={navigation}
      />
    ),
    [dispatch, addCart],
  );

  return (
    <WrapperContainer>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading.isRefresh}
            onRefresh={refetchProduct}
            tintColor={'#c4c4c4'}
          />
        }
        onEndReached={isLoadmore}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={headerComp}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          padding: wp(1),
          marginBottom: hp(1),
        }}
        contentContainerStyle={{ paddingBottom: TABBARHEIGHT + hp(8) }}
        numColumns={2}
        data={allProducts}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        windowSize={5}
        maxToRenderPerBatch={8}
        initialNumToRender={6}
        ListFooterComponent={
          isLoading.isLoadmore ? (
            <ActivityIndicator color={'#000'} size={hp(3)} />
          ) : !isLoading.isLoadmore &&
            !isLoading.isRefresh &&
            !hasMorePages &&
            allProducts.length ? (
            <TextNormal
              style={{
                color: '#000',
                textAlign: 'center',
                fontFamily: Font.medium,
              }}
            >
              You have reached the end !
            </TextNormal>
          ) : error && !isLoading.isLoadmore && !isLoading.isRefresh ? (
            <TextNormal style={{ color: 'red', alignSelf: 'center' }}>
              {'Error fetching data'}
            </TextNormal>
          ) : null
        }
        ListEmptyComponent={
          <TextNormal
            style={{ color: '#000', alignSelf: 'center', marginTop: hp(5) }}
          >
            No product found
          </TextNormal>
        }
      />
    </WrapperContainer>
  );
};

export default Category;

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
  limitLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  limitText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCard: {
    borderColor: COLORS.orange,
    borderWidth: 2,
    borderRadius: wp(2),
  },
});

// const products = Array.from({ length: 6 }).map((_, index) => ({
//   id: (index + 1).toString(),
//   name: 'OH-12',
//   price: 2495,
//   image: require('../../assets/cardImage/shades.png'),
//   fav: false,
// }));
