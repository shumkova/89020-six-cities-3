import NameSpace from "../name-space";

export const getFavorites = (state) => {
  return state[NameSpace.FAVORITES].favorites;
};
