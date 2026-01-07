export interface Todo {
  content: string;
  isWorking: boolean;
  isCompleted: boolean;
}

export type Todos = Record<string, Todo>;
