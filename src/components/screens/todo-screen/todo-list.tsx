import { useTodoStore } from '@/src/store/store-todo';
import { Todo } from '@/src/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '../../ThemeProvider';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { HStack } from '../../ui/h-stack';
import { Text } from '../../ui/text';
import { VStack } from '../../ui/v-stack';

export default function TodoList() {
  const todos = useTodoStore(store => store.todos);
  const editingTodoId = useTodoStore(store => store.editingTodoId);

  const renderTodoItems = ({ item }: { item: Todo }) => {
    return <TodoItem data={item} />;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // adjust if you have a header
      >
        <FlatList
          contentContainerStyle={{ gap: 20, paddingBottom: 100 }}
          data={todos}
          renderItem={renderTodoItems}
          keyExtractor={item => item.id}
          extraData={editingTodoId}
          className="flex-1 h-full"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

function TodoItem({ data }: { data: Todo }) {
  const { updateTodo, removeTodo, editingTodoId, setEditingTodoId } = useTodoStore();
  const { theme } = useTheme();
  const [text, setText] = useState(data.text);

  const inputRef = useRef<RNTextInput>(null);

  const onComplete = () => {
    updateTodo({
      isCompleted: !data.isCompleted,
      id: data.id,
    });
  };

  const onEdit = () => {
    setEditingTodoId(data.id);
  };

  const onDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeTodo(data.id) },
    ]);
  };

  useEffect(() => {
    if (editingTodoId === data.id) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [editingTodoId]);

  const handleBlur = () => {
    if (editingTodoId === data.id) {
      setEditingTodoId(null);
    }
    updateTodo({ id: data.id, text });
  };

  const isEditing = editingTodoId === data.id;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Card
        className="bg-transparent rounded-3xl !m-0 !p-0 overflow-hidden"
        size="lg"
        variant="filled">
        <LinearGradient
          colors={theme === 'dark' ? ['#3f3f46', '#27272a'] : ['#e4e4e7', '#a1a1aa']}
          className="w-full min-h-[100px] p-5"
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 2 }}>
          <HStack space="md" className="items-start">
            <TouchableOpacity onPress={onComplete} className="size-10 rounded-full overflow-hidden">
              <LinearGradient
                colors={
                  data.isCompleted
                    ? theme === 'dark'
                      ? ['#7c3aed', '#6d28d9']
                      : ['#8b5cf6', '#7c3aed']
                    : theme === 'dark'
                      ? ['#27272a', '#52525b']
                      : ['#d4d4d8', '#fff']
                }
                className="w-full h-full flex items-center justify-center">
                {!!data.isCompleted && <Ionicons name="checkmark" color={'#ede9fe'} size={17} />}
              </LinearGradient>
            </TouchableOpacity>
            <VStack className="flex-1" space="md">
              {(!isEditing || editingTodoId === null) && (
                <Text
                  size="lg"
                  style={
                    data.isCompleted ? { textDecorationLine: 'line-through', color: '#a1a1aa' } : {}
                  }>
                  {data.text}
                </Text>
              )}
              {isEditing && (
                <RNTextInput
                  ref={inputRef}
                  value={text}
                  onChangeText={setText}
                  onBlur={handleBlur}
                  multiline
                  className="font-inter-regular !text-typography-700 text-lg border-zinc-500 border-b p-0"
                />
              )}
              <HStack space="md">
                <Button
                  onPress={onEdit}
                  variant="solid"
                  className="p-0 overflow-hidden rounded-full w-11 h-11">
                  <LinearGradient
                    colors={['#ca8a04', '#a16207']}
                    className="w-full h-full flex items-center justify-center">
                    <Ionicons name="pencil" size={15} color="white" />
                  </LinearGradient>
                </Button>
                <Button
                  onPress={onDelete}
                  variant="solid"
                  className="p-0 overflow-hidden rounded-full w-11 h-11">
                  <LinearGradient
                    colors={['#e11d48', '#be123c']}
                    className="w-full h-full flex items-center justify-center">
                    <Ionicons name="trash" size={15} color="white" />
                  </LinearGradient>
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </LinearGradient>
      </Card>
    </TouchableWithoutFeedback>
  );
}
