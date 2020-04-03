import {SortTypes} from "./const";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const sortOffers = (offers, type) => {
  switch (type) {
    case SortTypes.PRICE_TO_LOW: {
      return offers.slice().sort((a, b) => (b.price - a.price));
    }

    case SortTypes.PRICE_TO_HIGH: {
      return offers.slice().sort((a, b) => (a.price - b.price));
    }

    case SortTypes.TOP_RATED: {
      return offers.slice().sort((a, b) => (b.rating - a.rating));
    }
  }

  return offers;
};
