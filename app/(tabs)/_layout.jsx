import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FONT } from "../../constants/fonts";

export default () => {
  return (
    <Tabs
      backBehavior="initialRoute"
      screenOptions={{
        tabBarStyle: styles.container,
        tabBarActiveTintColor: "#e6e6e6",
        tabBarInactiveTintColor: "#ccc",
        tabBarLabelStyle: { fontSize: 12, fontFamily: FONT.regular },
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
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
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
    backgroundColor: "#464646",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0,
    alignSelf: "center",
    paddingTop: 10,
  },
});
