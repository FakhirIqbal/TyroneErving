import React, { useEffect } from 'react';
import AuthStack from './src/navigation/authStack';
import { Linking, StatusBar, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/screenStack';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, RootState, store } from './src/redux/store';
import { supabase } from './src/config/supabase';
import { ScreenNames } from './src/navigation/ScreenName';
import Toast from 'react-native-toast-message';
import Rootstack from './src/navigation/Rootstack';

function App() {
  const isLogin = false;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Rootstack />
        <Toast />
      </PersistGate>
    </Provider>
  );
}

export default App;
