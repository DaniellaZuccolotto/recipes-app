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
      setEneableSearchText(false);
    } else {
      setSearchData({
        search: '',
        filter: '',
      });
      setEneableSearchText(true);
    }
  };

  const findEndPoint = (domain) => {
    switch (filter) {
    case 'ingredient':
      return `https://www.${domain}.com/api/json/v1/1/filter.php?i=${search}`;
    case 'name':
      return `https://www.${domain}.com/api/json/v1/1/search.php?s=${search}`;
    case 'first-letter':
      return `https://www.${domain}.com/api/json/v1/1/search.php?f=${search}`;
    default:
      return null;
    }
  };

  const onClickSearch = async () => {
    // As duas mensagens estavam aparecendo quando o retorno de recive era null
    // Por isso essa consicional esta aqui.
    if (search.length > 1 && filter === 'first-letter') {
      return global.alert('Your search must have only 1 (one) character');
    }

    const type = pageName.toLowerCase();
    let URL;
    if (type === 'foods') URL = findEndPoint('themealdb');
    if (type === 'drinks') URL = findEndPoint('thecocktaildb');
    const recipe = await requestApi(URL);

    if (recipe === null || !recipe.length) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      setDataApi(recipe);
      verifyQuantidade(recipe.length, recipe[0], type);
    }
  };

  return (
    <header>
      <div className="bg-red-800 flex justify-between text-white">
        <input
          type="image"
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
          onClick={ ClickProfileLink }
          className="bg-white rounded-full h-10 w-10 ml-1 mt-2 px-1 font-black"
        />
        <h1
          data-testid="page-title"
          className={ !searchEnabled && 'mr-[10px]' }
        >
          { pageName }
        </h1>
        {
          searchEnabled && (<input
            type="image"
            src={ searchIcon }
            alt="open-search"
            data-testid="search-top-btn"
            onClick={ ChangeSearchStatus }
            className="bg-white rounded-full h-10 w-10 mr-1 mt-2 px-1"
          />)
        }
      </div>
      {
        enableSearchText && (
          <div
            className="bg-red-600 z-0 absolute top-8 right-7 w-4/5 h-[100px]
            rounded-md flex flex-col justify-center items-center"
          >
            <input
              type="text"
              placeholder="Digite sua pesquisa"
              name="search"
              value={ search }
              onChange={ handleChange }
              data-testid="search-input"
              className="w-3/5 my-1 rounded-md"
            />
            <div>
              <label htmlFor="ingredient" className="font-bold text-white">
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
              <label htmlFor="name" className="font-bold text-white">
                <input
                  type="radio"
                  id="name"
                  name="filter"
                  value="name"
                  onChange={ handleChange }
                  data-testid="name-search-radio"
                  className="ml-2"
                />
                Name
              </label>
              <label htmlFor="first-letter" className="font-bold text-white">
                <input
                  type="radio"
                  id="first-letter"
                  name="filter"
                  value="first-letter"
                  onChange={ handleChange }
                  data-testid="first-letter-search-radio"
                  className="ml-2"
                />
                First Letter
              </label>
            </div>
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ onClickSearch }
              className="bg-red-500 text-white w-16 rounded hover:bg-red-700
              disabled:bg-red-300 font-bold border-2 border-amber-200 mb-1"
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
