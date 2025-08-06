import '@/src/global.css';
import 'expo-dev-client';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../components/ThemeProvider';
import { GluestackUIProvider } from '../components/ui/gluestack-ui-provider/GluestackUIProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    InterRegular: require('@/assets/fonts/inter-regular.ttf'),
    InterMedium: require('@/assets/fonts/inter-medium.ttf'),
    InterLight: require('@/assets/fonts/inter-light.ttf'),
    InterSemiBold: require('@/assets/fonts/inter-semibold.ttf'),
    InterThin: require('@/assets/fonts/inter-thin.ttf'),
    InterExtraBold: require('@/assets/fonts/inter-extra-bold.ttf'),
    InterBold: require('@/assets/fonts/inter-bold.ttf'),
    InterBlack: require('@/assets/fonts/inter-black.ttf'),
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
    <SafeAreaProvider>
      <ThemeProvider>
        <GluestackUIProvider>
          <StatusBar style="auto" />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </GluestackUIProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
