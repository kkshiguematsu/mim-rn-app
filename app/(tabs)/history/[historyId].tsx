import { HistoryResponse } from '@/types/history/historyResponse';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Battery,
  Car,
  ChevronRight,
  Clock,
  Download,
  Gauge,
  MapPin,
  Share2,
  Wallet,
  Zap,
} from 'lucide-react-native';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const HistoryDetailsCard = () => {
  const session: HistoryResponse = {
    date: Date.now() - 86400000,
    id: 'CHG-2024-001234',
    duration: 7200,
    max_power: '150 kW',
    batteryPercent: 85,
    kwh: 45.8,
    location: {
      city: 'Foz do Iguaçu',
      address: 'Av. das Cataratas, 1234 - Centro',
    },
    price: {
      value: 137.4,
      token: 'R$',
    },
    car: {
      model: 'Tesla Model 3',
      license_plate: 'ABC-1D23',
    },
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      // scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      // bounces
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10">
            <ArrowLeft color="white" size={20} />
          </TouchableOpacity>
          <View className="flex-row gap-2">
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10">
              <Share2 color="white" size={16} />
            </TouchableOpacity>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10">
              <Download color="white" size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Hero Card - Energy Display */}
        <LinearGradient
          colors={['#10b981', '#14b8a6', '#06b6d4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="mb-6 overflow-hidden rounded-3xl p-8"
        >
          <View className="mb-8 flex-row items-start justify-between">
            <View>
              <Text className="mb-1 text-sm font-medium text-white/80">Sessão Concluída</Text>
              <Text className="font-mono text-xs text-white/60">{session.id}</Text>
            </View>
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <Zap color="white" size={24} fill="white" />
            </View>
          </View>

          <View className="mb-6">
            <View className="mb-2 flex-row items-baseline gap-2">
              <Text className="text-6xl font-bold text-white">{session.kwh}</Text>
              <Text className="text-2xl font-semibold text-white/80">kWh</Text>
            </View>
            <Text className="text-sm text-white/70">Energia consumida</Text>
          </View>

          {/* Battery Progress */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Battery color="white" size={16} />
                <Text className="text-sm text-white/80">Nível de bateria</Text>
              </View>
              <Text className="text-lg font-bold text-white">{session.batteryPercent}%</Text>
            </View>
            <View className="h-3 overflow-hidden rounded-full bg-white/10">
              <View
                className="h-full rounded-full bg-white"
                style={{ width: `${session.batteryPercent}%` }}
              />
            </View>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View className="mb-6 flex-row gap-4">
          <View className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5">
            <Clock color="#60a5fa" size={20} className="mb-3" />
            <Text className="mb-1 text-3xl font-bold text-white">
              {formatDuration(session.duration)}
            </Text>
            <Text className="text-sm text-white/50">Duração</Text>
          </View>

          <View className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5">
            <Gauge color="#c084fc" size={20} className="mb-3" />
            <Text className="mb-1 text-3xl font-bold text-white">{session.max_power}</Text>
            <Text className="text-sm text-white/50">Potência máx</Text>
          </View>
        </View>

        {/* Price Card */}
        <LinearGradient
          colors={['rgba(251,191,36,0.1)', 'rgba(249,115,22,0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="mb-6 rounded-2xl border border-amber-500/20 p-6"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <LinearGradient
                colors={['#fbbf24', '#f97316']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="h-14 w-14 items-center justify-center rounded-2xl"
              >
                <Wallet color="white" size={28} />
              </LinearGradient>
              <View>
                <Text className="mb-1 text-sm text-white/60">Valor total</Text>
                <Text className="text-4xl font-bold text-white">
                  {session.price.token} {session.price.value.toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="mb-1 text-xs text-white/40">Por kWh</Text>
              <Text className="font-semibold text-white/80">
                {session.price.token} {(session.price.value / session.kwh).toFixed(2)}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Location Card */}
        <TouchableOpacity className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <View className="flex-row items-start gap-4">
            <LinearGradient
              colors={['#ef4444', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="h-12 w-12 items-center justify-center rounded-xl"
            >
              <MapPin color="white" size={24} />
            </LinearGradient>
            <View className="flex-1">
              <Text className="mb-1 text-xs font-medium text-white/50">LOCALIZAÇÃO</Text>
              <Text className="mb-1 text-lg font-semibold text-white">
                {session.location.address}
              </Text>
              <Text className="text-sm text-white/60">{session.location.city}</Text>
            </View>
            <ChevronRight color="rgba(255,255,255,0.3)" size={20} />
          </View>
        </TouchableOpacity>

        {/* Vehicle Card */}
        <View className="mb-3 rounded-2xl border border-white/10 bg-white/5 p-5">
          <View className="flex-row items-center gap-4">
            <View className="h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <Car color="rgba(255,255,255,0.8)" size={20} />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-xs text-white/50">VEÍCULO</Text>
              <Text className="font-semibold text-white">{session.car.model}</Text>
            </View>
            <View className="rounded-xl border border-white/10 bg-white/10 px-4 py-2">
              <Text className="font-mono text-sm font-bold text-white">
                {session.car.license_plate}
              </Text>
            </View>
          </View>
        </View>

        {/* Date & Time */}
        <View className="flex-row gap-3">
          <View className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
            <Text className="mb-2 text-xs text-white/40">DATA</Text>
            <Text className="font-semibold text-white">{formatDate(session.date)}</Text>
          </View>
          <View className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
            <Text className="mb-2 text-xs text-white/40">HORÁRIO</Text>
            <Text className="font-semibold text-white">{formatTime(session.date)}</Text>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default HistoryDetailsCard;
