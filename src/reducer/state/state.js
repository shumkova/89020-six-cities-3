import {extend} from "../../utils";

const initialState = {
  city: `Hamburg`,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
