import ErrorBoundary from '@/shared/components/error-boundary';
import { Stack } from 'expo-router';
import { Try } from 'expo-router/build/views/Try';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <Try catch={ErrorBoundary}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: '#000000',
            },
          }}>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              title: 'Home',
            }}
          />
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              title: 'Edit Todo',
            }}
          />
        </Stack>
        <Toast />
      </Try>
    </SafeAreaProvider>
  );
};

export default RootLayout;
