import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecomendedCard({ recipes, index, type }) {
  return (
    <div>
      {
        type === 'drinks' ? (
          <main data-testid={ `${index}-recipe-card` }>
            <Link to={ `/drinks/${recipes.idDrink}` }>
              <h3 data-testid={ `${index}-recomendation-title` }>{ recipes.strDrink }</h3>
              <img
                src={ recipes.strDrinkThumb }
                alt={ recipes.strDrink }
                style={ { width: 150 } }
                data-testid={ `${index}-card-img` }
              />
            </Link>
          </main>
        ) : (
          <main data-testid={ `${index}-recipe-card` }>
            <Link to={ `/foods/${recipes.idMeal}` }>
              <h3 data-testid={ `${index}-recomendation-title` }>{ recipes.strMeal }</h3>
              <img
                src={ recipes.strMealThumb }
                alt={ recipes.strMeal }
                style={ { width: 150 } }
                data-testid={ `${index}-card-img` }
              />
            </Link>
          </main>
        )
      }
    </div>

  );
}

RecomendedCard.propTypes = {
  recipes: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecomendedCard;
