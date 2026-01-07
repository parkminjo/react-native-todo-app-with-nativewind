import { STORAGES } from '@/constants/storage';
import { Todos } from '@/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'expo-checkbox';
import { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import './global.css';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [isWorking, setIsWorking] = useState(true);
  const [todos, setTodos] = useState<Todos>({});

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

    const newTodos = { ...todos, [Date.now()]: newTodo };

    setTodos(newTodos);
    saveTodos(newTodos);

    setInputValue('');
  };

  const deleteTodo = (key: string) => {
    const newTodos = { ...todos };
    delete newTodos[key];

    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const updatedTodoCompletion = (key: string, todos: Todos) => {
    const newTodos = { ...todos };
    newTodos[key].isCompleted = !newTodos[key].isCompleted;

    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const saveTodos = async (todos: Todos) => {
    await AsyncStorage.setItem(STORAGES.TODOS, JSON.stringify(todos));
  };

  const loadTodosAtStorage = async () => {
    try {
      const response = await AsyncStorage.getItem(STORAGES.TODOS);
      if (!response) throw new Error('no todos');

      const data = JSON.parse(response);

      setTodos(data);
    } catch (error) {
      console.error(error);
    }
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

  const onPressCheckBox = (key: string, todos: Todos) => {
    updatedTodoCompletion(key, todos);
  };

  useEffect(() => {
    loadTodosAtStorage();
  }, []);

  return (
    <View className="flex-1 gap-4 bg-black px-5 py-20">
      <StatusBar />
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
