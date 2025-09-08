
import React from 'react';
import Header from '../../components/common/Header';
import Customimage from '../../components/common/customImage';
import WrapperContainer from '../../components/common/customWrapper';

import { COLORS } from '../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextSmall, TextNormal } from '../../components/common/customText';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Card = ({ item }: any) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardLeft}>
        <Customimage
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={{ gap: 5 }}>
          <TextNormal textStyle={{ fontWeight: '300' }}>{item.name}</TextNormal>
          <TextSmall>
            Size: <TextSmall textStyle={{ fontWeight: '300' }}>{item.size}</TextSmall>
          </TextSmall>
        </View>
      </View>
      <TextNormal style={{ fontWeight: '300', fontSize: RFValue(14) }}>${item.price.toFixed(2)}</TextNormal>
    </View>
  );
};

const OrderHistory = ({ navigation }: any) => {
  const upcoming = products.slice(0, 2);
  const past = products.slice(2);

  return (
    <WrapperContainer>

      <Header title="Orders History" navigation={navigation} />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>

        <View style={styles.textContainer}>
          <TextNormal>Upcoming orders</TextNormal>
          <TextSmall textStyle={{ color: COLORS.secondaryText }}>Clear all</TextSmall>
        </View>

        {upcoming.map((item, index) => (
          <Card key={index} item={item} />
        ))}

        <TouchableOpacity>
          <TextSmall textStyle={styles.paymentText}>Proceed Payment</TextSmall>
        </TouchableOpacity>

        <View style={[styles.textContainer, { marginTop: hp(2) }]}>
          <TextNormal>Past orders</TextNormal>
          <TextSmall textStyle={{ color: COLORS.secondaryText }}>Clear all</TextSmall>
        </View>

        {past.map((item, index) => (
          <Card key={index} item={item} />
        ))}

      </ScrollView>
    </WrapperContainer>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: wp(4),
  },
  cardContainer: {
    backgroundColor: COLORS.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(3),
    borderRadius: wp(3),
    marginBottom: hp(1.5),
    borderColor: COLORS.darkGray,
    borderWidth: wp(0.2),
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  image: {
    width: wp(24),
    height: hp(8),
  },
  paymentText: {
    color: COLORS.orange,
    alignSelf: 'flex-end',
    marginVertical: hp(1.5),
  }
});

const products = [
  {
    id: '1',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    size: 'S',
  },
  {
    id: '2',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    size: 'S',
  },
  {
    id: '3',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    size: 'S',
  },
  {
    id: '4',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    size: 'S',
  },
  {
    id: '5',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    size: 'S',
  },
  {
    id: '6',
    name: 'OH-12',
    price: 2495,
    image: require('../../assets/cardImage/shades.png'),
    size: 'S',
  },
];
