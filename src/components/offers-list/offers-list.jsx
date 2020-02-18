import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import OfferCard from "../offer-card/offer-card";

class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {},
    };
  }

  render() {
    const {offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, index) => (
          <OfferCard
            key={`place-${index}`}
            offer={offer}
            index={index}
            onCardHover={(cardObj) => {
              this.setState(() => ({
                activeCard: cardObj,
              }));
            }}
          />
        ))}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};

export default OffersList;
