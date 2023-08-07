import { Platform, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { FONT, SIZES } from "../../constants";

export default () => {
  return (
    <Tabs
      backBehavior="initialRoute"
      screenOptions={{
        tabBarStyle: styles.container,
        tabBarActiveTintColor: "#FFA500",
        tabBarInactiveTintColor: "#eee",
        tabBarLabelStyle: { fontSize: SIZES.small, fontFamily: FONT.medium },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stories"
        options={{
          headerShown: false,
          tabBarLabel: "Stories",
          tabBarIcon: ({ color }) => (
            <Ionicons name="library" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cog" size={20} color={color} />
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
    paddingBottom: Platform.OS === "ios" ? 20 : 5,
  },
});
