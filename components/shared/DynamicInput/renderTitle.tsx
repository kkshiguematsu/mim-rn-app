import { Heading } from '@/components/ui/heading';
import clsx from 'clsx';

export const renderTitle = (title: string, className?: string) => {
  return (
    <Heading key={`title-${title}`} className={clsx([className, 'my-2'])} size="lg">
      {title}
    </Heading>
  );
};
