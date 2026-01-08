import { type ErrorBoundaryProps } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const ErrorBoundary = ({ error, retry }: ErrorBoundaryProps) => {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-black ">
      <View className="items-center gap-2">
        <Text className="text-2xl font-bold text-white">Sorry, something went wrong.</Text>
        <Text className="text-white">Error: {error.message}</Text>
      </View>
      <TouchableOpacity className="rounded-lg bg-blue-500 px-4 py-3" onPress={retry}>
        <Text className="font-semibold text-white">Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorBoundary;
