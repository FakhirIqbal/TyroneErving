import React from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import CustomHeader from '../../components/common/customHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../utils/theme';
import ProductCard from '../../components/productCard';
import WrapperContainer from '../../components/common/customWrapper';
import Header from '../../components/common/Header';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { TextNormal } from '../../components/common/customText';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { removeFromWishlist } from '../../redux/features/whishList';

// const products = [
//   {
//     id: '1',
//     name: 'OH-12',
//     price: 2495,
//     image: require('../../assets/cardImage/shades.png'),
//     fav: true,
//   },
//   {
//     id: '2',
//     name: 'OH-12',
//     price: 2495,
//     image: require('../../assets/cardImage/shades.png'),
//     fav: true,
//   },
//   {
//     id: '3',
//     name: 'OH-12',
//     price: 2495,
//     image: require('../../assets/cardImage/shades.png'),
//     fav: true,
//   },
//   {
//     id: '4',
//     name: 'OH-12',
//     price: 2495,
//     image: require('../../assets/cardImage/shades.png'),
//     fav: true,
//   },
//   {
//     id: '5',
//     name: 'OH-12',
//     price: 2495,
//     image: require('../../assets/cardImage/shades.png'),
//     fav: true,
//   },
//   {
//     id: '6',
//     name: 'OH-12',
//     price: 2495,
//     image: require('../../assets/cardImage/shades.png'),
//     fav: true,
//   },
// ];

const Wishlist = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const whishList = useSelector((state: RootState) => state.whishList.wishlist);
  return (
    <WrapperContainer>
      <Header title="Wishlist" navigation={navigation} />

      <FlatList
        ListEmptyComponent={() => (
          <TextNormal
            textStyle={{
              alignSelf: 'center',
              marginTop: heightPercentageToDP(30),
            }}
          >
            Your wishlist is empty
          </TextNormal>
        )}
        bounces={false}
        data={whishList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: any }) => <ProductCard item={item} favOnpress={() => item && dispatch(removeFromWishlist(item))} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </WrapperContainer>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  list: {
    paddingBottom: heightPercentageToDP(5),
  },
  row: {
    justifyContent: 'space-around',
    // marginBottom: 15,
  },
});
