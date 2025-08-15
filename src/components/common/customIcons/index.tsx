import React from 'react';
import {Pressable, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {COLORS} from '../../../utils/theme';
import {CustomIconProps} from './interface';

const CustomIcons: React.FC<CustomIconProps> = ({
  icon,
  type,
  color,
  onPress,
  size,
  disabled,
  resizeMode,
  style,
  tintColor,
  ...rest
}) => {
  // console.log('ICON');
  return (
    <Pressable
      style={style}
      onPress={onPress}
      disabled={typeof onPress != 'function'}>
      {type == 'entypo' && (
        <Entypo
          disabled
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
      {type == 'ionicons' && (
        <Ionicons
          disabled
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
      {type == 'fontawesome' && (
        <FontAwesome
          disabled
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
      {type == 'fontisto' && (
        <Fontisto
          disabled
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
      {type == 'font-awesome5' && (
        <FontAwesome5
          disabled
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
      {type == 'feather' && (
        <Feather
          disabled
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
      {type == 'material-icons' && (
        <MaterialIcons
          disabled
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
      {type == 'materialCommunityIcons' && (
        <MaterialCommunityIcons
          disabled
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
      {type == 'foundation' && (
        <Foundation
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
      {type == 'antdesign' && (
        <AntDesign
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
      {type == 'simplelineicons' && (
        <SimpleLineIcons
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
      {type == 'evilIcons' && (
        <EvilIcons
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
      {type == 'octicons' && (
        <Octicons
          name={icon}
          color={color || COLORS.IconBlack}
          size={size || wp(5)}
          {...rest}
        />
      )}
    </Pressable>
  );
};
export const CustomIcon = React.memo(CustomIcons);
