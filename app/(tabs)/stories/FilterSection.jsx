import { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Filter from "../../../components/Filter";
import GenreButton from "../../../components/GenreButton";

const ALL = "All";
const UNKNOWN = "Unknown";

const capitalizeFirstLetter = (string) => {
  if (typeof string === "string") {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
};

// When a user clicks a genre, this will filter stories by that genre.
// It also filters out levels that have no stories of this genre.
const filterAndMapValues = (allStories, selectedGenre, selectedLevel, type) => {
  let values = allStories;

  if (type === "topic" && selectedLevel !== ALL) {
    values = values.filter(
      (story) => story.level?.toLowerCase() === selectedLevel.toLowerCase()
    );
  }

  if (type === "level" && selectedGenre !== ALL) {
    values = values.filter(
      (story) => story.topic?.toLowerCase() === selectedGenre.toLowerCase()
    );
  }

  values = values.map((story) => story[type] || UNKNOWN);

  return new Set(
    values.map((value) =>
      type === "topic" ? capitalizeFirstLetter(value) : value.toUpperCase()
    )
  );
};
const FilterSection = ({
  selectedGenre,
  selectedLevel,
  setSelectedGenre,
  setSelectedLevel,
  allStories,
}) => {
  const [showGenres, setShowGenre] = useState(false);
  const [showLevels, setShowLevels] = useState(false);

  // Filter out levels/genres that have no stories
  const availableGenres = useMemo(
    () => filterAndMapValues(allStories, selectedGenre, selectedLevel, "topic"),
    [selectedGenre, selectedLevel, allStories]
  );

  const availableLevels = useMemo(
    () => filterAndMapValues(allStories, selectedGenre, selectedLevel, "level"),
    [selectedGenre, selectedLevel, allStories]
  );

  return (
    <View style={style.wrapper}>
      <View style={style.filteredButtons}>
        {selectedGenre && selectedGenre !== "All" && (
          <GenreButton
            text={`${selectedGenre}`}
            color="#414141"
            size="25%"
            deletion
            onPress={() => {
              setSelectedGenre("All");
            }}
          />
        )}
        {selectedLevel && selectedLevel !== "All" && (
          <GenreButton
            text={`${selectedLevel}`}
            color="#414141"
            size="25%"
            deletion
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
          {Array.from(availableGenres)
            .sort()
            .map((genre) => (
              <GenreButton
                key={genre}
                text={genre}
                color="#333"
                size="25%"
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
          {Array.from(availableLevels)
            .sort()
            .map((level) => (
              <GenreButton
                key={level}
                text={level}
                color="#333"
                size="30%"
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
