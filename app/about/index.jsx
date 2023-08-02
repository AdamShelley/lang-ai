import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";
import useDictionaryStore from "../../state/dictionaryStore";
import { FONT, SIZES } from "../../constants";

const About = () => {
  const dictionary = useDictionaryStore((state) => state.words);
  const [search, setSearch] = useState("");

  const keys = Object.keys(dictionary).filter(
    (key) =>
      key.includes(search) ||
      dictionary[key].englishWord.includes(search) ||
      dictionary[key].definition.includes(search)
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "About",
          headerStyle: {
            backgroundColor: "#212124",
          },
          headerTintColor: "#eee",
          headerTitleStyle: {
            fontSize: SIZES.large,
            fontFamily: FONT.medium,
            color: "#eee",
          },
        }}
      />
      <StatusBar style="light" />
      <View style={styles.wrapper}>
        <Text style={styles.smallHeading}>About</Text>
        <TextInput
          style={{ color: "#fff", padding: 10 }}
          value={search}
          onChangeText={setSearch}
          placeholder={"Search..."}
        />
        <ScrollView>
          {/* {keys.map((key) => (
            <Text style={styles.text} key={key}>
              {`${key} - ${dictionary[key].englishWord} - ${dictionary[key].definition}`}
            </Text>
          ))} */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212121",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  wrapper: {
    flex: 1,
    marginTop: 100,
    width: "80%",
  },
  text: {
    color: "#fff",
    fontFamily: FONT.medium,
  },
  smallHeading: {
    color: "#fff",
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    marginTop: 20,
    marginBottom: 10,
  },

  switch: {},
  row: {
    height: 50,
    maxHeight: 50,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#424242",
    width: "100%",
    marginTop: 10,
  },
});
