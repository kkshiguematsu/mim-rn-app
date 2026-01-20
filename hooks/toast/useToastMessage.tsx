import { HStack } from '@/components/ui/hstack';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { useTheme } from '@/context/themeContext';
import { BadgeAlert, BadgeCheck, BadgeInfo, BadgeX } from 'lucide-react-native';

interface toastMessageProps {
  action?: 'error' | 'warning' | 'success' | 'info' | 'muted' | undefined;
  variant?: 'solid' | 'outline' | undefined;
  title?: string;
  description?: string;
}

export const useToastMessage = () => {
  const toast = useToast();
  const { theme } = useTheme();
  const isDarkColor = theme === 'dark' ? '#000' : '#fff';

  const renderIcon = (action: 'error' | 'warning' | 'success' | 'info' | 'muted' | undefined) => {
    switch (action) {
      case 'error':
        return <BadgeX stroke={isDarkColor} />;
      case 'warning':
        return <BadgeAlert stroke={isDarkColor} />;
      case 'success':
        return <BadgeCheck stroke={isDarkColor} />;
      case 'info':
        return <BadgeInfo stroke={isDarkColor} />;
      case 'muted':
        return;
    }
  };

  const showToast = (props: toastMessageProps) => {
    const { title, description, action, variant } = props;

    toast.show({
      id: Math.random().toString(),
      placement: 'top',
      duration: 4000,
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id;
        return (
          <Toast nativeID={uniqueToastId} action={action} variant={variant}>
            {title && (
              <HStack space="sm">
                {renderIcon(action)}
                <ToastTitle>{title}</ToastTitle>
              </HStack>
            )}
            {description && <ToastDescription>{description}</ToastDescription>}
          </Toast>
        );
      },
    });
  };

  return { toast, showToast };
};
