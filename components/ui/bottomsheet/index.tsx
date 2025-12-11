import { useTheme } from '@/context/themeContext';
import { FocusScope } from '@gluestack-ui/utils/aria';
import { VariantProps, tva } from '@gluestack-ui/utils/nativewind-utils';
import GorhomBottomSheet, {
  BottomSheetHandle,
  BottomSheetBackdrop as GorhomBottomSheetBackdrop,
  BottomSheetFlatList as GorhomBottomSheetFlatList,
  BottomSheetTextInput as GorhomBottomSheetInput,
  BottomSheetScrollView as GorhomBottomSheetScrollView,
  BottomSheetSectionList as GorhomBottomSheetSectionList,
  BottomSheetView as GorhomBottomSheetView,
} from '@gorhom/bottom-sheet';
import { cssInterop } from 'nativewind';
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { PressableProps, TextProps } from 'react-native';
import { Platform, Pressable, Text, View } from 'react-native';
import { InputIcon, InputSlot, inputFieldStyle, inputStyle } from '../input';

const bottomSheetBackdropStyle = tva({
  base: 'absolute inset-0 flex-1 touch-none select-none bg-black opacity-0',
});

const bottomSheetContentStyle = tva({
  base: 'px-7',
});
const bottomSheetTriggerStyle = tva({
  base: '',
});

const bottomSheetIndicatorStyle = tva({
  base: 'w-full items-center rounded-t-lg',
});

const bottomSheetItemStyle = tva({
  base: 'p-3 flex-row items-center rounded-sm w-full disabled:opacity-0.4 web:pointer-events-auto disabled:cursor-not-allowed hover:bg-background-50 active:bg-background-100 focus:bg-background-100 web:focus-visible:bg-background-100',
});

export const BottomSheetContext = createContext<{
  visible: boolean;
  bottomSheetRef: React.RefObject<GorhomBottomSheet>;
  handleClose: () => void;
  handleOpen: () => void;
}>({
  visible: false,
  bottomSheetRef: { current: null },
  handleClose: () => {},
  handleOpen: () => {},
});

type IBottomSheetProps = React.ComponentProps<typeof GorhomBottomSheet>;
export const BottomSheet = ({
  snapToIndex = 1,
  onOpen,
  onClose,
  ...props
}: {
  snapToIndex?: number;
  children?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}) => {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);

  const [visible, setVisible] = useState(false);

  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(snapToIndex);
    setVisible(true);
    onOpen && onOpen();
  }, [onOpen, snapToIndex]);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
    setVisible(false);
    onClose && onClose();
  }, [onClose]);

  return (
    <BottomSheetContext.Provider
      value={{
        visible,
        bottomSheetRef,
        handleClose,
        handleOpen,
      }}
    >
      {props.children}
    </BottomSheetContext.Provider>
  );
};

export const BottomSheetPortal = ({
  snapPoints,
  handleComponent: DragIndicator,
  backdropComponent: BackDrop,
  ...props
}: Partial<IBottomSheetProps> & {
  defaultIsOpen?: boolean;
  snapToIndex?: number;
  snapPoints: string[];
}) => {
  const { bottomSheetRef, handleClose } = useContext(BottomSheetContext);
  const { theme } = useTheme();

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === 0 || index === -1) {
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <GorhomBottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      backdropComponent={BackDrop}
      onChange={handleSheetChanges}
      handleComponent={DragIndicator}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: theme === 'light' ? '#e5e5e5' : 'rgba(39,39,42)',
      }}
      {...props}
    >
      {props.children}
    </GorhomBottomSheet>
  );
};

export const BottomSheetTrigger = ({
  className,
  ...props
}: PressableProps & { className?: string }) => {
  const { handleOpen } = useContext(BottomSheetContext);
  return (
    <Pressable
      onPress={(e) => {
        props.onPress && props.onPress(e);
        handleOpen();
      }}
      {...props}
      className={bottomSheetTriggerStyle({
        className: className,
      })}
    >
      {props.children}
    </Pressable>
  );
};
type IBottomSheetBackdrop = React.ComponentProps<typeof GorhomBottomSheetBackdrop>;

export const BottomSheetBackdrop = ({
  disappearsOnIndex = -1,
  appearsOnIndex = 1,
  className,
  ...props
}: Partial<IBottomSheetBackdrop> & { className?: string }) => {
  return (
    <GorhomBottomSheetBackdrop
      // @ts-ignore
      className={bottomSheetBackdropStyle({
        className: className,
      })}
      disappearsOnIndex={disappearsOnIndex}
      appearsOnIndex={appearsOnIndex}
      {...props}
    />
  );
};

