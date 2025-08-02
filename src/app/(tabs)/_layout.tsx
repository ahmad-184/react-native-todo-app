import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/src/components/ui/IconSymbol';
import TabBarBackground from '@/src/components/ui/TabBarBackground';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Todos',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear.badge" color={color} />,
        }}
      />
    </Tabs>
  );
}
