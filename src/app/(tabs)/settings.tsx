import SettingsScreen from '@/src/components/screens/settings-screen';
import { useTheme } from '@/src/components/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsTab() {
  const { theme } = useTheme();

  return (
    <LinearGradient
      colors={theme === 'dark' ? ['#0b0a1b', '#1e1b4b'] : ['#f3e8ff', '#f3e8ff', '#faf5ff']}
      className="flex-1">
      <SettingsScreen />
    </LinearGradient>
  );
}
