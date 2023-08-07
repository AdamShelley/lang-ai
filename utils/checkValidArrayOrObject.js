export const isValidStoriesData = (data) =>
  Array.isArray(data) && data.length > 0;
export const isValidDictionaryData = (data) =>
  typeof data === "object" && Object.keys(data).length > 0;
