import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';

import { useTheme } from '@/src/components/ThemeProvider';
import { Text } from '@/src/components/ui/text';
import { View } from 'react-native';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={() => ({
        tabBarActiveTintColor: theme == 'dark' ? '#a78bfa' : '#8b5cf6',
        tabBarInactiveTintColor: theme == 'dark' ? '#ddd6fe' : '#3b0764',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: 'transparent',
        },
        tabBarBackground: () => (
          <View
            style={{
              backgroundColor: theme === 'dark' ? '#1e1b4b' : '#faf5ff',
              flex: 1,
            }}
          />
        ),
      })}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Todos',
          tabBarLabel: ({ color }) => (
            <Text size="xs" style={{ color }}>
              Todos
            </Text>
          ),
          tabBarIcon: ({ color }) => <Ionicons size={28} name="checkmark-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: ({ color }) => (
            <Text size="xs" style={{ color }}>
              Settings
            </Text>
          ),
          tabBarIcon: ({ color }) => <Ionicons size={28} name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}
