import { Icon } from '@/components/ui/icon';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Text } from '@/components/ui/text';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { BottomSheetNames } from '@/types/bottomsheet/bottomSheetNames';
import {} from '@/types/user/user.type';
import { UserVehicle } from '@/types/vehicle/vehicle.type';
import clsx from 'clsx';
import { Car, EllipsisVertical, Share2, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  iconStyles,
  iconWrapStyles,
  rowStyles,
  selectBtnStyles,
  selectBtnTextStyles,
  subTextStyles,
} from './styles';

interface Props {
  index: number;
  userVehicle: UserVehicle;
  selectedVehicleId?: string;
  onSelect: () => void;
}

export const VehicleListRow = ({ userVehicle, index, selectedVehicleId, onSelect }: Props) => {
  const vehicleId = userVehicle.vehicle._id;
  const selected = selectedVehicleId === vehicleId;

  const { enableModal } = useBottomSheetStore();

  const animationFadeIn = useFadeInAnimation({
    direction: 'down',
    duration: 500 * index,
  });

  const listOptions = [
    {
      label: 'Compartilhar',
      icon: Share2,
      color: 'blue',
      onPress: () => enableModal(BottomSheetNames.ShareVehicleBottomSheet, { vehicleId }),
    },
    {
      label: 'Deletar',
      icon: Trash2,
      color: 'red',
      onPress: () =>
        enableModal(BottomSheetNames.DeleteVehicleBottomSheet, {
          vehicleId,
          targetUserId: userVehicle.userVehicleId,
        }),
    },
  ];

  return (
    <Animated.View entering={animationFadeIn}>
      <Pressable onPress={onSelect} className={rowStyles({ selected })}>
        <View className={iconWrapStyles({ selected })}>
          <Icon as={Car} className={iconStyles({ selected })} />
        </View>

        <View className="min-w-0 flex-1">
          <Text
            size="md"
            className="font-semibold text-neutral-900"
            style={{ letterSpacing: -0.2 }}
            numberOfLines={1}
          >
            {userVehicle.vehicle.catalogId.brand} {userVehicle.vehicle.catalogId.model}
          </Text>

          <View className="flex-row flex-wrap items-center gap-3">
            <View className="flex-row items-center gap-2">
              <Text size="xs" className={subTextStyles({ selected })} numberOfLines={1}>
                {userVehicle.vehicle.licensePlate ? userVehicle.vehicle.licensePlate : 'Sem placa'}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-shrink-0 flex-row items-center gap-2">
          <Pressable onPress={onSelect} hitSlop={8} className={selectBtnStyles({ selected })}>
            <Text size="xs" className={selectBtnTextStyles({ selected })}>
              {selected ? 'Selecionado' : 'Usar este'}
            </Text>
          </Pressable>

          <Menu
            placement="bottom right"
            offset={5}
            trigger={({ ...triggerProps }) => {
              return (
                <Pressable
                  {...triggerProps}
                  hitSlop={8}
                  className={clsx([
                    'h-7 w-7 items-center justify-center rounded-full border active:bg-neutral-200',
                    selected ? 'border-primary-400' : 'border-neutral-200',
                  ])}
                >
                  <Icon as={EllipsisVertical} className={selectBtnTextStyles({ selected })} />
                </Pressable>
              );
            }}
          >
            {listOptions.map((option) => (
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
        </View>
      </Pressable>
    </Animated.View>
  );
};
