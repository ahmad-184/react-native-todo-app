import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { Todo } from '../types';

type TodoStore = {
  todos: Todo[];
  addTodo: (data: Todo) => void;
  removeTodo: (id: string) => void;
  clearTodos: () => void;
};

const asyncStorage: PersistStorage<TodoStore> = {
  getItem: async name => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async name => {
    await AsyncStorage.removeItem(name);
  },
};

export const useTodoStore = create<TodoStore>()(
  persist(
    set => ({
      todos: [],
      addTodo: data =>
        set(state => ({
          todos: [data, ...state.todos],
        })),
      removeTodo: id =>
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id),
        })),
      clearTodos: () => set({ todos: [] }),
    }),
    {
      name: 'todos-storage',
      storage: asyncStorage,
    }
  )
);
