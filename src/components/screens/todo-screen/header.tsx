import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '../../ui/box';
import { HStack } from '../../ui/h-stack';
import { Text } from '../../ui/text';
import TodoProgress from './todo-progress';

export default function Header() {
  return (
    <Box className="mb-9 pt-5">
      <HStack className="gap-5 mb-5 items-center">
        <Box className="size-16 rounded-[16px]">
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            className="w-full h-full flex justify-center items-center"
            style={{ borderRadius: 16 }}>
            <Ionicons name="flash-outline" size={28} color={'white'} />
          </LinearGradient>
        </Box>
        <Box>
          <Text size="3xl" className="font-inter-semibold">
            Today's Tasks
          </Text>
          <Text size="md" className="dark:text-neutral-400 text-neutral-500">
            0 of 0 completed
          </Text>
        </Box>
      </HStack>
      <TodoProgress progress={55} />
    </Box>
  );
}
