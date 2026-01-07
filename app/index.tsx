import { Todo } from '@/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import './global.css';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [isWorking, setIsWorking] = useState(true);
  const [todos, setTodos] = useState<Record<string, Todo>>({});

  const onPressTab = () => {
    setIsWorking((prev) => !prev);
  };

  const onChangeInputValue = (text: string) => {
    setInputValue(text);
  };

  const addTodo = (text: string, isWorking: boolean) => {
    const newTodo = {
      content: text,
      isWorking,
      isCompleted: false,
    };

    setTodos((prev) => ({ ...prev, [Date.now()]: newTodo }));
    setInputValue('');
  };

  const deleteTodo = (key: string) => {
    const newTodo = { ...todos };
    delete newTodo[key];

    setTodos(newTodo);
  };

  const updatedTodoCompletion = (key: string, todos: Record<string, Todo>) => {
    const newTodo = { ...todos };
    newTodo[key].isCompleted = !newTodo[key].isCompleted;

    setTodos(newTodo);
  };

  const onSubmitTodo = () => {
    addTodo(inputValue, isWorking);
  };

  const onPressAddButton = () => {
    addTodo(inputValue, isWorking);
  };

  const onPressDeleteButton = (key: string) => {
    deleteTodo(key);
  };

  const onPressCheckBox = (key: string, todos: Record<string, Todo>) => {
    updatedTodoCompletion(key, todos);
  };

  return (
    <View className="flex-1 gap-4 bg-black p-5">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={onPressTab}>
          <Text className={`text-3xl font-semibold ${isWorking ? 'text-white' : 'text-gray-500'}`}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTab}>
          <Text className={`text-3xl font-semibold ${isWorking ? 'text-gray-700' : 'text-white'}`}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-2">
        <TextInput
          className="
        flex-[7] rounded-full bg-white px-6 py-4"
          value={inputValue}
          onChangeText={onChangeInputValue}
          onSubmitEditing={onSubmitTodo}
        />
        <TouchableOpacity
          className="flex-[2] items-center justify-center rounded-full bg-blue-500"
          onPress={onPressAddButton}>
          <Text className="text-lg font-semibold text-white">ADD</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerClassName="gap-3">
        {Object.keys(todos).length !== 0 &&
          Object.keys(todos).map((key) => (
            <View
              key={key}
              className="flex-row items-center justify-between rounded-lg bg-gray-800 px-4 py-3">
              <View className="flex-row items-center gap-3">
                <Checkbox
                  value={todos[key].isCompleted}
                  onValueChange={() => onPressCheckBox(key, todos)}
                />
                <Text className="font-medium text-white">{todos[key].content}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <TouchableOpacity>
                  <FontAwesome name="pencil" size={18} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressDeleteButton(key)}>
                  <FontAwesome name="trash-o" size={18} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default App;
