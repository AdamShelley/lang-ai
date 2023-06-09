import { useEffect, useState } from "react";
import * as storyService from "../api/storyService";
import useStoriesStore from "../state/storiesStore";

const useStories = () => {
  const setStories = useStoriesStore((state) => state.setStories);
  const setIsLoading = useStoriesStore((state) => state.setIsLoading);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);

      // Fetch stories from server or local storage
      let fetchedStories = await storyService.fetchStoriesFromServer();

      // Fetch images for the stories
      if (fetchedStories) {
        fetchedStories = await storyService.fetchImagesFromServer(
          fetchedStories
        );
      }

      setStories(fetchedStories);
      setIsLoading(false);
    };

    fetchStories();
  }, [setStories, setIsLoading]);
};

export default useStories;
