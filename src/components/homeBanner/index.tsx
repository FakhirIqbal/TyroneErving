import { COLORS } from '../../utils/theme';
import { Text } from 'react-native-gesture-handler';
import { View, Image, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CustomButton from '../common/customButton';
import CustomHeading from '../customHeading';
import Customimage from '../common/customImage';
import { TextSmall } from '../common/customText';

const HomeBanner = () => {
  return (
    <View style={styles.banner}>
      <View style={styles.bannerLeft}>
        <TextSmall textStyle={styles.tag}>New Collection</TextSmall>
        <CustomHeading text="Incredible experience" />
        <TextSmall  textStyle={styles.subText}>Become unique in your individuality</TextSmall>
        <CustomButton
          title="Explore now"
          onPress={() => { }}
          style={{ height: 40 }}
        />
      </View>

      <View style={styles.bannerRight}>
        <Image source={require('../../assets/girl.png')} resizeMode="contain" />
        <Customimage
          source={require('../../assets/girl.png')}
          style={{ height: 0 }}
          resizeMode={'contain'}
        />
      </View>
    </View>
  );
};
export default HomeBanner;

const styles = StyleSheet.create({
  banner: {
    backgroundColor: COLORS.gray,
    borderRadius: wp(2.5),
    marginVertical: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  bannerLeft: {
    width: wp(45),
    justifyContent: 'center',
    paddingHorizontal: wp(3),
  },

  bannerRight: {
    width: wp(45),
  },
  tag: {
    borderColor: COLORS.orange,
    borderWidth: wp(0.2),
    padding: wp(1.5),
    borderRadius: wp(2.5),
    color: COLORS.orange,
    alignSelf: 'flex-start',
  },

  subText: {
    fontSize: RFValue(10),
    marginBottom: hp(1.5),
    color: COLORS.secondaryText,
  },
});
