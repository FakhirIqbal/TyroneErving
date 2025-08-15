import React from 'react';
import { COLORS } from '../../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}


const CustomHeader: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Icon name="arrow-back" size={20} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 20 }} />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: '600',
  },
});