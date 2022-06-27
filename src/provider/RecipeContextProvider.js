import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from './RecipesContext';

function RecipeContextProvider({ children }) {
  const history = useHistory();
  const path = history.location.pathname;

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [searchData, setSearchData] = useState({
    search: '',
    filter: '',
  });

  const [dataApi, setDataApi] = useState([]);
  const [inProgress, setInProgress] = useState('Start Recipe');
  const [cardsRecipes, setCardsRecipes] = useState(false);

  const verifyQuantidade = (tamanho, id, type) => {
    if (tamanho === 1) {
      history.push(`/${type}/${id}`);
    } else {
      setCardsRecipes(true);
    }
  };

  const recipeInProgress = (idPath) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      if (path.includes('foods')) {
        const verificaFoods = Object.keys(inProgressRecipes.meals);
        if (verificaFoods.some((idMeal) => idMeal === idPath)) {
          setInProgress('Continue Recipe');
        }
      }
      if (path.includes('drinks')) {
        const verificaDrinks = Object.keys(inProgressRecipes.cocktails);
        if (verificaDrinks.some((idDrink) => idDrink === idPath)) {
          setInProgress('Continue Recipe');
        }
      }
    }
  };

  const contextValue = {
    loginData,
    setLoginData,
    searchData,
    setSearchData,
    dataApi,
    setDataApi,
    verifyQuantidade,
    cardsRecipes,
    recipeInProgress,
    inProgress,
    setInProgress,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeContextProvider;
