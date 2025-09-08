import { COLORS } from '../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { View, Text, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Font } from '../../utils/ImagePath';
import Customimage from '../common/customImage';

interface AuthHeaderProps {
  title: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Customimage
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode={'contain'}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  logo: {
    width: wp(28),
    height: hp(15),
    marginBottom: hp(2),
    alignSelf: 'center',
  },
  title: {
    fontSize: RFValue(22),
    fontFamily: Font.bold,
    color: COLORS.primaryText,
  },
});

export default AuthHeader;
