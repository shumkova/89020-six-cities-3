import NameSpace from "../name-space";

const getCity = (state) => {
  return state[NameSpace.APP].city;
};

export {getCity};