cssInterop(GorhomBottomSheetBackdrop, { className: 'style' });

type IBottomSheetDragIndicator = React.ComponentProps<typeof BottomSheetHandle>;

export const BottomSheetDragIndicator = ({
  children,
  className,
  ...props
}: Partial<IBottomSheetDragIndicator> & { className?: string }) => {
  const { theme } = useTheme();

  return (
    <BottomSheetHandle
      {...props}
      // @ts-ignore
      className={bottomSheetIndicatorStyle({
        className: className,
      })}
      indicatorStyle={{ backgroundColor: theme === 'light' ? 'black' : 'white' }}
    >
      {children}
    </BottomSheetHandle>
  );
};

cssInterop(BottomSheetHandle, { className: 'style' });

type IBottomSheetContent = React.ComponentProps<typeof GorhomBottomSheetView>;

export const BottomSheetContent = ({ ...props }: IBottomSheetContent) => {
  const { handleClose, visible } = useContext(BottomSheetContext);
  const keyDownHandlers = useMemo(() => {
    return Platform.OS === 'web'
      ? {
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === 'Escape') {
              e.preventDefault();
              handleClose();
              return;
            }
          },
        }
      : {};
  }, [handleClose]);

  if (Platform.OS === 'web')
    return (
      <GorhomBottomSheetView
        {...props}
        // @ts-ignore
        {...keyDownHandlers}
        className={bottomSheetContentStyle({
          className: props.className,
        })}
      >
        {visible && (
          <FocusScope contain={visible} autoFocus={true} restoreFocus={true}>
            {props.children}
          </FocusScope>
        )}
      </GorhomBottomSheetView>
    );

  return (
    <GorhomBottomSheetView
      {...props}
      // @ts-ignore
      {...keyDownHandlers}
      className={bottomSheetContentStyle({
        className: props.className,
      })}
    >
      {props.children}
    </GorhomBottomSheetView>
  );
};

cssInterop(GorhomBottomSheetView, { className: 'style' });

export const BottomSheetItem = ({
  children,
  className,
  closeOnSelect = true,
  ...props
}: PressableProps & {
  closeOnSelect?: boolean;
}) => {
  const { handleClose } = useContext(BottomSheetContext);
  return (
    <Pressable
      {...props}
      className={bottomSheetItemStyle({
        className: className,
      })}
      onPress={(e) => {
        if (closeOnSelect) {
          handleClose();
        }
        props.onPress && props.onPress(e);
      }}
      role="button"
    >
      {children}
    </Pressable>
  );
};

export const BottomSheetItemText = ({ ...props }: TextProps) => {
  return <Text {...props} />;
};

export const BottomSheetScrollView = GorhomBottomSheetScrollView;
export const BottomSheetFlatList = GorhomBottomSheetFlatList;
export const BottomSheetSectionList = GorhomBottomSheetSectionList;

cssInterop(GorhomBottomSheetInput, { className: 'style' });
cssInterop(GorhomBottomSheetScrollView, { className: 'style' });
cssInterop(GorhomBottomSheetFlatList, { className: 'style' });
cssInterop(GorhomBottomSheetSectionList, { className: 'style' });


type IBottomSheetInputProps = React.ComponentProps<typeof GorhomBottomSheetInput> &
  VariantProps<typeof inputStyle> & {
    className?: string;
    leftIcon?: React.ElementType;
    rightIcon?: React.ElementType;
  };

  export const BottomSheetInput = React.forwardRef<
  React.ComponentRef<typeof GorhomBottomSheetInput>,
  IBottomSheetInputProps
>(function BottomSheetInput({ className, variant = 'outline', size = 'md', leftIcon, rightIcon, ...props }, ref) {

  return (
    <View
      className={inputStyle({ variant, size, class: className })}
    >
      {leftIcon && (
        <InputSlot>
          <InputIcon as={leftIcon} />
        </InputSlot>
      )}
      <GorhomBottomSheetInput
        ref={ref}
        {...props}
        className={inputFieldStyle({
          parentVariants: {
            variant,
            size,
          },
        })}
      />
      {rightIcon && (
        <InputSlot>
          <InputIcon as={rightIcon} />
        </InputSlot>
      )}
    </View>
  );
});
