import { Stack } from "expo-router";
import { FONT } from "../../../constants/fonts";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Settings",
          headerTintColor: "#fff",
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
