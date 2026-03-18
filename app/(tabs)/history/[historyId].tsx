import { Page } from '@/components/layout/page';
import { TintedBadge } from '@/components/shared/badge/TintedBadge';
import { DefaultCard } from '@/components/shared/cards/DefaultCard';
import { SessionHeroCard } from '@/components/shared/cards/SessionHeroCard';
import { TintedIcon } from '@/components/shared/icon/TintedIcon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useSelectedSession } from '@/hooks/store/session/useSession';
import { END_REASON_BADGE } from '@/types/history/Session.type';
import { formatDateToDMY } from '@/utils/Date.utils';
import { formatTimeToHM } from '@/utils/formatTime';
import { Zap } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

const SessionDetailPage = () => {
  const selectedSession = useSelectedSession();

  if (!selectedSession) return;

  const bagdeEndReason = END_REASON_BADGE[selectedSession.endReason];

  return (
    <Page.Scroll className="gap-5">
      <DefaultCard>
        <View className="flex-row items-center gap-3">
          <TintedIcon icon={Zap} color="green" size="lg" />

          <VStack className="flex-1 gap-0">
            <Text
              size="md"
              className="font-semibold text-neutral-900 dark:text-neutral-100"
              numberOfLines={1}
            >
              {selectedSession.location.address}
            </Text>
            <Text size="sm" className="text-neutral-400">
              {formatDateToDMY(selectedSession.date)} · {formatTimeToHM(selectedSession.date)}
            </Text>
            <Text size="sm" className="text-neutral-400">
              {selectedSession.location.city}
            </Text>
          </VStack>

          <TintedBadge
            label={bagdeEndReason.label}
            icon={bagdeEndReason.icon}
            color={bagdeEndReason.color}
            size="xs"
          />
        </View>
      </DefaultCard>

      <SessionHeroCard data={selectedSession} />
    </Page.Scroll>
  );
};

export default SessionDetailPage;
