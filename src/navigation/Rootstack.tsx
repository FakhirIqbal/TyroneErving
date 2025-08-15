import { Linking, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authStack';
import StackNavigator from './screenStack';
import { ScreenNames } from './ScreenName';
import useUser from '../utils/useUser';

const Rootstack = () => {
  const { user } = useUser();
  console.log('User', user);
  const NAVIGATION_IDS = [
    ScreenNames.SIGNIN,
    ScreenNames.SIGNUP,
    ScreenNames.NOTIFICATION,
    ScreenNames.HOME,
  ];

  const parseUrlParams = (url: string) => {
    const [base, fragment] = url.split('#');
    const queryParams = new URLSearchParams(base.split('?')[1]);
    const fragmentParams = new URLSearchParams(fragment || '');
    return {
      email: queryParams.get('email') || fragmentParams.get('email'),
      type: fragmentParams.get('type'),
      token: fragmentParams.get('access_token'),
    };
  };
  function buildDeepLinkFromURL(url: string, data?: any): string | null {
    console.log('Received URL:', url);

    if (!url) return null;
    parseUrlParams(url);
    if (url.startsWith('myapp://')) {
      const { token, type, email } = parseUrlParams(url);
      if (type === 'signup') {
        return `myapp://${ScreenNames.SIGNIN}/${email}`;
      }
      if (type === 'recovery') {
        return `myapp://${ScreenNames.SETPASSWORD}/${email}`;
      }
    }

    // Handle Firebase notification deep links via data object
    if (data) {
      const navigationId = data.navigationId;
      if (!NAVIGATION_IDS.includes(navigationId)) {
        console.warn('Unverified navigationId', navigationId);
        return null;
      }

      switch (navigationId) {
        case ScreenNames.SIGNIN:
          return `myapp://${ScreenNames.SIGNIN}`;
        case ScreenNames.SIGNUP:
          return `myapp://${ScreenNames.SIGNUP}`;

        default:
          return null;
      }
    }

    // If nothing matches
    return null;
  }

  const linking = {
    prefixes: ['myapp://'],

    config: {
      // initialRouteName: ScreenNames.BOTTOM_STACK,
      screens: {
        [ScreenNames.SIGNIN]: { path: 'sign-in/:email' },
        [ScreenNames.SETPASSWORD]: {
          path: 'reset-password/:email',
        },
      },
    },

    async getInitialURL() {
      // 1. Check if app was opened from a deep link URL directly
      const url = await Linking.getInitialURL();
      if (url) {
        const deepLink = buildDeepLinkFromURL(url);
        if (deepLink) return deepLink;
        // If supabase auth callback, return the raw url for processing
        if (url.startsWith('myapp://auth-callback')) return url;
      }

      // 2. Check if app was opened from a notification
      // const message = await messaging().getInitialNotification();
      // if (message?.data) {
      //   const deepLink = buildDeepLinkFromURL(null, message.data);
      //   if (deepLink) return deepLink;
      // }

      return null;
    },

    subscribe(listener: (url: string) => void) {
      const onReceiveURL = ({ url }: { url: string }) => {
        const deepLink = buildDeepLinkFromURL(url);
        if (deepLink) listener(deepLink);
        else if (url.startsWith('myapp://auth-callback')) listener(url);
      };

      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

      // const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      //   const deepLink = buildDeepLinkFromURL(null, remoteMessage.data);
      //   if (deepLink) listener(deepLink);
      // });

      return () => {
        linkingSubscription.remove();
        // unsubscribe();
      };
    },
  };
  const isLogin = false;
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={false}
        backgroundColor={'#fff'}
      />
      <NavigationContainer linking={linking}>
        {user?.data?.token ? <StackNavigator /> : <AuthStack />}
      </NavigationContainer>
    </View>
  );
};

export default Rootstack;

const styles = StyleSheet.create({});
