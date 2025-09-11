import { ImageSourcePropType } from 'react-native';

export type HorizontalCardListProps = {
  selectedValue?: any;
  onSelect?: any;
  data: CardItem[];
};
type CardItem = {
  name: string;
  image: ImageSourcePropType;
};
