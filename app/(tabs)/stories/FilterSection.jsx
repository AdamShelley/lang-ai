import { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Filter from "../../../components/Filter";
import GenreButton from "../../../components/GenreButton";

// import { genres } from "../../../constants/genres";

const FilterSection = ({
  selectedGenre,
  selectedLevel,
  setSelectedGenre,
  setSelectedLevel,
  allStories,
}) => {
  const [showGenres, setShowGenre] = useState(false);
  const [showLevels, setShowLevels] = useState(false);

  const capitalizeFirstLetter = (string) => {
    if (typeof string === "string") {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  };

  // Filter out levels/genres that have no stories
  const availableGenres = useMemo(() => {
    let genres;
    if (selectedLevel === "All") {
      genres = allStories.map((story) =>
        story?.topic ? capitalizeFirstLetter(story.topic) : "Unknown"
      );
    } else {
      genres = allStories
        .filter((story) => story?.level === selectedLevel)
        .map((story) =>
          story?.topic ? capitalizeFirstLetter(story.topic) : "Unknown"
        );
    }
    return new Set(genres);
  }, [selectedLevel, allStories]);

  const availableLevels = useMemo(() => {
    let levels;
    if (selectedGenre === "All") {
      levels = allStories.map((story) =>
        story?.level ? story.level.toUpperCase() : "Unknown"
      );
    } else {
      levels = allStories
        .filter((story) => story?.topic === selectedGenre)
        .map((story) => (story?.level ? story.level.toUpperCase() : "Unknown"));
    }
    return new Set(levels);
  }, [selectedGenre, allStories]);

  return (
    <View style={style.wrapper}>
      <View style={style.filteredButtons}>
        {selectedGenre && selectedGenre !== "All" && (
          // <Text style={{ color: "#fff" }}>{selectedGenre}</Text>
          <GenreButton
            text={`X  ${selectedGenre}`}
            color="#414141"
            size="30%"
            onPress={() => {
              setSelectedGenre("All");
            }}
          />
        )}
        {selectedLevel && selectedLevel !== "All" && (
          <GenreButton
            text={`X  ${selectedLevel}`}
            color="#414141"
            size="20%"
            onPress={() => {
              setSelectedLevel("All");
            }}
          />
        )}
      </View>

      <View style={style.filters}>
        <Filter
          text={"Select Genre"}
          color="#fff"
          size="100%"
          onPress={() => {
            setShowGenre((prev) => !prev);
            setShowLevels(false);
          }}
        />
        <Filter
          text={"Select Level"}
          color="#fff"
          size="100%"
          onPress={() => {
            setShowLevels((prev) => !prev);
            setShowGenre(false);
          }}
        />
      </View>
      {showGenres && (
        <View style={style.buttonContainer}>
          {Array.from(availableGenres).map((genre) => (
            <GenreButton
              key={genre}
              text={genre}
              color="#333"
              size="20%"
              onPress={() => {
                setSelectedGenre(genre);
                setShowGenre(false);
              }}
            />
          ))}
        </View>
      )}
      {showLevels && (
        <View style={style.buttonContainer}>
          {Array.from(availableLevels).map((level) => (
            <GenreButton
              key={level}
              text={level}
              color="#333"
              size="20%"
              onPress={() => {
                setSelectedLevel(level);
                setShowLevels(false);
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  filteredButtons: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
    paddingVertical: 10,
    alignContent: "flex-start",
    justifyContent: "space-evenly",
  },
});

export default FilterSection;
