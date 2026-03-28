import { FieldGroup } from '@/components/form/formContainer';
import { FieldRow } from '@/components/form/formContainer/formRow';
import { Page } from '@/components/layout/page';
import { Section } from '@/components/section/Section';
import { Button, ButtonText } from '@/components/ui/button';
import {
  CONNECTOR_OPTIONS,
  INITIAL_FORM_DATA,
  VEHICLE_COLORS,
  VehicleFormData,
} from '@/types/vehicle/vehicle.type';
import { BatteryCharging, Car, Palette, Tag, Zap } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function CreateVehiclePage() {
  const [form, setForm] = useState<VehicleFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof VehicleFormData, string>>>({});

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
    // onSubmit(form);
    setForm(INITIAL_FORM_DATA);
    setErrors({});
  };

  const handleClose = () => {};

  return (
    <Page.Keyboard contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 48 }}>
      <Section title="Identificação">
        <FieldGroup>
          <FieldRow
            icon={{
              icon: Car,
              color: 'blue',
            }}
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

          <FieldRow
            icon={{
              icon: Car,
              color: 'amber',
            }}
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

          <FieldRow
            icon={{
              icon: Tag,
              color: 'gray',
            }}
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
      </Section>

      <Section title="Especificações">
        <FieldGroup>
          <FieldRow
            icon={{
              icon: BatteryCharging,
              color: 'green',
            }}
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
            icon={{
              icon: Zap,
              color: 'lime',
            }}
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
      </Section>

      <Section title="Tipo de conector">
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
      </Section>

      <Section title="Cor do veículo">
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
      </Section>

      <Section title="Apelido (opcional)">
        <FieldGroup>
          <FieldRow
            icon={{
              icon: Palette,
              color: 'pink',
            }}
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
      </Section>

      <Button size="xl" className="h-14 rounded-2xl">
        <ButtonText>Cadastrar veículo</ButtonText>
      </Button>
    </Page.Keyboard>
  );
}
