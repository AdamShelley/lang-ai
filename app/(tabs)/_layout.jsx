import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.container,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={20} color="#fff" />
          ),
        }}
      />
      <Tabs.Screen
        name="stories"
        options={{
          headerShown: false,
          tabBarLabel: "Stories",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book-open" size={20} color="#fff" />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212124",
    alignItems: "center",
    justifyContent: "center",
  },
});
