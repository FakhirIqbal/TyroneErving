import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const WrapperContainer = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: widthPercentageToDP(5),
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default WrapperContainer;

const styles = StyleSheet.create({});
