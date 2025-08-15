import { TextStyle, ViewStyle } from 'react-native';

export interface HeaderProps {
  navigation?: any;
  title?: string;
  containerStyle?: ViewStyle;
  color?: string;
  headingStyle?: TextStyle;
  onBackPress?: () => void;
}
