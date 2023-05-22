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
        // listeners={({ navigation }) => ({
        //   tabPress: (event) => {
        //     event.preventDefault();
        //     navigation.navigate("stories");
        //   },
        // })}
        options={{
          headerShown: false,
          tabBarLabel: "Stories",
          component: () => null,
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
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0,
  },
});
