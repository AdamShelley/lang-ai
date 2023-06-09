// useDictionary.js
import { useEffect } from "react";
import useDictionaryStore from "../state/dictionaryStore";
import { fetchDictionaryFromServer } from "../api/dictionaryService";

const useDictionary = () => {
  const initialize = useDictionaryStore((state) => state.initialize);

  useEffect(() => {
    initialize(fetchDictionaryFromServer);
  }, [initialize]);
};

export default useDictionary;
