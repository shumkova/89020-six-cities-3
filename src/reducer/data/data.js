import {extend} from "../../utils";

const initialState = {
  hotels: [],
  applicationIsReady: false,
};

const ActionType = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  ACTIVATE_APP: `ACTIVATE_APP`,
};

const ActionCreator = {
  loadHotels: (hotels) => {
    return {
      type: ActionType.LOAD_HOTELS,
      payload: hotels,
    };
  },

  activateApp: () => {
    return {
      type: ActionType.ACTIVATE_APP,
      payload: true,
    };
  },
};

const Operation = {
  loadHotels: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadHotels(response.data));
        dispatch(ActionCreator.activateApp());
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_HOTELS: {
      return extend(state, {
        hotels: action.payload,
      });
    }
    case ActionType.ACTIVATE_APP: {
      return extend(state, {
        applicationIsReady: true,
      });
    }
  }

  return state;
};


export {reducer, Operation, ActionCreator, ActionType};
