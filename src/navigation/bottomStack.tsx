import * as Screen from '../screens';
import DrawerNavigator from './drawerStack';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import { COLORS } from '../utils/theme';
import { ScreenNames } from './ScreenName';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tab.Screen
        name={ScreenNames.HOME}
        component={Screen.Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={26}
              color={focused ? COLORS.orange : COLORS.black}
            />
          ),
        }}
      />

      <Tab.Screen
        name={ScreenNames.CATEGORY}
        component={Screen.Category}
        options={{
          tabBarButton: props => (
            <TouchableOpacity
              {...(props as TouchableOpacityProps)}
              style={styles.centerTabContainer}
              activeOpacity={0.8}
            >
              <View style={styles.centerTabIcon}>
                <Feather name="box" size={26} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name={ScreenNames.PROFILE}
        component={Screen.Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              size={26}
              color={focused ? COLORS.orange : COLORS.black}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: hp(7),
    width: wp(70),
    elevation: 8,
    shadowRadius: 10,
    borderTopWidth: 0,
    shadowOpacity: 0.2,
    marginLeft: wp(15),
    position: 'absolute',
    marginBottom: hp(2.5),
    borderRadius: wp(45) / 2,
    shadowColor: COLORS.black,
    backgroundColor: COLORS.gray,
  },
  tabBarIcon: {
    marginTop: hp(1.2),
  },
  centerTabContainer: {
    top: -hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTabIcon: {
    elevation: 24,
    width: wp(18),
    height: wp(18),
    shadowOpacity: 1,
    shadowRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(18) / 2,
    shadowColor: COLORS.orange,
    backgroundColor: COLORS.orange,
  },
});
