import { useEffect, useState } from "react";
import * as storyService from "../api/storyService";
import { supabase } from "../utils/supabaseClient";
import useStoriesStore from "../state/storiesStore";

const useStories = () => {
  const setStories = useStoriesStore((state) => state.setStories);
  const setIsLoading = useStoriesStore((state) => state.setIsLoading);

  const fetchStories = async () => {
    setIsLoading(true);

    // Fetch stories from server or local storage
    let fetchedStories = await storyService.fetchStoriesFromServer();

    // Fetch images for the stories
    if (fetchedStories) {
      fetchedStories = await storyService.fetchImagesFromServer(fetchedStories);
    }

    setStories(fetchedStories);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStories();

    // Subscribe to real-time changes in 'stories' table

    const subscription = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", table: "stories" },
        async (payload) => {
          console.log(payload);

          if (payload.eventType === "INSERT") {
            // Combine the new data with the existing data
            const localStories = await storyService.getStoriesFromStorage();
            const newData = [...localStories, payload.new];

            await storyService.updateLocalStorage(newData);

            // Run the fetchStories function to update the state
            fetchStories();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);
};

export default useStories;
