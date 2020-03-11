import {extend} from "../../utils";

const initialState = {
  hotels: [],
};

const ActionType = {
  LOAD_HOTELS: `LOAD_HOTELS`,
};

const ActionCreator = {
  loadHotels: (hotels) => {
    return {
      type: ActionType.LOAD_HOTELS,
      payload: hotels,
    };
  }
};

const Operation = {
  loadHotels: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        console.log(`response.data:`);
        console.log(response.data);
        dispatch(ActionCreator.loadHotels(response.data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_HOTELS: {
      console.log(`action.payload:`);
      console.log(action.payload);
      return extend(state, {
        hotels: action.payload,
      });
    }
  }

  return state;
};


export {reducer, Operation, ActionCreator, ActionType};
