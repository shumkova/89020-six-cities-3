import {extend} from "../../utils";

const initialState = {
  hotels: [],
  applicationIsReady: false,
};

const ActionTypes = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  ACTIVATE_APP: `ACTIVATE_APP`,
};

const ActionCreator = {
  loadHotels: (hotels) => {
    return {
      type: ActionTypes.LOAD_HOTELS,
      payload: hotels,
    };
  },

  activateApp: () => {
    return {
      type: ActionTypes.ACTIVATE_APP,
      payload: true,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_HOTELS: {
      return extend(state, {
        hotels: action.payload,
      });
    }
    case ActionTypes.ACTIVATE_APP: {
      return extend(state, {
        applicationIsReady: true,
      });
    }
    case ActionTypes.SET_CITY: {
      return extend(state, {
        city: action.payload,
      });
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionTypes};
