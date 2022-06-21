import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageName, searchEnabled }) {
  const [enableSearchText, setEneableSearchText] = useState(false);
  const history = useHistory();

  const ProfileLink = () => {
    history.push('/profile');
  };

  const ChangeSearchStatus = () => {
    if (enableSearchText === true) {
      return setEneableSearchText(false);
    }
    return setEneableSearchText(true);
  };

  return (
    <header>
      <input
        type="image"
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
        onClick={ ProfileLink }
      />
      <h1 data-testid="page-title">{ pageName }</h1>
      {
        searchEnabled && (<input
          type="image"
          src={ searchIcon }
          alt="search"
          data-testid="search-top-btn"
          onClick={ ChangeSearchStatus }
        />)
      }
      {
        enableSearchText && (
          <input
            type="text"
            data-testid="search-input"
            placeholder="Digite sua pesquisa"
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
