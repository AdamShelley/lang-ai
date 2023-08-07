// useDictionary.js
import { useEffect, useState } from "react";
import useDictionaryStore from "../state/dictionaryStore";
import * as dictionaryService from "../api/dictionaryService";

const useDictionary = () => {
  const { setWords } = useDictionaryStore((state) => ({
    setWords: state.setWords,
  }));

  const [isLoaded, setIsLoaded] = useState(false);

  const fetchDictionary = async (forceFetch = false) => {
    const data = await dictionaryService.fetchDictionaryFromServer(forceFetch);
    setWords(data); // Update the local state/store
    setIsLoaded(true);
  };

  useEffect(() => {
    if (isLoaded) return;

    fetchDictionary();
  }, []);

  return { fetchDictionary };
};

export default useDictionary;
