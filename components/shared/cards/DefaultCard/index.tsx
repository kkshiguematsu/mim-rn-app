import { Card } from '@/components/ui/card';
import { cardStyles } from '../StatusCard/styles';
interface DefaultCardProps {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
}

export const DefaultCard = ({
  children,
  size = 'md',
  padding = 'md',
  variant = 'default',
  className,
}: DefaultCardProps) => {
  return (
    <Card className={cardStyles({ size, variant, padding, class: className })}>{children}</Card>
  );
};
