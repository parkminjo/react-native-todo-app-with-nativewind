import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen
        name="modal"
        options={{
          title: 'Edit',
          presentation: 'modal',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
        }}
      />
    </Stack>
  );
};

export default Layout;
