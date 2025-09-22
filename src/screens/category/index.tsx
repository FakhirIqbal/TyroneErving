
import useCate from './useCate';
import Header from '../../components/common/Header';
import Slider from '@react-native-community/slider';
import ProductCard from '../../components/productCard';
import CustomHeading from '../../components/customHeading';
import WrapperContainer from '../../components/common/customWrapper';

import { useDispatch } from 'react-redux';
import { COLORS } from '../../utils/theme';
import { Font } from '../../utils/ImagePath';
import { useCallback, useMemo, useState } from 'react';
import { addToCart } from '../../redux/features/addCart';
import { RFValue } from 'react-native-responsive-fontsize';
import { addToWishlist } from '../../redux/features/whishList';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { HorizontalSelection } from '../../components/horizontalSelect';
import { TextNormal, TextSmall } from '../../components/common/customText';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, Text, FlatList, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';

const frameTypes = [
  { name: 'Rimless', image: require('../../assets/cardImage/shades.png') },
  { name: 'Full Rimmed', image: require('../../assets/cardImage/shades.png') },
  { name: 'Semi Rimless', image: require('../../assets/cardImage/shades.png') },
  { name: 'Double Rimless', image: require('../../assets/cardImage/shades.png') },
];
const frameMaterials = [
  { name: 'Mixed', image: require('../../assets/cardImage/shades.png') },
  { name: 'Plastic', image: require('../../assets/cardImage/shades.png') },
  { name: 'Acetate', image: require('../../assets/cardImage/shades.png') },
  { name: 'Wood Texture', image: require('../../assets/cardImage/shades.png') },
];
const lensTypes = ['Progressive lenses', 'Trifocal lenses', 'Polarized lenses'];



const Category = ({ navigation }: any) => {

  const dispatch = useDispatch();
  const TABBARHEIGHT = useBottomTabBarHeight();

  const [price, setPrice] = useState(1000);
  const [filters, setfliter] = useState({
    frame_type: null,
    frame_material: null,
    frame_lens: null,
  });
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
    filters.frame_type,
    filters.frame_material,
    filters.frame_lens,
  );

  const addCart = useCallback(
    (item: any) => {
      if (!item) return;
      dispatch(addToCart({ ...item, quantity: 1 }));
    },
    [dispatch],
  );

  const handleSelect = useCallback(
    (name: keyof typeof filters, value: string) => {
      setfliter(prev => ({
        ...prev,
        [name]: prev[name] === value ? null : value,
      }));
    },
    [],
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

        <HorizontalSelection
          data={frameTypes}
          selectedValue={filters.frame_type}
          onSelect={(val: string) => handleSelect('frame_type', val)}
        />

        <CustomHeading text="Frame Materials" style={styles.sectionHeading} />

        <HorizontalSelection
          data={frameMaterials}
          selectedValue={filters.frame_material}
          onSelect={(val: string) => handleSelect('frame_material', val)}
        />

        <CustomHeading text="Lens Type" reverse style={styles.sectionHeading} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {lensTypes.map((item, index) => {
            const isSelected = filters.frame_lens === item;
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => handleSelect('frame_lens', item)}
              >
                <Text
                  style={[
                    styles.lensText,
                    isSelected && {
                      backgroundColor: COLORS.orange,
                      color: COLORS.white,
                      fontWeight: '600',
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
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
    [navigation, filters, price, handleSelect],
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
    [dispatch, addCart, navigation],
  );
  const keyExtractor = useCallback((item: any, index: number) => {
    return item?.id?.toString() || index.toString();
  }, []);

  return (
    <WrapperContainer>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading.isLoadmore}
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
        keyExtractor={keyExtractor}
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
                marginTop: hp(2),
              }}
            >
              No More Product Available!
            </TextNormal>
          ) : error && !isLoading.isLoadmore && !isLoading.isRefresh ? (
            <TextNormal style={{ color: 'red', alignSelf: 'center' }}>
              {'Error fetching data'}
            </TextNormal>
          ) : null
        }
        ListEmptyComponent={
          isLoading.isRefresh || initialLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', marginTop: hp(5) }}>
              <ActivityIndicator color={'#000'} size={10} />
            </View>
          ) : (
            <TextNormal style={{ color: '#000', alignSelf: 'center', marginTop: hp(5) }}>
              We couldn’t find a match.
            </TextNormal>
          )
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