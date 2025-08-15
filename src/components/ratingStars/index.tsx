import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/theme';

interface RatingStarsProps {
  value: number;
  style?: StyleProp<ViewStyle>;
}

const RatingStars: React.FC<RatingStarsProps> = ({ value, style }) => {
  const stars = Array.from({ length: 5 }).map((_, index) => (
    <Icon
      key={index}
      name="star"
      size={RFValue(12)}
      color={index < value ? COLORS.yellow : COLORS.darkGray}
      style={{ marginHorizontal: wp(0.3) }}
    />
  ));

  return (
    <View style={[styles.container, style]}>
      <View style={styles.starRow}>{stars}</View>
      <Text style={styles.text}>{`${value}.0`}</Text>
    </View>
  );
};

export default RatingStars;

const styles = StyleSheet.create({
  container: {
    gap: 4,
    flexDirection: 'row',
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp(0.5),
  },
  text: {
    fontSize: RFValue(10),
    color: COLORS.secondaryText,
  },
});
