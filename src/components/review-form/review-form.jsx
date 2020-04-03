import React from "react";
import PropTypes from "prop-types";
import {LoadingStatus} from "../../reducer/app/app";

const CommentLength = {
  MIN: 50,
  MAX: 300,
};

export const TextRating = {
  1: `terribly`,
  2: `badly`,
  3: `not bad`,
  4: `good`,
  5: `perfect`,
};

export const RatingStars = [5, 4, 3, 2, 1];

class ReviewForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      comment: ``,
      rating: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.toDefault = this.toDefault.bind(this);
  }

  componentDidUpdate() {
    const {loadingStatus, clearReviewLoadingStatus} = this.props;

    if (loadingStatus === LoadingStatus.SUCCESS) {
      this.toDefault();
      clearReviewLoadingStatus();
    }
  }

  handleSubmit(evt) {
    const {onSubmit, id} = this.props;
    const {comment, rating} = this.state;
    evt.preventDefault();

    onSubmit(id, {
      comment,
      rating,
    });
  }

  handleRatingChange(evt) {
    this.setState({
      rating: parseInt(evt.target.value, 10)
    });
  }

  handleCommentChange(evt) {
    this.setState({
      comment: evt.target.value
    });
  }

  toDefault() {
    this.setState({
      comment: ``,
      rating: null,
    });
  }

  render() {
    const {comment, rating} = this.state;
    const {loadingStatus} = this.props;

    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={this.handleSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {RatingStars.map((star) => (
            <React.Fragment key={star}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={star}
                id={`${star}-star${star > 1 ? `s` : ``}`}
                type="radio"
                checked={rating === star}
                onChange={this.handleRatingChange}
              />
              <label
                htmlFor={`${star}-star${star > 1 ? `s` : ``}`}
                className="reviews__rating-label form__rating-label"
                title={TextRating[star]}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          ))}
        </div>

        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={comment}
          minLength={CommentLength.MIN}
          maxLength={CommentLength.MAX}
          onChange={this.handleCommentChange}
        />
        {loadingStatus === LoadingStatus.FAILED ? <div>Something went wrong. Try again, please.</div> : <></>}
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and
            describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={!rating || (comment.length < CommentLength.MIN || comment.length > CommentLength.MAX) || loadingStatus === LoadingStatus.DISABLED}
          >Submit</button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  loadingStatus: PropTypes.string.isRequired,
  clearReviewLoadingStatus: PropTypes.func.isRequired,
};

export default ReviewForm;
