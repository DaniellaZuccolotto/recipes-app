import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipeContext from '../provider/RecipesContext';

function Header({ pageName, searchEnabled }) {
  const [enableSearchText, setEneableSearchText] = useState(false);
  const history = useHistory();
  const { searchData, setSearchData } = useContext(RecipeContext);
  const { search } = searchData;

  const handleChange = ({ target: { value, name } }) => {
    setSearchData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const ClickProfileLink = () => {
    history.push('/profile');
  };

  const ChangeSearchStatus = () => {
    if (enableSearchText === true) {
      return setEneableSearchText(false);
    }
    setSearchData({
      search: '',
      filter: '',
    });
    return setEneableSearchText(true);
  };

  return (
    <header>
      <div>
        <input
          type="image"
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
          onClick={ ClickProfileLink }
        />
        <h1 data-testid="page-title">{ pageName }</h1>
        {
          searchEnabled && (<input
            type="image"
            src={ searchIcon }
            alt="open-search"
            data-testid="search-top-btn"
            onClick={ ChangeSearchStatus }
          />)
        }
      </div>
      {
        enableSearchText && (
          <div>
            <input
              type="text"
              placeholder="Digite sua pesquisa"
              name="search"
              value={ search }
              onChange={ handleChange }
              data-testid="search-input"
            />
            <div>
              <label htmlFor="ingredient">
                <input
                  type="radio"
                  id="ingredient"
                  name="filter"
                  value="ingredient"
                  onChange={ handleChange }
                  data-testid="ingredient-search-radio"
                />
                Ingredient
              </label>
              <label htmlFor="name">
                <input
                  type="radio"
                  id="name"
                  name="filter"
                  value="name"
                  onChange={ handleChange }
                  data-testid="name-search-radio"
                />
                Name
              </label>
              <label htmlFor="first-letter">
                <input
                  type="radio"
                  id="first-letter"
                  name="filter"
                  value="first-letter"
                  onChange={ handleChange }
                  data-testid="first-letter-search-radio"
                />
                First Letter
              </label>
            </div>
            <button
              type="button"
              data-testid="exec-search-btn"
            >
              Search
            </button>
          </div>)
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
