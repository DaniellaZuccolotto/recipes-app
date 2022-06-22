import React from 'react';
import PropTypes from 'prop-types';

function CardsRecipeDrinks({ recipes, index }) {
  return (
    <main data-testid={ `${index}-recipe-card` }>
      <h3 data-testid={ `${index}-card-name` }>{ recipes.strDrink }</h3>
      <img
        src={ recipes.strDrinkThumb }
        alt={ recipes.strDrink }
        style={ { width: 100 } }
        data-testid={ `${index}-card-img` }
      />
    </main>
  );
}

CardsRecipeDrinks.propTypes = {
  recipes: PropTypes.shape(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardsRecipeDrinks;
