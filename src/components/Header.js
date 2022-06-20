import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageName, searchEnabled }) {
  return (
    <header>
      <img
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
      />
      <h1 data-testid="page-title">{ pageName }</h1>
      {
        searchEnabled && (<img
          src={ searchIcon }
          alt="search"
          data-testid="search-top-btn"
        />)
      }
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  searchEnabled: PropTypes.bool,
};

Header.defaultProps = {
  searchEnabled: true,
};

export default Header;
