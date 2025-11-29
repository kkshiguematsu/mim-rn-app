import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { formatDateToDMY, formatTimeToHM } from '@/utils/formatDate';
import { MapPin } from 'lucide-react-native';
import { View } from 'react-native';

export interface HistoryResponse {
  date: string;
  duration: number;
  max_power: string;
  location: {
    city: string;
    address: string;
  };
  price: {
    value: number;
    token: string;
  };
  car: {
    model: string;
    license_plate: string;
  };
}

export interface HistoryCardProps {
  data: HistoryResponse;
}

export const HistoryCard = ({ data }: HistoryCardProps) => {
  const date = formatDateToDMY(Number(data.date));
  const hours = formatTimeToHM(Number(data.date));

  return (
    <Card className="flex w-full flex-row gap-3 px-5 py-3">
      {/* <View className="w-24"></View> */}
      <View className="flex-1">
        <View className="flex w-full flex-row justify-between">
          <View className="flex flex-row items-center gap-1">
            <Icon as={MapPin} size="xl" />
            <View className="flex flex-col">
              <Heading size="sm">{data.location.city}</Heading>
              <Text size="sm">{data.location.address}</Text>
            </View>
          </View>
          <Heading size="sm">{date}</Heading>
        </View>

        <Divider className="my-2" />

        <View className="flex flex-row items-center gap-2">
          <View className="flex flex-1 flex-row items-center justify-evenly gap-2">
            <View className="items-center">
              <Heading className="text-blue-500">{data.max_power}</Heading>
              <Text size="sm">Max. Power</Text>
            </View>
            <Divider className="h-[50px]" orientation={'vertical'} />
            <View className="items-center">
              <Heading className="text-blue-500">{data.duration}</Heading>
              <Text size="sm">Duração</Text>
            </View>
            <Divider className="h-[50px]" orientation={'vertical'} />
            <View className="items-center">
              <Heading className="text-blue-500">{`R$${data.price.value}`}</Heading>
              <Text size="sm">Valor</Text>
            </View>
          </View>
        </View>

        <Divider className="my-2" />

        <View className="flex w-full flex-row items-center justify-between">
          <Button className="flex-1">
            <ButtonText>Detalhes</ButtonText>
          </Button>
        </View>
      </View>
    </Card>
  );
};
