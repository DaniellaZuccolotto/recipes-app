import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import requestAPI from '../helpers/requestApi';
import RecipeContext from '../provider/RecipesContext';

function CardsIngredients({ ingredients, index, type }) {
  const { setTemporaryDataApi } = useContext(RecipeContext);
  const ingredient = {
    name: ingredients.strIngredient,
    id: ingredients.idIngredient,
  };
  const filterByIngredient = async () => {
    let url;
    if (type === 'foods') url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.name}`;
    if (type === 'drinks') url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.name}`;
    const recipes = await requestAPI(url);
    setTemporaryDataApi(recipes);
  };
  const imageUrl = () => {
    let imageURL;
    if (type === 'foods') {
      imageURL = `https://www.themealdb.com/images/ingredients/${ingredients.strIngredient}-Small.png`;
    }
    if (type === 'drinks') {
      imageURL = `https://www.thecocktaildb.com/images/ingredients/${ingredients.strIngredient}-Small.png`;
    }
  };
  useEffect(() => {
    filterByIngredient();
  }, []);

  return (
    <Link to={ `/${type}` }>
      <main data-testid={ `${index}-ingredient-card` }>
        <h3 data-testid={ `${index}-card-name` }>{ ingredient.name }</h3>
        <img
          src={ imageURL }
          alt={ ingredient.name }
          data-testid={ `${index}-card-img` }
          style={ { width: 150 } }
        />
      </main>
    </Link>
  );
}

CardsIngredients.propTypes = {
  ingredients: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardsIngredients;
