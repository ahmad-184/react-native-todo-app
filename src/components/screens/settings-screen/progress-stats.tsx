import { useTodoStore } from '@/src/store/todo-store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../ThemeProvider';
import { Box } from '../../ui/box';
import { HStack } from '../../ui/h-stack';
import { Text } from '../../ui/text';
import { VStack } from '../../ui/v-stack';

export default function ProgressStats() {
  const { theme } = useTheme();
  const { todos } = useTodoStore();

  const totalTodos = todos.length ?? 0;
  const completedTodos = todos?.filter(e => !!e.isCompleted).length ?? 0;
  const activeTodos = todos?.filter(e => !e.isCompleted).length ?? 0;

  return (
    <Box className="overflow-hidden rounded-2xl">
      <LinearGradient
        colors={theme === 'dark' ? ['#1e1b4b', '#4c1d95'] : ['#f5f3ff', '#ddd6fe']}
        className="p-6 flex w-full">
        <Text size="lg" className="font-inter-semibold">
          Progress Stats
        </Text>
        <Box className="h-5" />
        <VStack space="lg">
          <TotalTodosStat totalTodos={totalTodos} />
          <CompeletedTodosStat compeletedTodos={completedTodos} />
          <ActiveTodosStat activeTodos={activeTodos} />
        </VStack>
      </LinearGradient>
    </Box>
  );
}

function TotalTodosStat({ totalTodos }: { totalTodos: number }) {
  const { theme } = useTheme();

  return (
    <Box className="overflow-hidden rounded-2xl border-l-4 border-violet-400">
      <LinearGradient
        colors={theme === 'dark' ? ['#18181b', '#27272a'] : ['#fafafa', '#f4f4f5']}
        className="p-6 flex w-full">
        <HStack space="md" className="items-center">
          <Box className="w-12 h-12 rounded-full bg-violet-500 overflow-hidden">
            <LinearGradient
              colors={['#8b5cf6', '#7c3aed']}
              className="h-full w-full flex items-center justify-center">
              <Ionicons size={22} name="list" color={'white'} />
            </LinearGradient>
          </Box>
          <VStack space="xs">
            <Text size="3xl" className="font-inter-bold">
              {totalTodos}
            </Text>
            <Text className="text-typography-500" size="sm">
              Total Todos
            </Text>
          </VStack>
        </HStack>
      </LinearGradient>
    </Box>
  );
}

function CompeletedTodosStat({ compeletedTodos }: { compeletedTodos: number }) {
  const { theme } = useTheme();

  return (
    <Box className="overflow-hidden rounded-2xl border-l-4 border-emerald-400">
      <LinearGradient
        colors={theme === 'dark' ? ['#18181b', '#27272a'] : ['#fafafa', '#f4f4f5']}
        className="p-6 flex w-full">
        <HStack space="md" className="items-center">
          <Box className="w-12 h-12 rounded-full bg-emerald-500 overflow-hidden">
            <LinearGradient
              colors={['#10b981', '#059669']}
              className="h-full w-full flex items-center justify-center">
              <Ionicons size={22} name="checkmark-circle" color={'white'} />
            </LinearGradient>
          </Box>
          <VStack space="xs">
            <Text size="3xl" className="font-inter-bold">
              {compeletedTodos}
            </Text>
            <Text className="text-typography-500" size="sm">
              Completed
            </Text>
          </VStack>
        </HStack>
      </LinearGradient>
    </Box>
  );
}

function ActiveTodosStat({ activeTodos }: { activeTodos: number }) {
  const { theme } = useTheme();

  return (
    <Box className="overflow-hidden rounded-2xl border-l-4 border-blue-400">
      <LinearGradient
        colors={theme === 'dark' ? ['#18181b', '#27272a'] : ['#fafafa', '#f4f4f5']}
        className="p-6 flex w-full">
        <HStack space="md" className="items-center">
          <Box className="w-12 h-12 rounded-full bg-blue-500 overflow-hidden">
            <LinearGradient
              colors={['#3b82f6', '#2563eb']}
              className="h-full w-full flex items-center justify-center">
              <Ionicons size={22} name="time" color={'white'} />
            </LinearGradient>
          </Box>
          <VStack space="xs">
            <Text size="3xl" className="font-inter-bold">
              {activeTodos}
            </Text>
            <Text className="text-typography-500" size="sm">
              Active
            </Text>
          </VStack>
        </HStack>
      </LinearGradient>
    </Box>
  );
}
