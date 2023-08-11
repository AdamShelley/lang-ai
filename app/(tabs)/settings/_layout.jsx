import { Stack } from "expo-router";
import { FONT, SIZES } from "../../../constants";

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
            fontSize: SIZES.medium,
            fontFamily: FONT.medium,
          },
          headerTransparent: true,
        }}
      />
    </Stack>
  );
};
export default StackLayout;
