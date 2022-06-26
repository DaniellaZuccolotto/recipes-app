import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from './RecipesContext';

function RecipeContextProvider({ children }) {
  const history = useHistory();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [searchData, setSearchData] = useState({
    search: '',
    filter: '',
  });

  const [dataApi, setDataApi] = useState([]);

  const [cardsRecipes, setCardsRecipes] = useState(false);

  const verifyQuantidade = (tamanho, recive, type) => {
    const id = recive.idMeal || recive.idDrink;
    if (tamanho === 1) {
      history.push(`/${type}/${id}`);
    } else {
      setCardsRecipes(true);
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
    setCardsRecipes,
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
