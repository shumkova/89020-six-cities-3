import {extend} from "../../utils";

const initialState = {
  city: `Hamburg`,
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: newCity,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });
  }

  return state;
};

export {reducer, ActionTypes, ActionCreator};
