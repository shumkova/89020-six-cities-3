import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  RENTAL_OFFERS_COUNT: 312
};

const places = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`
];


ReactDOM.render(
    <App
      placesFound={Settings.RENTAL_OFFERS_COUNT}
      places={places}
    />,
    document.querySelector(`#root`)
);
