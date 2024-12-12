export const getCachedData = (key) => {
  return sessionStorage.getItem(key) || null;
};

export const setCachedData = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const clearCachedData = (key) => {
  sessionStorage.removeItem(key);
};
