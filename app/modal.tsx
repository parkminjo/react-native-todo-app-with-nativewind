import { STORAGES } from '@/constants/storage';
import { Todos } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const Modal = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todos>({});

  const loadTodo = async () => {
    try {
      const response = await AsyncStorage.getItem(STORAGES.TODOS);
      if (!response) return;

      const data: Todos = JSON.parse(response);
      setTodos(data);

      if (id && data[id]) {
        setInputValue(data[id].content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async () => {
    if (!id || inputValue.trim() === '') return;

    const newTodos = { ...todos };
    newTodos[id].content = inputValue.trim();

    await AsyncStorage.setItem(STORAGES.TODOS, JSON.stringify(newTodos));
    router.back();
  };

  const onChangeInputValue = (text: string) => {
    setInputValue(text);
  };

  useEffect(() => {
    loadTodo();
  }, [id]);

  return (
    <View className="flex-1 bg-black p-5">
      <View className="gap-2">
        <TextInput
          placeholder="Edit your todo"
          className="rounded-lg border border-gray-500 bg-white px-4 py-3"
          value={inputValue}
          onChangeText={onChangeInputValue}
          onSubmitEditing={updateTodo}
        />
        <TouchableOpacity className="rounded-lg bg-blue-500 px-4 py-3" onPress={updateTodo}>
          <Text className="text-center font-semibold text-white">Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Modal;
