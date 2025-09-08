
import React from 'react';
import useProducts from './useProducts';
import HomeHeader from '../../components/homeHeader';
import HomeBanner from '../../components/homeBanner';
import ProductCard from '../../components/productCard';
import Feather from 'react-native-vector-icons/Feather';
import WrapperContainer from '../../components/common/customWrapper';

import { COLORS } from '../../utils/theme';
import { useDispatch } from 'react-redux';
import { Font } from '../../utils/ImagePath';
import { useCallback, useMemo, useState } from 'react';
import { addToCart } from '../../redux/features/addCart';
import { RFValue } from 'react-native-responsive-fontsize';
import { addToWishlist } from '../../redux/features/whishList';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { TextNormal, TextSmaller } from '../../components/common/customText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, StyleSheet, RefreshControl, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';


const Home = ({ navigation }: any) => {

  const TABBARHEIGHT = useBottomTabBarHeight();
  const dispatch = useDispatch();
  
  const categories = ['All', 'New Arrivals', 'male', 'female'];
  const [selected, setSelected] = useState('All');

  const {
    allProducts,
    initialLoading,
    isLoadmore,
    refetchProduct,
    isLoading,
    hasMorePages,
    error,
    handleSearch,
    search,
  } = useProducts(selected);
  // console.log('Trn', allProducts);
  const addCart = useCallback(
    (item: any) => {
      if (!item) return;
      dispatch(addToCart({ ...item, quantity: 1 }));
    },
    [dispatch],
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

  const renderCategoryItem = useCallback(
    ({ item: cat, index }: { item: string; index: number }) => (
      <TouchableOpacity
        key={index}
        style={[styles.category, selected === cat && styles.categorySelected]}
        onPress={() => setSelected(cat)}
      >
        <TextSmaller
          style={[
            { color: COLORS.darkGray },
            selected === cat && styles.categoryTextSelected,
          ]}
        >
          {cat}
        </TextSmaller>
      </TouchableOpacity>
    ),
    [selected],
  );

  const headerComp = useMemo(
    () => (
      <>
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
            value={search}
            onChangeText={handleSearch}
            placeholderTextColor={COLORS.darkGray}
          />
          <Feather
            name="sliders"
            size={RFValue(14)}
            color={COLORS.orange}
            style={{ marginRight: 10 }}
          />
        </View>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        />
        <HomeBanner />
      </>
    ),
    [navigation, categories, renderCategoryItem],
  );

  const allData = useMemo(
    () => (initialLoading ? Array(6).fill(undefined) : allProducts || []),
    [initialLoading, allProducts],
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
        contentContainerStyle={{ paddingBottom: TABBARHEIGHT + hp(5) }}
        numColumns={2}
        data={allData}
        renderItem={renderItem}
        // keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
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
          <TextNormal style={{ color: '#000', alignSelf: 'center', marginTop: hp(15) }}>
            No product found
          </TextNormal>
        }
      />
    </WrapperContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
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
    marginHorizontal: wp(2),
  },
  categorySelected: {
    backgroundColor: COLORS.orange,
  },
  categoryTextSelected: {
    color: COLORS.white,
  },
});