import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { ScreenNames } from '../../navigation/ScreenName';
import Customimage from '../common/customImage';

type HeaderProps = {
  containerStyle?: ViewStyle;
  navigation?: any;
};

const HomeHeader: React.FC<HeaderProps> = ({ containerStyle, navigation }) => {
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Customimage
          source={require('../../assets/headerIcon/menu.png')}
          style={styles.smallIcon}
          resizeMode={'contain'}
        />
      </TouchableOpacity>

      <Customimage
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode={'contain'}
      />

      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.CART)}>
          <Customimage
            source={require('../../assets/headerIcon/cart.png')}
            style={styles.smallIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.NOTIFICATION)}>
          <Customimage
            source={require('../../assets/headerIcon/bell.png')}
            style={styles.smallIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(2),
  },
  logo: {
    height: hp(6.5),
    width: wp(30),
  },
  rightIcons: {
    flexDirection: 'row',
    columnGap: wp(3),
  },
  smallIcon: {
    width: wp(5),
    height: wp(5),
    resizeMode: 'contain',
  },
});
