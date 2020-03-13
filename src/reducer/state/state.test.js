import {reducer, ActionType, ActionCreator} from "./state";

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      city: `Hamburg`,
    });
  });

  it(`Reducer should change city`, () => {
    expect(reducer({
      city: `Hamburg`,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`,
    })).toEqual({
      city: `Amsterdam`,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator returns object with new city`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    });
  });
});
