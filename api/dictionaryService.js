import { fetchDataFromServer } from "./dataService";

export const fetchDictionaryFromServer = async (forceFetch = false) => {
  try {
    return await fetchDataFromServer("def", "dictionary", forceFetch);
  } catch (error) {
    console.error(error.message);
    console.log(error.stack);
    return null;
  }
};
