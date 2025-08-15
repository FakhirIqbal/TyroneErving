import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeHeader from '../../components/homeHeader';
import HomeBanner from '../../components/homeBanner';
import RateAppModal from '../../components/rateAppModal/RateAppModal';
import { COLORS } from '../../utils/theme';
import CustomHeading from '../../components/customHeading';
import ProductCard from '../../components/productCard';
import WrapperContainer from '../../components/common/customWrapper';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import useProducts from './useProducts';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/features/addCart';
import { RootState } from '../../redux/store';
import { addToWhishList } from '../../redux/features/whishList';

const products = [
  {
    id: '1',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    fav: false,
  },
  {
    id: '2',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    fav: false,
  },
  {
    id: '3',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    fav: false,
  },
  {
    id: '4',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    fav: false,
  },
  {
    id: '5',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    fav: false,
  },
  {
    id: '6',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    fav: false,
  },
];

const Home = ({ navigation }: any) => {
  const crtData = useSelector((state: RootState) => state);
  console.log('Cart Data', crtData);
  const TABBARHEIGHT = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const categories = ['All', 'New Arrivals', 'Top Pick', 'Men', 'Women'];
  const [selected, setSelected] = useState('All');
  const [query, setQuery] = useState('');
  const { allProducts, initialLoading } = useProducts();

  console.log('Trn', allProducts);

  const addCart = (item: any) => {
    let quantity = 1;
    const cartItem = {
      ...item,
      quantity,
    };

    return dispatch(addToCart(cartItem));
  };
  const renderItem = useCallback(
    ({ item }: any) => {
      if (item?.colors === null) {
        return;
      }
      return (
        <ProductCard
          isLoading={!item}
          item={item}
          favOnpress={() => {
            if (item) {
              dispatch(addToWhishList(item));
            }
          }}
          crtOnpress={() => {
            if (item) {
              addCart(item);
            }
          }}
        />
      );
    },
    [dispatch, addCart],
  );
  const allData = useMemo(
    () => (initialLoading ? Array(6).fill(undefined) : allProducts || []),
    [initialLoading, allProducts],
  );
  return (
    <WrapperContainer>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
      >
        <HomeHeader navigation={navigation} />
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={RFValue(14)}
            color={COLORS.orange}
            style={{ marginLeft: 10 }}
          />
          <TextInput
            placeholder="Search for *Sunglasses*"
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholderTextColor={COLORS.darkGray}
          />
          <Feather
            name="sliders"
            size={RFValue(14)}
            color={COLORS.orange}
            style={{ marginRight: 10 }}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.category,
                selected === cat && styles.categorySelected,
              ]}
              onPress={() => setSelected(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selected === cat && styles.categoryTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <HomeBanner />
        {/* <RateAppModal /> */}

        <View style={styles.productContainer}>
          <FlatList
            scrollEnabled={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              padding: wp(1),
              marginBottom: hp(1),
            }}
            numColumns={2}
            // data={[...Array(6)]}
            data={allData}
            renderItem={renderItem}
          />
        </View>

        <View
          style={[
            styles.productContainer,
            { paddingBottom: TABBARHEIGHT + hp(5) },
          ]}
        ></View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  productContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
    marginBottom: wp(5),
  },
  searchContainer: {
    backgroundColor: COLORS.gray,
    borderRadius: wp(2),
    paddingVertical: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1.5),
  },
  input: {
    flex: 1,
    color: COLORS.black,
    fontSize: RFValue(10),
    paddingHorizontal: wp(2.5),
  },
  categoryScroll: {
    flexGrow: 0,
  },
  category: {
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1),
    backgroundColor: '#F2F2F2',
    borderRadius: wp(2),
    marginRight: wp(2),
  },
  categorySelected: {
    backgroundColor: COLORS.orange,
  },
  categoryText: {
    fontSize: RFValue(11),
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: COLORS.white,
  },
});
