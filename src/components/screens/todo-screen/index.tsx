import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../../ui/box';
import Header from './header';
import TodoInput from './todo-input';

export default function TodoScreen() {
  return (
    <SafeAreaView className="flex-1 py-10 px-6">
      <Header />
      <Box className="h-1" />
      <TodoInput />
    </SafeAreaView>
  );
}
