import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Ionicons } from '@expo/vector-icons';
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return (
    <FontAwesome
      size={30}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="home"
              size={24}
              color={color}
            />
          ),
          headerRight: () => (
            <Link
              href="/modal"
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="heart"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="notifications"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="user"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tabs>
  );
}
