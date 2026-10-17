import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BookingDraftProvider } from '../context/BookingDraftContext';

export default function RootLayout() {
  return (
    <BookingDraftProvider>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#F5F8F8' },
          }}
        />
      </SafeAreaProvider>
    </BookingDraftProvider>
  );
}
