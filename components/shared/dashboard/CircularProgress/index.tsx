import { Text } from '@/components/ui/text';
import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type ColorConfig = {
  /** Cor do gradiente inicial */
  startColor: string;
  /** Cor do gradiente final */
  endColor: string;
  /** Cor do glow/sombra */
  glowColor: string;
};

interface CircularProgressProps {
  /** Valor atual do progresso */
  value: number;
  /** Valor máximo (padrão: 100) */
  maxValue?: number;
  /** Título principal exibido no centro */
  title?: string;
  /** Subtítulo exibido abaixo do título */
  subtitle?: string;
  /** Sufixo do valor (%, km, kW, etc) */
  suffix?: string;
  /** Tamanho do círculo em pixels */
  size?: number;
  /** Largura da linha de progresso */
  strokeWidth?: number;
  /** Se deve animar com efeito de pulso */
  animated?: boolean;
  /** Configuração de cores (ou use preset) */
  colorConfig?: ColorConfig;
  /** Preset de cor rápido */
  colorPreset?: 'green' | 'blue' | 'orange' | 'red' | 'purple' | 'cyan';
  /** Mostrar badge de status */
  showBadge?: boolean;
  /** Texto do badge */
  badgeText?: string;
  /** Classe CSS adicional para o container */
  className?: string;
  /** Estilo adicional para o container */
  style?: ViewStyle;
  /** Duração da animação em ms */
  animationDuration?: number;
  /** Formatar o valor exibido */
  formatValue?: (value: number) => string;
}

const COLOR_PRESETS: Record<string, ColorConfig> = {
  green: {
    startColor: '#10B981',
    endColor: '#059669',
    glowColor: '#10B981',
  },
  blue: {
    startColor: '#3B82F6',
    endColor: '#2563EB',
    glowColor: '#3B82F6',
  },
  orange: {
    startColor: '#F59E0B',
    endColor: '#D97706',
    glowColor: '#F59E0B',
  },
  red: {
    startColor: '#EF4444',
    endColor: '#DC2626',
    glowColor: '#EF4444',
  },
  purple: {
    startColor: '#A855F7',
    endColor: '#9333EA',
    glowColor: '#A855F7',
  },
  cyan: {
    startColor: '#06B6D4',
    endColor: '#0891B2',
    glowColor: '#06B6D4',
  },
};

/**
 * Componente de progresso circular profissional e reutilizável
 *
 * @example
 * // Uso básico - bateria
 * <CircularProgress
 *   value={75}
 *   title="Bateria"
 *   suffix="%"
 *   colorPreset="green"
 *   showBadge
 *   badgeText="⚡ Carregando"
 * />
 *
 * @example
 * // Uso avançado - potência
 * <CircularProgress
 *   value={7.4}
 *   maxValue={22}
 *   title="Potência"
 *   suffix=" kW"
 *   colorPreset="blue"
 *   formatValue={(val) => val.toFixed(1)}
 * />
 */
export const CircularProgress = ({
  value,
  maxValue = 100,
  title,
  subtitle,
  suffix = '%',
  size = 280,
  strokeWidth = 20,
  animated = true,
  colorConfig,
  colorPreset = 'green',
  showBadge = false,
  badgeText,
  className,
  style,
  animationDuration = 1500,
  formatValue,
}: CircularProgressProps) => {
  const progress = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Calcula porcentagem
  const percentage = Math.min((value / maxValue) * 100, 100);

  // Usa configuração de cor customizada ou preset
  const colors = colorConfig || COLOR_PRESETS[colorPreset] || COLOR_PRESETS.green;

  // Formata o valor exibido
  const displayValue = formatValue
    ? formatValue(value)
    : typeof value === 'number'
      ? Math.round(value)
      : value;

  useEffect(() => {
    progress.value = withTiming(percentage, {
      duration: animationDuration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    if (animated) {
      pulseScale.value = withRepeat(
        withSequence(withTiming(1.05, { duration: 1000 }), withTiming(1, { duration: 1000 })),
        -1,
        false
      );
    } else {
      pulseScale.value = withTiming(1, { duration: 300 });
    }
  }, [percentage, animated, animationDuration]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (circumference * progress.value) / 100;
    return {
      strokeDashoffset,
    };
  });

  const animatedPulseProps = useAnimatedProps(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <View className={className} style={style}>
      <View className="relative items-center justify-center" style={{ width: size, height: size }}>
        {/* Glow effect background */}
        <View
          className="absolute items-center justify-center"
          style={{ width: size + 20, height: size + 20 }}
        >
          <View
            className="h-full w-full rounded-full opacity-15"
            style={{
              backgroundColor: colors.glowColor,
              shadowColor: colors.glowColor,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.6,
              shadowRadius: 30,
              elevation: 10,
            }}
          />
        </View>

        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id={`progressGrad-${colorPreset}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={colors.startColor} stopOpacity="1" />
              <Stop offset="100%" stopColor={colors.endColor} stopOpacity="1" />
            </LinearGradient>
          </Defs>

          {/* Círculo de fundo */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(229, 231, 235, 0.3)"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Círculo de progresso */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#progressGrad-${colorPreset})`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
            opacity={0.9}
          />

          {/* Círculo externo glow */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius + 4}
            stroke={colors.glowColor}
            strokeWidth={2}
            fill="none"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
            opacity={0.3}
          />
        </Svg>

        {/* Conteúdo central */}
        <Animated.View className="absolute items-center" style={animatedPulseProps}>
          {/* Valor principal */}
          <Text className="text-6xl font-extrabold tracking-tighter text-neutral-900 dark:text-neutral-100">
            {displayValue}
            {suffix}
          </Text>

          {/* Divider decorativo */}
          {title && (
            <View
              className="my-2 h-0.5 w-10 rounded-full"
              style={{ backgroundColor: colors.startColor }}
            />
          )}

          {/* Título */}
          {title && (
            <Text className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {title}
            </Text>
          )}

          {/* Subtítulo */}
          {subtitle && (
            <Text className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">{subtitle}</Text>
          )}

          {/* Badge de status */}
          {showBadge && badgeText && (
            <View
              className="mt-3 rounded-xl px-3 py-1"
              style={{ backgroundColor: colors.startColor }}
            >
              <Text className="text-xs font-bold text-white">{badgeText}</Text>
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
};
