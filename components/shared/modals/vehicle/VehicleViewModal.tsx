import {
  CONNECTOR_OPTIONS,
  ConnectorType,
  INITIAL_FORM_DATA,
  VEHICLE_COLORS,
  VehicleFormData,
} from '@/types/vehicle/vehicle.type';
import BottomSheet from '@gorhom/bottom-sheet';
import { Car, Palette, Tag, X } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

// ─── Constants ────────────────────────────────────────────────────────────────

const CONNECTOR_EMOJI: Record<ConnectorType, string> = {
  CCS2: '⚡',
  CHAdeMO: '🔌',
  'Type 2': '🔋',
  Tesla: '🚗',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface FieldGroupProps {
  children: React.ReactNode;
}

function FieldGroup({ children }: FieldGroupProps) {
  return (
    <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      {children}
    </View>
  );
}

interface FieldRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  isLast?: boolean;
}

function FieldRow({ icon, label, children, isLast = false }: FieldRowProps) {
  return (
    <>
      <View className="min-h-[50px] flex-row items-center gap-3 px-3.5">
        <View className="h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">{icon}</View>
        <Text className="w-20 flex-shrink-0 text-[13px] font-medium text-neutral-500">{label}</Text>
        <View className="flex-1">{children}</View>
      </View>
      {!isLast && <View className="ml-[60px] h-px bg-neutral-100" />}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface SectionLabelProps {
  children: string;
}

function SectionLabel({ children }: SectionLabelProps) {
  return (
    <Text className="mb-2.5 px-1 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
      {children}
    </Text>
  );
}

// ─── AddVehicleSheet ──────────────────────────────────────────────────────────

interface Props {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onSubmit: (data: VehicleFormData) => void;
}

export default function CreateVehicleScreen({ bottomSheetRef, onSubmit }: Props) {
  const [form, setForm] = useState<VehicleFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof VehicleFormData, string>>>({});

  const snapPoints = ['85%'];

  const update = useCallback(
    <K extends keyof VehicleFormData>(key: K, value: VehicleFormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    []
  );

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.brand) next.brand = 'Obrigatório';
    if (!form.model) next.model = 'Obrigatório';
    if (!form.plate) next.plate = 'Obrigatório';
    if (!form.connector) next.connector = 'Selecione um conector';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
    setForm(INITIAL_FORM_DATA);
    setErrors({});
    bottomSheetRef.current?.close();
  };

  const handleClose = () => bottomSheetRef.current?.close();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: '#f5f5f3', borderRadius: 24 }}
      handleIndicatorStyle={{ backgroundColor: '#d8d8d5', width: 36 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between border-b border-neutral-200 px-5 py-4">
          <Text className="text-[17px] font-bold text-neutral-900" style={{ letterSpacing: -0.4 }}>
            Novo veículo
          </Text>
          <Pressable
            onPress={handleClose}
            className="h-[30px] w-[30px] items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 active:bg-neutral-200"
          >
            <X size={12} color="#a8a8a4" />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 48 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Identification ── */}
          <View>
            <SectionLabel>Identificação</SectionLabel>
            <FieldGroup>
              {/* Brand */}
              <FieldRow
                icon={
                  <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
                    <Car size={14} color="#1a7a4a" />
                  </View>
                }
                label="Marca"
              >
                <TextInput
                  value={form.brand}
                  onChangeText={(v) => update('brand', v)}
                  placeholder="ex: Tesla"
                  placeholderTextColor="#a8a8a4"
                  className="py-3.5 text-right text-[14px] text-neutral-900"
                  style={{ fontFamily: 'Geist' }}
                  returnKeyType="next"
                />
              </FieldRow>

              {/* Model */}
              <FieldRow
                icon={
                  <View className="h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                    <Car size={14} color="#3b82f6" />
                  </View>
                }
                label="Modelo"
              >
                <TextInput
                  value={form.model}
                  onChangeText={(v) => update('model', v)}
                  placeholder="ex: Model 3"
                  placeholderTextColor="#a8a8a4"
                  className="py-3.5 text-right text-[14px] text-neutral-900"
                  style={{ fontFamily: 'Geist' }}
                  returnKeyType="next"
                />
              </FieldRow>

              {/* Plate */}
              <FieldRow
                icon={
                  <View className="h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
                    <Tag size={14} color="#d97706" />
                  </View>
                }
                label="Placa"
                isLast
              >
                <TextInput
                  value={form.plate}
                  onChangeText={(v) => update('plate', v.toUpperCase())}
                  placeholder="ABC-1D23"
                  placeholderTextColor="#a8a8a4"
                  autoCapitalize="characters"
                  maxLength={8}
                  className="py-3.5 text-right text-[14px] text-neutral-900"
                  style={{ fontFamily: 'Geist', letterSpacing: 1 }}
                  returnKeyType="next"
                />
              </FieldRow>
            </FieldGroup>

            {(errors.brand || errors.model || errors.plate) && (
              <Text className="mt-1.5 px-1 text-[11.5px] text-red-500">
                Marca, modelo e placa são obrigatórios
              </Text>
            )}
          </View>

          {/* ── Specs ── */}
          <View>
            <SectionLabel>Especificações</SectionLabel>
            <FieldGroup>
              <FieldRow
                icon={
                  <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
                    <Car size={14} color="#1a7a4a" />
                  </View>
                }
                label="Bateria"
              >
                <View className="flex-row items-center justify-end gap-1">
                  <TextInput
                    value={form.batteryCapacityKwh}
                    onChangeText={(v) => update('batteryCapacityKwh', v)}
                    placeholder="0"
                    placeholderTextColor="#a8a8a4"
                    keyboardType="numeric"
                    maxLength={3}
                    className="py-3.5 text-right text-[14px] text-neutral-900"
                    style={{ fontFamily: 'Geist', minWidth: 40 }}
                  />
                  <Text className="text-[12px] text-neutral-400">kWh</Text>
                </View>
              </FieldRow>

              <FieldRow
                icon={
                  <View className="h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
                    <Car size={14} color="#d97706" />
                  </View>
                }
                label="Pot. máx."
                isLast
              >
                <View className="flex-row items-center justify-end gap-1">
                  <TextInput
                    value={form.maxPowerKw}
                    onChangeText={(v) => update('maxPowerKw', v)}
                    placeholder="0"
                    placeholderTextColor="#a8a8a4"
                    keyboardType="numeric"
                    maxLength={3}
                    className="py-3.5 text-right text-[14px] text-neutral-900"
                    style={{ fontFamily: 'Geist', minWidth: 40 }}
                  />
                  <Text className="text-[12px] text-neutral-400">kW</Text>
                </View>
              </FieldRow>
            </FieldGroup>
          </View>

          {/* ── Connector ── */}
          <View>
            <SectionLabel>Tipo de conector</SectionLabel>
            <View className="flex-row gap-2">
              {CONNECTOR_OPTIONS.map((type) => {
                const selected = form.connector === type;
                return (
                  <Pressable
                    key={type}
                    onPress={() => update('connector', type)}
                    className="flex-1 items-center rounded-xl border py-2.5"
                    style={{
                      backgroundColor: selected ? '#f0faf4' : '#ffffff',
                      borderColor: selected ? '#b8e8cc' : '#e8e8e6',
                      borderWidth: selected ? 1.5 : 1,
                    }}
                  >
                    <Text className="mb-1 text-base">{CONNECTOR_EMOJI[type]}</Text>
                    <Text
                      className="text-[10.5px] font-semibold"
                      style={{ color: selected ? '#1a7a4a' : '#6b6b68' }}
                    >
                      {type}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {errors.connector && (
              <Text className="mt-1.5 px-1 text-[11.5px] text-red-500">{errors.connector}</Text>
            )}
          </View>

          {/* ── Color ── */}
          <View>
            <SectionLabel>Cor do veículo</SectionLabel>
            <View className="rounded-2xl border border-neutral-200 bg-white px-4 py-3.5">
              <View className="flex-row flex-wrap gap-3">
                {VEHICLE_COLORS.map((c) => {
                  const selected = form.color === c.id;
                  const isWhite = c.id === 'white';
                  return (
                    <Pressable
                      key={c.id}
                      onPress={() => update('color', c.id)}
                      className="h-7 w-7 rounded-full"
                      style={{
                        backgroundColor: c.hex,
                        borderWidth: selected ? 2 : isWhite ? 1.5 : 0,
                        borderColor: selected ? '#1a7a4a' : '#e8e8e6',
                        shadowColor: selected ? '#1a7a4a' : 'transparent',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: selected ? 0.35 : 0,
                        shadowRadius: selected ? 4 : 0,
                      }}
                    />
                  );
                })}
              </View>
            </View>
          </View>

          {/* ── Nickname ── */}
          <View>
            <SectionLabel>Apelido (opcional)</SectionLabel>
            <FieldGroup>
              <FieldRow
                icon={
                  <View className="h-8 w-8 items-center justify-center rounded-lg bg-pink-50">
                    <Palette size={14} color="#db2777" />
                  </View>
                }
                label="Apelido"
                isLast
              >
                <TextInput
                  value={form.nickname}
                  onChangeText={(v) => update('nickname', v)}
                  placeholder='ex: "Meu Tesla"'
                  placeholderTextColor="#a8a8a4"
                  className="py-3.5 text-right text-[14px] text-neutral-900"
                  style={{ fontFamily: 'Geist' }}
                  returnKeyType="done"
                />
              </FieldRow>
            </FieldGroup>
          </View>

          {/* ── Submit ── */}
          <Pressable
            onPress={handleSubmit}
            className="w-full flex-row items-center justify-center gap-2 rounded-[14px] py-[15px] active:opacity-80"
            style={{
              backgroundColor: '#1a7a4a',
              shadowColor: '#1a7a4a',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.28,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text className="text-[15px] font-semibold text-white" style={{ letterSpacing: -0.2 }}>
              Cadastrar veículo
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
}
