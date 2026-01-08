import { Text, TouchableOpacity, View } from 'react-native';

interface TabSwitcherProps {
  isWorking: boolean;
  onTabChange: (isWorking: boolean) => void;
}

export const TabSwitcher = ({ isWorking, onTabChange }: TabSwitcherProps) => {
  const handlePressWork = () => {
    onTabChange(true);
  };

  const handlePressTravel = () => {
    onTabChange(false);
  };

  return (
    <View className="flex-row items-center justify-between">
      <TouchableOpacity onPress={handlePressWork}>
        <Text className={`text-3xl font-semibold ${isWorking ? 'text-white' : 'text-gray-500'}`}>
          Work
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressTravel}>
        <Text className={`text-3xl font-semibold ${isWorking ? 'text-gray-700' : 'text-white'}`}>
          Travel
        </Text>
      </TouchableOpacity>
    </View>
  );
};
