import { View, Text, StyleSheet } from "react-native";
import Filter from "../../../components/Filter";
import GenreButton from "../../../components/GenreButton";
import { useState } from "react";

import { genres } from "../../../constants/genres";

const FilterSection = ({
  selectedData,
  setSelectedData,
  title,
  data = null,
}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  return (
    <View style={style.wrapper}>
      <Filter
        text={title}
        color="#fff"
        size="100%"
        onPress={() => {
          setShowButtons((prev) => !prev);
          setActiveFilter(data ? "level" : "genre");
        }}
      />
      {showButtons && (
        <View style={style.buttonContainer}>
          {activeFilter === "genre" &&
            genres.map((genre) => (
              <GenreButton
                key={genre.genre}
                text={genre.genre}
                color={genre.color}
                size="20%"
                onPress={() => setSelectedData(genre.genre)}
              />
            ))}
          {data &&
            activeFilter === "level" &&
            data.map((item) => (
              <GenreButton
                key={item}
                text={item}
                color="#333"
                size="20%"
                onPress={() => setSelectedData(item)}
              />
            ))}
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    // padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "#414141",
    marginTop: 5,
    // padding: 10,
    alignContent: "space-evenly",
    justifyContent: "space-evenly",
  },
});

export default FilterSection;
