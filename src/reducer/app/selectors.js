import NameSpace from "../name-space";

const getCity = (state) => {
  return state[NameSpace.APP].city;
};

const getActiveOffer = (state) => {
  return state[NameSpace.APP].offer;
};

export {getCity, getActiveOffer};
