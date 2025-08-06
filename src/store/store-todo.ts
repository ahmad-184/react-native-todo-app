import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { Todo } from '../types';

type TodoStore = {
  todos: Todo[];
  editingTodoId: string | null;
  addTodo: (data: Todo) => void;
  updateTodo: (data: Partial<Todo> & { id: string }) => void;
  removeTodo: (id: string) => void;
  setEditingTodoId: (id: string | null) => void;
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
      editingTodoId: null,
      addTodo: data =>
        set(state => ({
          todos: [data, ...state.todos],
        })),
      updateTodo: data =>
        set(state => ({
          todos: state.todos.map(todo => {
            if (todo.id === data.id) {
              const updatedTodo = { ...todo, ...data };
              return updatedTodo;
            }
            return todo;
          }),
        })),
      removeTodo: id =>
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id),
        })),
      setEditingTodoId: id =>
        set(() => ({
          editingTodoId: id,
        })),
      clearTodos: () => set({ todos: [] }),
    }),
    {
      name: 'todos-storage',
      storage: asyncStorage,
    }
  )
);
