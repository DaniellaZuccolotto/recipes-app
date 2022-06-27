import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardsRecipe({ recipes, index, type }) {
  return (
    <div>
      {
        type === 'drinks' ? (
          <Link to={ `/drinks/${recipes.idDrink}` }>
            <main data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{ recipes.strDrink }</h3>
              <img
                src={ recipes.strDrinkThumb }
                alt={ recipes.strDrink }
                style={ { width: 150 } }
                data-testid={ `${index}-card-img` }
              />
            </main>
          </Link>
        ) : (
          <Link to={ `/foods/${recipes.idMeal}` }>
            <main data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{ recipes.strMeal }</h3>
              <img
                src={ recipes.strMealThumb }
                alt={ recipes.strMeal }
                style={ { width: 150 } }
                data-testid={ `${index}-card-img` }
              />
            </main>
          </Link>
        )
      }
    </div>

  );
}

CardsRecipe.propTypes = {
  recipes: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardsRecipe;
