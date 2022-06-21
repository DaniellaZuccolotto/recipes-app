import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipesContext';

function RecipeContextProvider({ children }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [searchData, setSearchData] = useState({
    search: '',
    filter: '',
  });

  const contextValue = {
    loginData,
    setLoginData,
    searchData,
    setSearchData,
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
