import clsx from 'clsx';
import { ScrollView, View } from 'react-native';
import { CardSliderItem, CardSliderItemProps } from './CardSliderItem';

interface Props {
  cards: CardSliderItemProps[];
  className?: string;
  contentContainerClassName?: string;
}

export const CardsSliderSection = ({ cards, className, contentContainerClassName }: Props) => {
  return (
    <View className={clsx('py-1', className)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName={clsx('py-1 gap-3', contentContainerClassName)}
      >
        {cards.map((card, index) => (
          <CardSliderItem key={index} {...card} />
        ))}
      </ScrollView>
    </View>
  );
};
