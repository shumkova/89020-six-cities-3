import PropTypes from "prop-types";
import React from "react";
import Review from "../review/review";

const ReviewsList = (props) => {
  const {reviews} = props;

  return (
    <ul className="reviews__list">
      {reviews.sort((a, b) => {
        return a.date.valueOf() - b.date.valueOf();
      }).map((review) => (
        <Review
          key={review.id}
          review={review}
        />
      ))}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    comment: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired
};

export default ReviewsList;
