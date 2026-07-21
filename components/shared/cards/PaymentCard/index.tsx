import { Text } from '@/components/ui/text';

import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { BottomSheetNames } from '@/types/bottomsheet/bottomSheetNames';
import { UserPaymentCard } from '@/types/payment/userPaymentCard.type';
import clsx from 'clsx';
import { CreditCard, EllipsisVertical, Star, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { TintedIcon } from '../../icon/TintedIcon';

interface ItemCardProps {
  paymentCard: UserPaymentCard;
}

export const PaymentCard = ({ paymentCard }: ItemCardProps) => {
  const { enableModal } = useBottomSheetStore();

  const openEditPaymentCardBottomSheet = () => {
    enableModal(BottomSheetNames.PaymentCardSetDefaultBottomSheet, paymentCard._id);
  };

  const openDeletePaymentCardBottomSheet = () => {
    enableModal(BottomSheetNames.PaymentCardDeleteBottomSheet, paymentCard._id);
  };

  const menuOptions = [
    {
      label: 'Tornar padrão',
      icon: Star,
      color: 'blue',
      onPress: openEditPaymentCardBottomSheet,
    },
    {
      label: 'Deletar',
      icon: Trash2,
      color: 'red',
      onPress: openDeletePaymentCardBottomSheet,
    },
  ];

  return (
    <Card
      variant="elevated"
      className={clsx([
        'flex flex-row items-center justify-between rounded-2xl p-2',
        paymentCard.isDefault ? 'border-2 border-primary-600' : 'border border-transparent',
      ])}
    >
      <View className="flex flex-row items-center justify-center gap-3">
        <TintedIcon
          icon={CreditCard}
          size="xl"
          color={paymentCard.isDefault ? 'primary' : 'neutral'}
        />
        <Text>{paymentCard.tokens[0].provider}</Text>
        <Heading>**** {paymentCard.last4}</Heading>
      </View>

      <Menu
        placement="bottom right"
        offset={5}
        trigger={({ ...triggerProps }) => {
          return (
            <Pressable
              {...triggerProps}
              hitSlop={8}
              className={
                'h-7 w-7 items-center justify-center rounded-full border border-neutral-200 active:bg-neutral-200'
              }
            >
              <Icon as={EllipsisVertical} />
            </Pressable>
          );
        }}
      >
        {menuOptions.map((option) => (
          <MenuItem key={option.label} textValue={option.label} onPress={option.onPress}>
            <MenuItemLabel>
              <View className="flex-row items-center gap-2">
                <Icon as={option.icon} className={`text-${option.color}-600`} />
                <Text className={`text-${option.color}-600`}>{option.label}</Text>
              </View>
            </MenuItemLabel>
          </MenuItem>
        ))}
      </Menu>
    </Card>
  );
};
