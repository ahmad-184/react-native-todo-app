import { useTodoStore } from '@/src/store/todo-store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeProvider';
import { Box } from '../../ui/box';
import { HStack } from '../../ui/h-stack';
import { Text } from '../../ui/text';
import { VStack } from '../../ui/v-stack';

export default function DangerZone() {
  const { theme } = useTheme();
  return (
    <Box className="overflow-hidden rounded-2xl">
      <LinearGradient
        colors={theme === 'dark' ? ['#1e1b4b', '#4c1d95'] : ['#f5f3ff', '#ddd6fe']}
        className="p-6 flex w-full">
        <Text size="lg" className="font-inter-semibold text-rose-500">
          Danger Zone
        </Text>
        <Box className="h-7" />
        <VStack space="lg">
          <ResetApp />
        </VStack>
      </LinearGradient>
    </Box>
  );
}

function ResetApp() {
  const { clearTodos } = useTodoStore();

  const onReset = () => {
    Alert.alert(
      'App Reset',
      'Are you sure you want to reset your data?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => clearTodos() },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity onPress={onReset}>
      <HStack className="items-center justify-between">
        <HStack className="items-center" space="lg">
          <Box className="size-11 rounded-[16px]">
            <LinearGradient
              colors={['#f43f5e', '#e11d48']}
              className="w-full h-full flex justify-center items-center"
              style={{ borderRadius: 16 }}>
              <Ionicons name="trash" size={20} color={'white'} />
            </LinearGradient>
          </Box>
          <Box>
            <Text size="lg" className="font-inter-medium">
              Reset App
            </Text>
          </Box>
        </HStack>
        <Box>
          <Ionicons name="chevron-forward" size={16} color={'#a1a1aa'} />
        </Box>
      </HStack>
    </TouchableOpacity>
  );
}
