import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipeContext from '../provider/RecipesContext';
import requestApi from '../helpers/requestApi';

function Header({ pageName, searchEnabled }) {
  const [enableSearchText, setEneableSearchText] = useState(false);
  const history = useHistory();
  const { searchData,
    setSearchData, setDataApi, verifyQuantidade } = useContext(RecipeContext);
  const { search, filter } = searchData;

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

  const searchFoods = () => {
    switch (filter) {
    case 'ingredient':
      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
    case 'name':
      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    case 'first-letter':
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return null;
      }
      return `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
    default:
      return null;
    }
  };

  const searchDrinks = () => {
    switch (filter) {
    case 'ingredient':
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
    case 'name':
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    case 'first-letter':
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return null;
      }
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
    default:
      return null;
    }
  };

  const onClickSearch = async () => {
    if (pageName === 'Foods') {
      const respostFoods = searchFoods();
      if (respostFoods !== null) {
        const recive = await requestApi(respostFoods);
        if (recive.meals === null) {
          return global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
        setDataApi(recive);
        verifyQuantidade(recive.meals.length, recive.meals[0].idMeal, 'foods');
      }
    }
    if (pageName === 'Drinks') {
      const respostDrinks = searchDrinks();
      if (respostDrinks !== null) {
        const recive = await requestApi(respostDrinks);
        if (recive.drinks === null) {
          return global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
        setDataApi(recive);
        verifyQuantidade(recive.drinks.length, recive.drinks[0].idDrink, 'drinks');
      }
    }
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
              onClick={ onClickSearch }
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
