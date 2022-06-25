import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from './RecipesContext';
import requestApi from '../helpers/requestApi';

function RecipeContextProvider({ children }) {
  const history = useHistory();
  const path = history.location.pathname;
  const idPath = path.replace(/[^0-9]/g, '');
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
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredientsDetails, setIngredientsDetails] = useState({});

  const verifyQuantidade = (tamanho, id, type) => {
    if (tamanho === 1) {
      history.push(`/${type}/${id}`);
    } else {
      setCardsRecipes(true);
    }
  };

  const recipeInProgress = () => {
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

  const getRecipeInAPI = async (idPath2) => {
    if (path.includes('foods')) {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idPath2}`;
      const food = await requestApi(URL);
      const actualFood = await food.meals[0];
      const foodDetail = {
        name: actualFood.strMeal,
        category: actualFood.strCategory,
        instructions: actualFood.strInstructions,
        video: actualFood.strYoutube,
        img: actualFood.strMealThumb,
      };
      setRecipeDetails(foodDetail);
      setIngredientsDetails(actualFood);
    }
    if (path.includes('drinks')) {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idPath2}`;
      const drink = await requestApi(URL);
      const actualDrink = await drink.drinks[0];
      const drinkDetail = {
        name: actualDrink.strDrink,
        category: actualDrink.strAlcoholic,
        instructions: actualDrink.strInstructions,
        video: actualDrink.strVideo,
        img: actualDrink.strDrinkThumb,
      };
      setRecipeDetails(drinkDetail);
      setIngredientsDetails(actualDrink);
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
    recipeDetails,
    getRecipeInAPI,
    ingredientsDetails,
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
