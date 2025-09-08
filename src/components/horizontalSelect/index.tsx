import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS } from '../../utils/theme';
import Customimage from '../common/customImage';
import { HorizontalCardListProps } from './interface';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const HorizontalCardList: React.FC<HorizontalCardListProps> = ({
  selected,
  onPress,
  item,
  index,
}) => {
  const isSelected = selected === item.name;
  console.log('first', isSelected);
  return (
    <TouchableOpacity
      // key={index.toString()}
      onPress={onPress}
      style={[styles.card, isSelected && styles.selectedCard]}
    >
      <Customimage
        source={item.image}
        style={styles.image}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.name,
          isSelected && { color: COLORS.orange, fontWeight: '600' },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
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
  selectedCard: {
    borderColor: COLORS.orange,
    borderWidth: 2,
    borderRadius: wp(2),
  },
});

export const HorizontalSelection = React.memo(HorizontalCardList);
