import { DefaultCard } from '@/components/shared/cards/DefaultCard';

interface Props {
  children: React.ReactNode;
}

export const FieldGroup = ({ children }: Props) => {
  return (
    <DefaultCard
      padding="none"
      className="overflow-hidden rounded-2xl border border-neutral-200 bg-white"
    >
      {children}
    </DefaultCard>
  );
};
