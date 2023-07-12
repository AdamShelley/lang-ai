// useDictionary.js
import { useEffect } from "react";
import useDictionaryStore from "../state/dictionaryStore";
import * as dictionaryService from "../api/dictionaryService";

const useDictionary = () => {
  const initialize = useDictionaryStore((state) => state.initialize);

  useEffect(() => {
    initialize(dictionaryService.fetchDictionaryFromServer);
  }, [initialize]);
};

export default useDictionary;
