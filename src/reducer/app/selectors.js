import NameSpace from "../name-space";

const getCity = (state) => {
  return state[NameSpace.APP].city;
};

const getActiveOffer = (state) => {
  return state[NameSpace.APP].activeOffer;
};

const getReviews = (state) => {
  return state[NameSpace.APP].reviews;
};

const getNearbyOffers = (state) => {
  return state[NameSpace.APP].nearbyOffers;
};

export {getCity, getActiveOffer, getReviews, getNearbyOffers};
