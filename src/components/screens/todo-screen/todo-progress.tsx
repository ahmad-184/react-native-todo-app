import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '../../ThemeProvider';
import { Box } from '../../ui/box';
import { HStack } from '../../ui/h-stack';
import { Text } from '../../ui/text';

type Props = {
  progress: number;
};

export default function TodoProgress({ progress }: Props) {
  const { theme } = useTheme();

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const interpolatedWidth = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });
  return (
    <HStack className="gap-2 items-center justify-between">
      <Box className="w-[88%] h-3 rounded-xl overflow-hidden bg-neutral-200 relative">
        <LinearGradient
          colors={theme === 'dark' ? ['#737373', '#525252'] : ['#fafafa', '#fafafa']}
          className="w-full h-full absolute inset-0"
        />
        <Animated.View className="h-full overflow-hidden" style={{ width: interpolatedWidth }}>
          <LinearGradient
            colors={theme === 'dark' ? ['#8b5cf6', '#7c3aed'] : ['#a78bfa', '#8b5cf6']}
            className="w-full h-full"
          />
        </Animated.View>
      </Box>
      <Box>
        <Text size="md" className="dark:text-violet-400 text-violet-600">
          {progress}%
        </Text>
      </Box>
    </HStack>
  );
}
