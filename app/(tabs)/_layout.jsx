import { Platform, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { FONT, SIZES } from "../../constants";
import useSettingsStore from "../../state/store";

export default () => {
  const hasSeenOverlay = useSettingsStore((state) => state.hasSeenOverlay);

  const preventTabPress = {
    tabPress: (e) => {
      if (!hasSeenOverlay) {
        e.preventDefault();
      }
    },
  };

  return (
    <Tabs
      backBehavior="initialRoute"
      screenOptions={{
        tabBarStyle: styles.container(hasSeenOverlay),
        tabBarActiveTintColor: "#FFA500",
        tabBarInactiveTintColor: "#eee",
        tabBarLabelStyle: { fontSize: SIZES.small, fontFamily: FONT.medium },
      }}
    >
      <Tabs.Screen
        name="home"
        listeners={preventTabPress}
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
        listeners={preventTabPress}
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
        listeners={preventTabPress}
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
  container: (overlay) => ({
    height: Platform.OS === "ios" ? 70 : 60,
    backgroundColor: overlay ? "#212124" : "#212121",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0,
    alignSelf: "center",

    paddingTop: Platform.OS === "ios" ? 5 : 5,
    paddingBottom: Platform.OS === "ios" ? 20 : 5,
  }),
});
