import { ScrollView } from 'react-native';
import { CardSliderItem, CardSliderItemProps } from './CardSliderItem';

interface Props {
  cards: CardSliderItemProps[];
}

export const CardsSliderSection = ({ cards }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3 px-7 h-24"
    >
      {cards.map((card, index) => (
        <CardSliderItem key={index} {...card} />
      ))}
    </ScrollView>
  );
};
