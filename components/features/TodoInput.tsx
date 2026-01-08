import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface TodoInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export const TodoInput = ({ value, onChangeText, onSubmit }: TodoInputProps) => {
  const handleSubmitEditing = () => {
    onSubmit();
  };

  const handlePressAdd = () => {
    onSubmit();
  };

  return (
    <View className="flex-row gap-2">
      <TextInput
        className="flex-[7] rounded-full bg-white px-6 py-4"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmitEditing}
        placeholder="할 일을 입력하세요"
        placeholderTextColor="#9CA3AF"
      />
      <TouchableOpacity
        className="flex-[2] items-center justify-center rounded-full bg-blue-500"
        onPress={handlePressAdd}>
        <Text className="text-lg font-semibold text-white">ADD</Text>
      </TouchableOpacity>
    </View>
  );
};
