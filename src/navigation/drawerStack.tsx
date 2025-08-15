import * as Screen from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/common/customButton';

import { COLORS } from '../utils/theme';
import { ScreenNames } from './ScreenName';
import { RFValue } from 'react-native-responsive-fontsize';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TabNavigator from './bottomStack';
import Customimage from '../components/common/customImage';
import useUser from '../utils/useUser';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }: any) => {
  const { user, handleSetUser } = useUser();
  const menuItems = [
    {
      label: 'Orders',
      icon: 'document-text-outline',
      ScreenName: ScreenNames.ORDER,
    },
    { label: 'Cart', icon: 'cart-outline', ScreenName: ScreenNames.CART },
    {
      label: 'Notifications',
      icon: 'notifications-outline',
      ScreenName: ScreenNames.NOTIFICATION,
    },
    {
      label: 'Wishlist',
      icon: 'heart-outline',
      ScreenName: ScreenNames.WISHLIST,
    },
    {
      label: 'Cards',
      icon: 'card-outline',
      ScreenName: ScreenNames.PAYMENT_METHOD,
    },
  ];

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: styles.drawerStyle,
        drawerType: 'front',
      }}
      drawerContent={() => (
        <View style={styles.container}>
          <View style={styles.logoWrapper}>
            <Customimage
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => navigation.navigate(item.ScreenName)}
              >
                <Icon name={item.icon} size={26} color="#f24e1e" />
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Icon
                  name="chevron-forward"
                  size={16}
                  color={COLORS.darkGray}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <CustomButton
            title="Logout"
            onPress={() => {
              handleSetUser(null);
            }}
            style={styles.btn}
          />
        </View>
      )}
    >
      <Drawer.Screen name={ScreenNames.BOTTOM_STACK} component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp(80),
  },
  drawerStyle: {
    width: wp(60),
    backgroundColor: COLORS.white,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  logo: {
    width: wp(25),
  },
  logoWrapper: {
    height: hp(25),

    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',

    backgroundColor: COLORS.gray,
  },
  menuLabel: {
    flex: 1,
    marginLeft: wp(2),
    fontSize: RFValue(11),
    color: COLORS.primaryText,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
    borderBottomColor: COLORS.gray,
  },
  btn: {
    width: '70%',
    alignSelf: 'center',
    marginBottom: hp(2),
  },
});
