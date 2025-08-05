import { useTheme } from '@/src/components/ThemeProvider';
import { Text } from '@/src/components/ui/text';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsTab() {
  const { theme } = useTheme();

  return (
    <LinearGradient
      colors={theme === 'dark' ? ['#0b0a1b', '#1e1b4b'] : ['#f3e8ff', '#f3e8ff', '#faf5ff']}
      className="flex-1">
      <SafeAreaView className="flex-1 py-10 px-6">
        <Text size="xl" bold>
          Settings
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
}
