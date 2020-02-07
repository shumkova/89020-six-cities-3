import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  RENTAL_OFFERS: 312
};

ReactDOM.render(
    <App
      rentalOffers={Settings.RENTAL_OFFERS}
    />,
    document.querySelector(`#root`)
);
