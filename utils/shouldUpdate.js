// Check Time to UPDATE On Frontend
export const getTimestamp = () => new Date().getTime();

export const shouldUpdate = (lastUpdate) => {
  const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;
  const currentTime = getTimestamp();

  if (!lastUpdate) {
    return true;
  }

  return currentTime - lastUpdate >= SIX_HOURS_IN_MS;
};
