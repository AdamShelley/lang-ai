import { View, ScrollView, SafeAreaView, Text } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  return <Redirect href="/home" />;
};

export default Home;
