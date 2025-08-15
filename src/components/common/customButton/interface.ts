import { StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';

export interface CustomButtonProps {
  title: string;
  iconName?: string;
  variant?: 'default' | 'dark';
  style?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
  isloading?: boolean;
}
