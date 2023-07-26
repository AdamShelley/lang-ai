import { Stack } from "expo-router";
import { FONT } from "../../../constants/fonts";

import useSettingsStore from "../../../state/store";
import { darkTheme, lightTheme } from "../../../constants/theme";

const StackLayout = () => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Settings",
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: FONT.regular,
          },
          headerTransparent: true,
        }}
      />
    </Stack>
  );
};
export default StackLayout;
