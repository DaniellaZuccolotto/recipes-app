import React from 'react';
import PropTypes from 'prop-types';

function CardsRecipe({ recipes, index, type }) {
  console.log(recipes);
  return (
    <div>
      {
        type === 'drinks' ? (
          <main data-testid={ `${index}-recipe-card` }>
            <h3 data-testid={ `${index}-card-name` }>{ recipes.strDrink }</h3>
            <img
              src={ recipes.strDrinkThumb }
              alt={ recipes.strDrink }
              style={ { width: 100 } }
              data-testid={ `${index}-card-img` }
            />
          </main>
        ) : (
          <main data-testid={ `${index}-recipe-card` }>
            <h3 data-testid={ `${index}-card-name` }>{ recipes.strMeal }</h3>
            <img
              src={ recipes.strMealThumb }
              alt={ recipes.strMeal }
              style={ { width: 100 } }
              data-testid={ `${index}-card-img` }
            />
          </main>
        )
      }
    </div>

  );
}

CardsRecipe.propTypes = {
  recipes: PropTypes.shape(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardsRecipe;
