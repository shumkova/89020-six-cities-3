import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  RENTAL_OFFERS_COUNT: 312
};

const rentalOffers = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`
];

ReactDOM.render(
    <App
      rentalOffersCount={Settings.RENTAL_OFFERS_COUNT}
      rentalOffers={rentalOffers}
    />,
    document.querySelector(`#root`)
);
