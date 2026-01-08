import { Todo } from '@/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Checkbox } from 'expo-checkbox';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

interface TodoItemProps {
  id: string;
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ id, todo, onToggle, onDelete }: TodoItemProps) => {
  const handleToggle = () => {
    onToggle(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <View className="flex-row items-center justify-between rounded-lg bg-gray-800 px-4 py-4">
      <View className="flex-row items-center gap-3">
        <Checkbox value={todo.isCompleted} onValueChange={handleToggle} />
        <Text className="font-medium text-white">{todo.content}</Text>
      </View>
      <View className="flex-row items-center gap-3">
        <Link href={`/modal?id=${id}`}>
          <FontAwesome name="pencil" size={18} color="gray" />
        </Link>
        <TouchableOpacity onPress={handleDelete}>
          <FontAwesome name="trash-o" size={18} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
