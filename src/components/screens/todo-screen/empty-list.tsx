import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../ThemeProvider';
import { Box } from '../../ui/box';
import { Text } from '../../ui/text';
import { VStack } from '../../ui/v-stack';

export default function EmptyList() {
  const { theme } = useTheme();
  return (
    <Box className="flex-1 flex items-center justify-center">
      <VStack className="items-center justify-center" space="xs">
        <Box className="w-32 h-32 rounded-full bg-zinc-600 overflow-hidden mb-3">
          <LinearGradient
            className="flex items-center justify-center w-full h-full"
            colors={theme === 'dark' ? ['#3f3f46', '#52525b'] : ['#d4d4d8', '#fff']}>
            <Ionicons
              name="clipboard-outline"
              size={50}
              color={theme === 'dark' ? '#a1a1aa' : '#52525b'}
            />
          </LinearGradient>
        </Box>
        <Text size="2xl" className="font-inter-semibold">
          No Todos Yet!
        </Text>
        <Text size="md" className="text-typography-400 text-center">
          Add your first todo above to get started
        </Text>
      </VStack>
    </Box>
  );
}
