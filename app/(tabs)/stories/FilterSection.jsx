import { View, Text, StyleSheet } from "react-native";
import Filter from "../../../components/Filter";
import GenreButton from "../../../components/GenreButton";
import { useState } from "react";

import { genres } from "../../../constants/genres";

const FilterSection = ({ selectedGenre, setSelectedGenre }) => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <View style={style.wrapper}>
      <Filter
        text={"Select Genre"}
        color="#fff"
        size="40%"
        onPress={() => setShowButtons((prev) => !prev)}
      />
      {showButtons && (
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
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "#414141",
    marginTop: 10,
    padding: 10,
    alignContent: "space-evenly",
    justifyContent: "space-evenly",
  },
});

export default FilterSection;
