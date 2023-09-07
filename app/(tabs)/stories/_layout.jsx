import { Stack } from "expo-router";
import { FONT, SIZES } from "../../../constants";
import useSettingsStore from "../../../state/store";
import { darkTheme, lightTheme } from "../../../constants/theme";
import { Text, TouchableOpacity, View } from "react-native";

const StackLayout = () => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);

  const setHideReadStories = useSettingsStore(
    (state) => state.setHideReadStories
  );

  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={{ alignItems: "flex-start", flex: 1 }}>
              <Text
                style={{
                  fontSize: SIZES.medium,
                  fontFamily: FONT.medium,
                  color: "#fff",
                }}
              >
                All Stories
              </Text>
            </View>
          ),
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontSize: SIZES.medium,
            fontFamily: FONT.medium,
          },
          headerTransparent: true,
          headerRight: () => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={setHideReadStories}>
                <Text style={{ fontSize: SIZES.small, color: "#fff" }}>
                  Hide Read
                </Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
};
export default StackLayout;
