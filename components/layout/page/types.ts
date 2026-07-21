import { StyleProp, ViewStyle } from 'react-native';

export interface PageRootProps {
  children: React.ReactNode;
  className?: string;
  background?: 'normal' | 'primary';
  needsPadding?: boolean;
  needsSafeArea?: boolean;
  alignItems?: 'start' | 'center' | 'end';
  justifyContent?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly';
  needsBottomTabBar?: boolean;
}

export interface PageScrollProps extends PageRootProps {
  contentContainerStyle?: StyleProp<ViewStyle>;
  hasHeader?: boolean;
  stickyHeaderIndices?: number[];
}

export interface PageKeyboardProps extends PageRootProps {
  contentContainerStyle?: StyleProp<ViewStyle>;
  hasHeader?: boolean;
}

export interface PageHeaderProps {
  content?: React.ReactElement<{ style?: any }>;
  applyInsetsTo?: 'wrapper' | 'content' | 'none';
  classNameTitle?: string;
  classNameBackButton?: string;
  title?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  hasBackButton?: boolean;
  hasCloseButton?: boolean;
  needsPadding?: boolean;
}
