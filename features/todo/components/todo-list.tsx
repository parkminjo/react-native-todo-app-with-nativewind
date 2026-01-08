import { TodoItem } from '@/features/todo/components/todo-item';
import type { Todos } from '@/types';
import { ScrollView } from 'react-native';

interface TodoListProps {
  todos: Todos;
  isWorking: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({ todos, isWorking, onToggle, onDelete }: TodoListProps) => {
  const filteredTodos = Object.keys(todos).filter((key) => todos[key].isWorking === isWorking);

  if (filteredTodos.length === 0) {
    return null;
  }

  return (
    <ScrollView contentContainerClassName="gap-3">
      {filteredTodos.map((key) => (
        <TodoItem key={key} id={key} todo={todos[key]} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ScrollView>
  );
};
