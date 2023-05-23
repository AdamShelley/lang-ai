import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    RW_light: require("../assets/fonts/Raleway-Light.ttf"),
    RW_regular: require("../assets/fonts/Raleway-Regular.ttf"),
    RW_medium: require("../assets/fonts/Raleway-Medium.ttf"),
    RW_bold: require("../assets/fonts/Raleway-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack onLayout={onLayoutRootView}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
