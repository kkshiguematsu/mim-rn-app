import { Stack } from 'expo-router';

export default function SupportLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="newTicket"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tickets"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
