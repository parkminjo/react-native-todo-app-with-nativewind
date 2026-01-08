import { TabSwitcher } from '@/components/features/TabSwitcher';
import { TodoInput } from '@/components/features/TodoInput';
import { TodoList } from '@/components/features/TodoList';
import { useTodos } from '@/hooks/useTodos';
import { View } from 'react-native';
import './global.css';

const App = () => {
  const {
    inputValue,
    setInputValue,
    isWorking,
    todos,
    handleTabChange,
    handleAddTodo,
    deleteTodo,
    toggleTodoCompletion,
  } = useTodos();

  return (
    <View className="flex-1 gap-4 bg-black px-5 py-20">
      <TabSwitcher isWorking={isWorking} onTabChange={handleTabChange} />
      <TodoInput value={inputValue} onChangeText={setInputValue} onSubmit={handleAddTodo} />
      <TodoList
        todos={todos}
        isWorking={isWorking}
        onToggle={toggleTodoCompletion}
        onDelete={deleteTodo}
      />
    </View>
  );
};

export default App;
