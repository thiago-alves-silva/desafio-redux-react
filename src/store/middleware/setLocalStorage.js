const setLocalStorage = (state) => (next) => (action) => {
  const result = next(action);
  if (action.meta?.localStorage) {
    const { key, value } = action.meta.localStorage;
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  return result;
};

export default setLocalStorage;
