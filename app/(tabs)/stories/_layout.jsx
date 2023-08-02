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
          headerTitle: "All Stories",
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontSize: SIZES.large,
            fontFamily: FONT.regular,
          },
          headerStyle: {
            backgroundColor: theme.headerBackground,
            shadowOpacity: 0,
            elevation: 0,
          },
        }}
      />
    </Stack>
  );
};
export default StackLayout;
