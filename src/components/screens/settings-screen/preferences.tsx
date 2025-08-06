import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeProvider';
import { Box } from '../../ui/box';
import { HStack } from '../../ui/h-stack';
import { Switch } from '../../ui/switch';
import { Text } from '../../ui/text';
import { VStack } from '../../ui/v-stack';

export default function Preferences() {
  const { theme } = useTheme();

  return (
    <Box className="overflow-hidden rounded-2xl">
      <LinearGradient
        colors={theme === 'dark' ? ['#1e1b4b', '#4c1d95'] : ['#f5f3ff', '#ddd6fe']}
        className="p-6 flex w-full">
        <Text size="lg" className="font-inter-semibold">
          Preferences
        </Text>
        <Box className="h-7" />
        <VStack space="lg">
          <ThemModeSwitch />
        </VStack>
      </LinearGradient>
    </Box>
  );
}

function ThemModeSwitch() {
  const { theme, toggleTheme } = useTheme();

  const onThemeChange = () => {
    toggleTheme();
  };

  return (
    <TouchableOpacity onPress={onThemeChange}>
      <HStack className="items-center justify-between">
        <HStack className="items-center" space="lg">
          <Box className="size-11 rounded-[16px]">
            <LinearGradient
              colors={['#8b5cf6', '#7c3aed']}
              className="w-full h-full flex justify-center items-center"
              style={{ borderRadius: 16 }}>
              <Ionicons name="moon" size={20} color={'white'} />
            </LinearGradient>
          </Box>
          <Box>
            <Text size="lg" className="font-inter-medium">
              Dark Mode
            </Text>
          </Box>
        </HStack>
        <Box>
          <Switch
            size="lg"
            trackColor={{ false: '#fafafa', true: '#8b5cf6' }}
            thumbColor={'#fff'}
            ios_backgroundColor={'#f4f4f5'}
            value={theme === 'light' ? false : true}
            onValueChange={onThemeChange}
          />
        </Box>
      </HStack>
    </TouchableOpacity>
  );
}
