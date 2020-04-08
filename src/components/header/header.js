import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

const Header = (props) => {
  const {authorizationStatus, authInfo} = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.ROOT}>
              <img
                className="header__logo"
                src="/img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={authorizationStatus === AuthorizationStatus.AUTH ? AppRoute.FAVORITES : AppRoute.LOGIN}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__login">{authorizationStatus === AuthorizationStatus.AUTH ? authInfo.email : `Sign in`}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    isPro: PropTypes.bool,
  }).isRequired,
};

export default Header;
