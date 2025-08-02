import { Link, Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>This screen does not exist.</Text>
        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
