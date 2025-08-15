import * as Screen from '../screens';
import { ScreenNames } from './ScreenName';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenNames.SIGNUP} component={Screen.SignUp} />
      <Stack.Screen name={ScreenNames.SIGNIN} component={Screen.SignIn} />
      <Stack.Screen
        name={ScreenNames.SETPASSWORD}
        component={Screen.SetPassword}
      />
      <Stack.Screen
        name={ScreenNames.FORGET_PASS}
        component={Screen.ForgetPass}
      />
      {/* <Stack.Screen
        name={ScreenNames.OTP}
        component={Screen.OTP}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
