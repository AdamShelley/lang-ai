import { Redirect, Stack, useSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { data } from "../../../data";

const Story = () => {
  const { id } = useSearchParams();

  const story = data.find((story) => story.id === parseInt(id));

  if (!story) return <Redirect to="/" />;

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `Story: ${id}` }} />
      <Text>{story.title}</Text>
      <Text>{story.text}</Text>
    </View>
  );
};

export default Story;
