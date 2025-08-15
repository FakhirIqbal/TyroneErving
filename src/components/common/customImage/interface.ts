import {ImageStyle as ImgStyle} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';

export interface customImageProps {
  source?: any;
  style?: any;
  resizeMode?: any;
  btnStyle?: any;
  onPress?: () => void;
  disabled?:boolean
}
