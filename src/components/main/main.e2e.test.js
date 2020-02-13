import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter(),
});

const places = [`Wood and stone place`];

it(`Name should be pressed`, () => {
  const onPlaceNameClick = jest.fn();

  const main = shallow(
      <Main
        placesFound={312}
        places={places}
        onPlaceNameClick={onPlaceNameClick}
      />
  );

  const placeName = main.find(`.place-card__name a`);

  placeName.props().onClick();

  expect(onPlaceNameClick.mock.calls.length).toBe(1);
});
