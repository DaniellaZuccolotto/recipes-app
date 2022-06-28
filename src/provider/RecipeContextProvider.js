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
  const [temporaryDataApi, setTemporaryDataApi] = useState([]);
  const [inProgress, setInProgress] = useState('Start Recipe');
  const [cardsRecipes, setCardsRecipes] = useState(false);

  const verifyQuantidade = (tamanho, recive, type) => {
    const id = recive.idMeal || recive.idDrink;
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

  const verifyKey = (local, type, value, idPath) => (local[type][idPath]
    ? [...local[type][idPath], value] : [value]);

  const getLocalExist = (getLocal, type, value, idPath) => {
    const saveObj = {
      ...getLocal,
      [type]: {
        ...getLocal[type],
        [idPath]: verifyKey(getLocal, type, value, idPath),
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(saveObj));
  };

  const getLocalNotExist = (type, value, idPath) => {
    const saveObj = {
      [type === 'meals' ? 'cocktails' : type]: {},
      [type]: {
        [idPath]: [value],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(saveObj));
  };

  const verifyPath = (value, idPath) => {
    const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (path.includes('foods')) {
      if (getLocal) {
        getLocalExist(getLocal, 'meals', value, idPath);
      } else {
        getLocalNotExist('meals', value, idPath);
      }
    }
    if (path.includes('drinks')) {
      if (getLocal) {
        getLocalExist(getLocal, 'cocktails', value, idPath);
      } else {
        getLocalNotExist('cocktails', value, idPath);
      }
    }
  };

  const contextValue = {
    loginData,
    setLoginData,
    searchData,
    setSearchData,
    temporaryDataApi,
    setTemporaryDataApi,
    dataApi,
    setDataApi,
    verifyQuantidade,
    cardsRecipes,
    setCardsRecipes,
    recipeInProgress,
    inProgress,
    setInProgress,
    verifyPath,
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
