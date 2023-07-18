// useDictionary.js
import { useEffect, useState } from "react";
import useDictionaryStore from "../state/dictionaryStore";
import * as dictionaryService from "../api/dictionaryService";
import { supabase } from "../utils/supabaseClient";

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
    // let isMounted = true;

    if (isLoaded) return;

    const fetchDictionaryAndUpdate = async () => {
      console.log("Fetching dictionary!");
      fetchDictionary();
    };

    // const handlePayload = async (payload) => {
    //   if (!isMounted) return;
    //   if (payload.eventType === "INSERT") {
    //     try {
    //       const localDictionary =
    //         await dictionaryService.getDictionaryFromStorage();
    //       const newWord = payload.new;
    //       console.log(newWord);
    //       const newData = { ...newWord, ...localDictionary };
    //       await dictionaryService.updateLocalStorage(newData);
    //       fetchDictionaryAndUpdate();
    //     } catch (error) {
    //       console.log("Error in handling payload");
    //       console.log(error);
    //     }
    //   }
    // };

    fetchDictionaryAndUpdate();

    // const subscription = supabase
    //   .channel("any")
    //   .on(
    //     "postgres_changes",
    //     { event: "*", table: "dictionary" },
    //     handlePayload
    //   )
    //   .subscribe();

    // return () => {
    //   try {
    //     isMounted = false;
    //     supabase.removeChannel(subscription);
    //   } catch (error) {
    //     console.log("Error in return");
    //     console.log(error);
    //   }
    // };
  }, []);

  return { fetchDictionary };
};

export default useDictionary;
