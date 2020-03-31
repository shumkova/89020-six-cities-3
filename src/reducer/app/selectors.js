import NameSpace from "../name-space";

const getCity = (state) => {
  return state[NameSpace.APP].city;
};

const getActiveOffer = (state) => {
  return state[NameSpace.APP].offer;
};

const getReviews = (state) => {
  return state[NameSpace.APP].reviews;
};

export {getCity, getActiveOffer, getReviews};
