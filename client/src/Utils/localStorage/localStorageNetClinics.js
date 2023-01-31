export const getLocalStorageNetClinics = () => {
  const token = window.localStorage.getItem("token");
  return token;
};

export const saveLocalStorageNetClinics = (item) => {
  window.localStorage.setItem("token", item);
};

export const removeLocalStorage = () => {
  window.localStorage.removeItem("token");
};
