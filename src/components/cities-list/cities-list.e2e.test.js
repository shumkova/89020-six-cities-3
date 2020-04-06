import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CitiesList from "./cities-list";

Enzyme.configure({adapter: new Adapter()});

const cities = [`Amsterdam`];
const activeCity = `London`;

it(`On city click something happens`, () => {
  const onCityClick = jest.fn();
  const mockedEvent = {preventDefault: () => {}};

  const list = shallow(<CitiesList
    cities={cities}
    activeCity={activeCity}
    onCityClick={onCityClick}
  />);

  const city = list.find(`.locations__item-link`);
  city.props().onClick(mockedEvent);
  expect(onCityClick.mock.calls.length).toBe(1);
});
