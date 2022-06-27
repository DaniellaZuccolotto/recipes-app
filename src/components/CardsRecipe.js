import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardsRecipe({ recipes, index, type }) {
  const recipe = {
    name: recipes.strMeal || recipes.strDrink,
    img: recipes.strMealThumb || recipes.strDrinkThumb,
    id: recipes.idMeal || recipes.idDrink,
  };

  return (
    <Link to={ `/${type}/${recipe.id}` }>
      <main data-testid={ `${index}-recipe-card` }>
        <h3 data-testid={ `${index}-card-name` }>{ recipe.name }</h3>
        <img
          src={ recipe.img }
          alt={ recipe.name }
          data-testid={ `${index}-card-img` }
          style={ { width: 150 } }
        />
      </main>
    </Link>
  );
}

CardsRecipe.propTypes = {
  recipes: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardsRecipe;
