import {ReactNode} from 'react';
import {TextProps, TextStyle} from 'react-native';

export interface customtextProp extends TextProps {
  textStyle?: TextStyle;
  children?: ReactNode;

}
