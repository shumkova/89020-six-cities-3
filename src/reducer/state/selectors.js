import NameSpace from "../name-space";

const getCity = (state) => {
  return state[NameSpace.STATE].city;
};

export {getCity};
