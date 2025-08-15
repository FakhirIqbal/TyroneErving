export interface CustomIconProps {
  icon: string;
  type:string
    | 'entypo'
    | 'ionicons'
    | 'fontawesome'
    | 'fontisto'
    | 'font-awesome5'
    | 'feather'
    | 'material-icons'
    | 'materialCommunityIcons'
    | 'foundation'
    | 'antdesign'
    | 'simplelineicons'
    | 'evilIcons'
    | 'octicons';
  color?: string;
  onPress?: () => void;
  size?: number;
  disabled?: boolean;
  resizeMode?: string;
  style?: Object;
  tintColor?: string;
}
