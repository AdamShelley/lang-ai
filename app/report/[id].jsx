import { LIVE_URL, URL_DEV } from "@env";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import useSettingsStore from "../../state/store";
import { darkTheme, lightTheme } from "../../constants/theme";
import { SIZES, FONT } from "../../constants";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Report = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  // State

  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [spelling, setSpelling] = useState(false);
  const [translation, setTranslation] = useState(false);
  const [inappropriateContent, setInappropriateContent] = useState(false);
  const [other, setOther] = useState(false);
  const [comments, setComments] = useState("");

  const handleSubmit = async () => {
    // Issue Object

    if (!reportSubmitted) {
      console.log("submitting new report");

      const issue = {
        spelling,
        translation,
        inappropriateContent,
        other,
        comments,
        id,
      };

      // Submit to API
      sendIssueToDB(issue);

      setReportSubmitted(true);
    } else {
      console.log("Report already submitted");
      setReportSubmitted(true);
    }
  };

  const updateReportedStoriesInAsyncStorage = async (storyId) => {
    try {
      const reportedStories = await AsyncStorage.getItem("reportedStories");
      let stories = reportedStories ? JSON.parse(reportedStories) : [];

      // Check if the story has already been reported
      if (stories.includes(storyId)) {
        // Story already reported, do not proceed
        return false;
      }

      stories.push(storyId);

      await AsyncStorage.setItem("reportedStories", JSON.stringify(stories));
      return true;
    } catch (error) {
      console.log("Failed to updated reported stories", error);
    }
  };

  const sendIssueToDB = async (issue) => {
    try {
      await fetch(`${LIVE_URL}/issue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issue),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const goHomeButton = () => {
    router.push("/");
  };

  useEffect(() => {
    const checkReported = async () => {
      const canReport = await updateReportedStoriesInAsyncStorage(id);
      if (!canReport) {
        setReportSubmitted(true);
      } else {
        setReportSubmitted(false);
      }
    };

    checkReported();
  }, []);

  return (
    <SafeAreaView style={styles.container(theme)}>
      <StatusBar style="dark" />

      <Stack.Screen
        options={{
          headerTitle: "Report an Issue",
          headerStyle: {
            backgroundColor: "#212124",
          },
          headerTintColor: "#eee",
          headerTransparent: true,
          headerTitleStyle: {
            fontSize: SIZES.medium,
            fontFamily: FONT.medium,
            color: "#eee",
          },
        }}
      />

      <ScrollView style={styles.wrapper}>
        <Text style={styles.title}>Report an issue with this story</Text>

        {/* List of potential issues as checkboxes */}
        {!reportSubmitted ? (
          <View style={styles.rowContainer}>
            <View style={styles.row}>
              <Checkbox value={spelling} onValueChange={setSpelling} />
              <Text style={styles.text}>Spelling/Grammar Issues</Text>
            </View>
            <View style={styles.row}>
              <Checkbox value={translation} onValueChange={setTranslation} />
              <Text style={styles.text}>Translation Issues</Text>
            </View>
            <View style={styles.row}>
              <Checkbox
                value={inappropriateContent}
                onValueChange={setInappropriateContent}
              />
              <Text style={styles.text}>Inappropriate Content</Text>
            </View>
            <View style={styles.row}>
              <Checkbox value={other} onValueChange={setOther} />
              <Text style={styles.text}>Other</Text>
            </View>

            {/* Text box for additional comments */}
            <View style={styles.inputContainer}>
              <Text style={styles.text}>Additional Comments</Text>
              <TextInput
                style={styles.input}
                textAlignVertical="top"
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setComments(text)}
                value={comments}
              />
            </View>

            {/* Submit button */}
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit Report</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.submittedContainer}>
            <Text style={styles.submittedText}>
              Thank you for submitting the report!
            </Text>
            <Pressable style={styles.button} onPress={goHomeButton}>
              <Text style={styles.buttonText}>Go back home</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.headerBackground,
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 100 : 0,
  }),
  rowContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 50,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  wrapper: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    marginTop: 20,
    padding: 10,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: "#eee",
    letterSpacing: 0.2,
    textAlign: "center",
  },
  text: {
    color: "#eee",
    marginLeft: 10,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    // marginTop: 20,
  },

  input: {
    height: 80,
    minWidth: "100%",
    borderColor: "gray",
    borderWidth: 1,
    color: "#fff",
    marginTop: 10,
    padding: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FFA500",
    padding: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#1a1a1a",
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
  submittedContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  submittedText: {
    color: "#eee",
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    textAlign: "center",
  },
});
