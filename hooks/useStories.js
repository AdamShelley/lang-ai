import { useEffect, useState } from "react";
import * as storyService from "../api/storyService";

import { supabase } from "../utils/supabaseClient";
import useStoriesStore from "../state/storiesStore";

const useStories = () => {
  const stories = useStoriesStore((state) => state.stories);
  const setStories = useStoriesStore((state) => state.setStories);
  const isLoaded = useStoriesStore((state) => state.isLoaded);
  const setIsLoaded = useStoriesStore((state) => state.setIsLoaded);
  const setLevels = useStoriesStore((state) => state.setLevels);
  const setGenres = useStoriesStore((state) => state.setGenres);

  const fetchStories = async (forceFetch) => {
    // Fetch stories from server or local storage
    let fetchedStories = await storyService.fetchStoriesFromServer(forceFetch);

    // Fetch images for the stories
    if (fetchedStories) {
      fetchedStories = await storyService.fetchImagesFromServer(fetchedStories);
      const levels = storyService.setStoryLevels(fetchedStories);
      setLevels(levels);
      const genres = storyService.setStoryGenres(fetchedStories);
      setGenres(genres);
    }

    setStories(fetchedStories);
    setIsLoaded(true);

    return fetchStories;
  };

  useEffect(() => {
    let isMounted = true;

    if (isLoaded) return;

    const fetchStoriesAndUpdate = async () => {
      console.log("Fetching  stories!");
      fetchStories();
    };

    const handlePayload = async (payload) => {
      if (!isMounted) return;
      if (payload.eventType === "INSERT") {
        try {
          // Combine the new data with the existing data
          const localStories = await storyService.getStoriesFromStorage();

          // Parse the word array in each story
          const words = payload.new?.words?.map((obj) => JSON.parse(obj));
          const newStory = { ...payload.new, words };

          const newData = [newStory, ...localStories];
          await storyService.updateLocalStorage(newData);
          // Run the fetchStories function to update the state
          fetchStoriesAndUpdate();
        } catch (error) {
          console.log("Error in handling payload");
          console.log(error);
        }
      }
    };

    // Call fetchStories initially to load the stories
    fetchStoriesAndUpdate();

    // Subscribe to real-time changes in 'stories' table
    const subscription = supabase
      .channel("any")
      .on("postgres_changes", { event: "*", table: "stories" }, handlePayload)
      .subscribe();

    return () => {
      try {
        isMounted = false;
        supabase.removeChannel(subscription);
      } catch (error) {
        console.log("Error in return");
        console.log(error);
      }
    };
  }, []);

  return { fetchStories };
};

export default useStories;
