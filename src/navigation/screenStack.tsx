import * as Screen from '../screens';
import AuthStack from './authStack';
import TabNavigator from './bottomStack';
import DrawerNavigator from './drawerStack';
import { ScreenNames } from './ScreenName';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ScreenNames.DRAWER_HOME}
        component={DrawerNavigator}
      />
      <Stack.Screen name={ScreenNames.WISHLIST} component={Screen.Wishlist} />
      <Stack.Screen
        name={ScreenNames.EDIT_PROFILE}
        component={Screen.EditProfile}
      />
      <Stack.Screen
        name={ScreenNames.CHANGE_PASSWORD}
        component={Screen.ChangePassword}
      />
      <Stack.Screen
        name={ScreenNames.PRIVACY_POLICY}
        component={Screen.PrivacyPolicy}
      />
      <Stack.Screen
        name={ScreenNames.TERMS_AND_CONDITION}
        component={Screen.TermsAndCondition}
      />
      <Stack.Screen
        name={ScreenNames.GIVE_FEEDBACK}
        component={Screen.GiveFeedback}
      />
      <Stack.Screen
        name={ScreenNames.PAYMENT_METHOD}
        component={Screen.PaymentMethod}
      />
      <Stack.Screen
        name={ScreenNames.NOTIFICATION}
        component={Screen.Notification}
      />
      <Stack.Screen name={ScreenNames.ORDER} component={Screen.OrderHistory} />
      <Stack.Screen
        name={ScreenNames.PRODUCT_DETAIL}
        component={Screen.ProductDetail}
      />
      <Stack.Screen name={ScreenNames.CART} component={Screen.Cart} />
      <Stack.Screen
        name={ScreenNames.CART_DETAIL}
        component={Screen.CartDetail}
      />
      <Stack.Screen name={ScreenNames.ADD_CARD} component={Screen.AddCard} />
      <Stack.Screen
        name={ScreenNames.ORDER_CONFIRMATION}
        component={Screen.OrderConfirmation}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
