import { useTodoStore } from '@/src/store/todo-store';
import { Todo } from '@/src/types';
import { useRef } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VStack } from '../../ui/v-stack';
import EmptyList from './empty-list';
import Header from './header';
import TodoInput from './todo-input';
import TodoItem from './todo-item';

export default function TodoScreen() {
  const todos = useTodoStore(store => store.todos);
  const editingTodoId = useTodoStore(store => store.editingTodoId);

  const flatListRef = useRef<FlatList | null>(null);

  const renderTodoItems = ({ index, item }: ListRenderItemInfo<Todo>) => {
    return <TodoItem data={item} flatListRef={flatListRef} index={index} />;
  };

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}>
      {/* Dismiss keyboard when tapping outside */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView edges={{ top: 'maximum' }} className="flex-1 p-0 !pb-0 px-5">
          <FlatList
            ref={flatListRef}
            contentContainerStyle={{ gap: 20, paddingBottom: !!editingTodoId?.length ? 190 : 20 }}
            data={todos}
            renderItem={renderTodoItems}
            keyExtractor={item => item.id}
            extraData={editingTodoId}
            className="flex-1 h-full"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets
            ListHeaderComponent={
              <VStack space="2xl">
                <Header />
                <TodoInput />
              </VStack>
            }
            ListHeaderComponentClassName="pb-3"
            ListEmptyComponent={<EmptyList />}
            initialNumToRender={10}
            onScrollToIndexFailed={({ index, averageItemLength }) => {
              flatListRef.current?.scrollToOffset({
                offset: index * averageItemLength,
                animated: true,
              });
            }}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
