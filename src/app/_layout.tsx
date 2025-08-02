import 'expo-dev-client';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider/GluestackUIProvider';
import { useEffect } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    InterFont: require('@/assets/fonts/inter-variable-font.ttf'),
    InterItalicFont: require('@/assets/fonts/inter-italic-variable-font.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <GluestackUIProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GluestackUIProvider>
    </ThemeProvider>
  );
}
