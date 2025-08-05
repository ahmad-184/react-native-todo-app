import TodoScreen from '@/src/components/screens/todo-screen';
import { useTheme } from '@/src/components/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { theme } = useTheme();

  return (
    <LinearGradient
      colors={theme === 'dark' ? ['#0b0a1b', '#1e1b4b'] : ['#f3e8ff', '#f3e8ff', '#faf5ff']}
      className="flex-1">
      <TodoScreen />
    </LinearGradient>
  );
}
