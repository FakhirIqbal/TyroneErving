
import CustomHeading from '../customHeading';
import Customimage from '../common/customImage';
import CustomButton from '../common/customButton';

import { COLORS } from '../../utils/theme';
import { View, StyleSheet } from 'react-native';
import { TextSmall } from '../common/customText';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../navigation/ScreenName';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const HomeBanner = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.banner}>

      <View style={styles.bannerLeft}>
        <TextSmall textStyle={styles.tag}>New Collection</TextSmall>
        <CustomHeading text="Incredible experience" />
        <TextSmall textStyle={styles.subText}>Become unique in your individuality</TextSmall>
        <CustomButton
          title="Explore now"
          style={{ height: 40 }}
          onPress={() => navigation.navigate(ScreenNames.CATEGORY as never)}
        />
      </View>
      <View style={styles.bannerRight}>
        <Customimage
          source={require('../../assets/girl.png')}
          style={{ height: 240 }}
          resizeMode={'contain'}
        />
      </View>

    </View>
  );
};
export default HomeBanner;


const styles = StyleSheet.create({
  banner: {
    overflow: 'hidden',
    flexDirection: 'row',
    borderRadius: wp(2.5),
    marginVertical: hp(2),
    backgroundColor: COLORS.gray,
    justifyContent: 'space-between',
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
    borderWidth: wp(0.2),
    padding: wp(1.5),
    borderRadius: wp(2.5),
    color: COLORS.orange,
    alignSelf: 'flex-start',
    borderColor: COLORS.orange,
  },
  subText: {
    fontSize: RFValue(10),
    marginBottom: hp(1.5),
    color: COLORS.secondaryText,
  },
});