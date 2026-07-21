import { Session } from '@/types/history/session.type';

export interface GradientCardProps {
  session: Session;
  gradient: GradientTypes;

  icon?: IconCardType;
}

interface IconCardType {
  element: React.ElementType;
  gradient: GradientTypes;
  className?: string;
}

interface GradientTypes {
  color?:
    | 'blue'
    | 'sky'
    | 'ocean'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'purple'
    | 'violet'
    | 'fuchsia'
    | 'pink'
    | 'rose'
    | 'amber'
    | 'orange'
    | 'yellow'
    | 'red'
    | 'slate'
    | 'gray'
    | 'sunset'
    | 'oceanic'
    | 'neon'
    | 'fire'
    | 'nature';
  colors?: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
}
