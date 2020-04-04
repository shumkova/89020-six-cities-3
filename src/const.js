export const AppRoute = {
  LOGIN: `/login`,
  ROOT: `/`,
  FAVORITES: `/favorites`,
  OFFER: `/offer`,
};

export const AppState = {
  PENDING: `Pending`,
  READY: `Ready`,
};

export const ListKind = {
  OFFER: `offer`,
  NEAR: `near`,
};

export const SortTypes = {
  POPULAR: `Popular`,
  PRICE_TO_HIGH: `Price: low to high`,
  PRICE_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};

export const ListTypes = {
  CITY: {
    list: `cities__places-list`,
    card: `cities__place-card`,
  },
  NEARBY: {
    list: `near-places__list`,
    card: `near-places__card`,
  },
  FAVORITE: {
    list: ``,
    card: `favorites__card`,
  },
};
