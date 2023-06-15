import { View, StyleSheet } from "react-native";
import Filter from "../../../components/Filter";
import GenreButton from "../../../components/GenreButton";
import { useState } from "react";

import { genres } from "../../../constants/genres";

const FilterSection = ({
  selectedGenre,
  selectedLevel,
  setSelectedGenre,
  setSelectedLevel,
  levels,
}) => {
  const [showGenres, setShowGenre] = useState(false);
  const [showLevels, setShowLevels] = useState(null);

  return (
    <View style={style.wrapper}>
      <View style={style.filteredButtons}>
        {selectedGenre && selectedGenre !== "All" && (
          // <Text style={{ color: "#fff" }}>{selectedGenre}</Text>
          <GenreButton
            text={selectedGenre}
            color="#414141"
            size="20%"
            onPress={() => {
              setSelectedGenre("All");
            }}
          />
        )}
        {selectedLevel && selectedLevel !== "All" && (
          <GenreButton
            text={selectedLevel}
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
          {genres.map((genre) => (
            <GenreButton
              key={genre.genre}
              text={genre.genre}
              color={genre.color}
              size="20%"
              onPress={() => setSelectedGenre(genre.genre)}
            />
          ))}
        </View>
      )}
      {showLevels && (
        <View style={style.buttonContainer}>
          {levels &&
            levels.map((level) => (
              <GenreButton
                key={level}
                text={level}
                color="#333"
                size="20%"
                onPress={() => setSelectedLevel(level)}
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "#414141",
    marginTop: 5,
    // padding: 10,
    alignContent: "flex-start",
    justifyContent: "space-evenly",
  },
});

export default FilterSection;
