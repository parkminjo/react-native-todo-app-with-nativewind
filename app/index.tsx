import { TabSwitcher } from '@/features/todo/components/tab-switcher';
import { TodoInput } from '@/features/todo/components/todo-input';
import { TodoList } from '@/features/todo/components/todo-list';
import { useTodos } from '@/features/todo/hooks/use-todos';
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
