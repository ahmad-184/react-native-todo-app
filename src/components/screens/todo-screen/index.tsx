import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../../ui/box';
import Header from './header';
import TodoInput from './todo-input';
import TodoList from './todo-list';

export default function TodoScreen() {
  return (
    <SafeAreaView edges={{ top: 'maximum' }} className="flex-1 p-0 !pb-0 px-5">
      <Header />
      <TodoInput />
      <Box className="h-9" />
      <TodoList />
    </SafeAreaView>
  );
}
