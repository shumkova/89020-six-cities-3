import NameSpace from "../name-space";

const getCity = (state) => {
  return state[NameSpace.APP].city;
};

const getActiveOffer = (state) => {
  return state[NameSpace.APP].activeOffer;
};

const getCurrentOffer = (state) => {
  return state[NameSpace.APP].currentOffer;
};

const getReviews = (state) => {
  return state[NameSpace.APP].reviews;
};

const getNearbyOffers = (state) => {
  return state[NameSpace.APP].nearbyOffers;
};

const getSortType = (state) => {
  return state[NameSpace.APP].sortType;
};

const getLoadingStatus = (state) => {
  return state[NameSpace.APP].reviewLoadingStatus;
}

export {getCity, getActiveOffer, getReviews, getNearbyOffers, getSortType, getCurrentOffer, getLoadingStatus};
