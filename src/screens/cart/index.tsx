import React, { useState } from 'react';
import Header from '../../components/common/Header';
import CustomButton from '../../components/common/customButton';
import QuantitySelector from '../../components/quantitySelector';
import WrapperContainer from '../../components/common/customWrapper';

import { CartItem } from './interface';
import { COLORS } from '../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextSmall } from '../../components/common/customText';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Customimage from '../../components/common/customImage';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const DELIVERY_FEE = 50;

const Cart = ({ navigation }: any) => {
  const cartData = useSelector((state: RootState) => state.cart.cartItems);
  console.log('Cart Data', cartData);
  const [cartItems, setCartItems] = useState<CartItem[]>(products);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;
    setCartItems(updatedItems);
  };

  const totalItemsPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const total = totalItemsPrice + DELIVERY_FEE;

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardLeft}>
        <Customimage
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.productInfo}>
          <TextSmall style={styles.productSize}>{item.name}</TextSmall>
          <TextSmall>${item?.base_price?.toFixed(2)}</TextSmall>
          <TextSmall>
            Size: <Text style={styles.productSize}>{item.size}</Text>
          </TextSmall>
        </View>
      </View>
      <QuantitySelector
        value={item?.quantity}
        onChange={val => handleQuantityChange(index, val)}
      />
    </View>
  );

  return (
    <WrapperContainer>
      <Header title="Cart" navigation={navigation} />
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View>
        <FlatList
          bounces={false}
          data={cartData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ marginTop: hp(2) }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return (
              <>
                <View style={styles.amountContainer}>
                  <TextSmall style={styles.sectionTitle}>Amount</TextSmall>

                  {cartData.map(item => (
                    <View key={item.id} style={styles.row}>
                      <TextSmall style={styles.productSize}>
                        {item.name}
                      </TextSmall>
                      <TextSmall>
                        ${(item.base_price * item?.quantity).toFixed(2)}
                      </TextSmall>
                    </View>
                  ))}

                  <View style={[styles.row, { marginTop: hp(1.5) }]}>
                    <TextSmall style={styles.productSize}>
                      Delivery Fee
                    </TextSmall>
                    <TextSmall>${DELIVERY_FEE.toFixed(2)}</TextSmall>
                  </View>

                  <View
                    style={{
                      borderBottomColor: COLORS.darkGray,
                      borderBottomWidth: wp(0.2),
                      marginVertical: hp(1.5),
                    }}
                  />

                  <View style={[styles.row]}>
                    <TextSmall style={styles.totalText}>Total</TextSmall>
                    <TextSmall style={styles.totalText}>
                      ${total.toFixed(2)}
                    </TextSmall>
                  </View>
                </View>
                <CustomButton
                  title="Checkout"
                  onPress={() => navigation.navigate('CartDetail')}
                />
              </>
            );
          }}
        />
      </View>

      {/* <View style={styles.amountContainer}>
        <TextSmall style={styles.sectionTitle}>Amount</TextSmall>

        {cartItems.map(item => (
          <View key={item.id} style={styles.row}>
            <TextSmall style={styles.productSize}>{item.name}</TextSmall>
            <TextSmall>${(item.price * item.quantity).toFixed(2)}</TextSmall>
          </View>
        ))}

        <View style={[styles.row, { marginTop: hp(1.5) }]}>
          <TextSmall style={styles.productSize}>Delivery Fee</TextSmall>
          <TextSmall>${DELIVERY_FEE.toFixed(2)}</TextSmall>
        </View>

        <View
          style={{
            borderBottomColor: COLORS.darkGray,
            borderBottomWidth: wp(0.2),
            marginVertical: hp(1.5),
          }}
        />

        <View style={[styles.row]}>
          <TextSmall style={styles.totalText}>Total</TextSmall>
          <TextSmall style={styles.totalText}>${total.toFixed(2)}</TextSmall>
        </View>
      </View>

      <CustomButton
        title="Checkout"
        onPress={() => navigation.navigate('CartDetail')}
      /> */}
      {/* </ScrollView> */}
    </WrapperContainer>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(3),
    borderRadius: wp(3),
    borderColor: COLORS.darkGray,
    borderWidth: wp(0.2),
    marginBottom: hp(1),
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  image: {
    width: wp(26),
    height: hp(8),
  },
  productInfo: {
    gap: wp(2),
  },
  productSize: {
    fontWeight: '300',
  },
  amountContainer: {
    backgroundColor: COLORS.gray,
    padding: wp(4),
    marginVertical: hp(3),
    borderRadius: wp(3),
    borderColor: COLORS.darkGray,
    borderWidth: wp(0.2),
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: hp(2),
    fontSize: RFValue(13),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.8),
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: RFValue(14),
  },
});

const products: CartItem[] = [
  {
    id: '1',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    size: 'M',
    quantity: 1,
  },
  {
    id: '2',
    name: 'OH-13',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    size: 'M',
    quantity: 1,
  },
  {
    id: '3',
    name: 'OH-14',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    size: 'M',
    quantity: 1,
  },
];
