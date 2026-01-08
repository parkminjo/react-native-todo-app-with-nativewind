import { STORAGES } from '@/constants/storage';
import { TABS } from '@/constants/tab';
import { Todos } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';

export const useTodos = () => {
  const [inputValue, setInputValue] = useState('');
  const [isWorking, setIsWorking] = useState(true);
  const [todos, setTodos] = useState<Todos>({});

  const saveTodos = async (todos: Todos) => {
    await AsyncStorage.setItem(STORAGES.TODOS, JSON.stringify(todos));
  };

  const loadTodosFromStorage = async () => {
    try {
      const response = await AsyncStorage.getItem(STORAGES.TODOS);
      if (!response) return;

      const data: Todos = JSON.parse(response);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveSelectedTab = async (isWorking: boolean) => {
    const tabName = isWorking ? TABS.WORK : TABS.TRAVEL;
    await AsyncStorage.setItem(STORAGES.TAB, tabName);
  };

  const loadSelectedTabFromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGES.TAB);
      if (!data) return;

      setIsWorking(data === TABS.WORK);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = (text: string, isWorking: boolean) => {
    if (text.trim() === '') return;

    setTodos((prevTodos) => {
      const newTodo = {
        content: text,
        isWorking,
        isCompleted: false,
      };

      const newTodos = { ...prevTodos, [Date.now()]: newTodo };
      saveTodos(newTodos);

      return newTodos;
    });

    setInputValue('');
  };

  const deleteTodo = (key: string) => {
    setTodos((prevTodos) => {
      const newTodos = { ...prevTodos };
      delete newTodos[key];
      saveTodos(newTodos);

      return newTodos;
    });
  };

  const toggleTodoCompletion = (key: string) => {
    setTodos((prevTodos) => {
      const newTodos = { ...prevTodos };
      newTodos[key].isCompleted = !newTodos[key].isCompleted;
      saveTodos(newTodos);

      return newTodos;
    });
  };

  const handleTabChange = (isWorking: boolean) => {
    setIsWorking(isWorking);
    saveSelectedTab(isWorking);
  };

  const handleAddTodo = () => {
    addTodo(inputValue, isWorking);
  };

  useEffect(() => {
    loadTodosFromStorage();
    loadSelectedTabFromStorage();
  }, []);

  useFocusEffect(() => {
    loadTodosFromStorage();
  });

  return {
    inputValue,
    setInputValue,
    isWorking,
    todos,
    handleTabChange,
    handleAddTodo,
    deleteTodo,
    toggleTodoCompletion,
  };
};
