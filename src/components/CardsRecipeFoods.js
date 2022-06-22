import React from 'react';
import PropTypes from 'prop-types';

function CardsRecipeFoods({ recipes, index }) {
  return (
    <main data-testid={ `${index}-recipe-card` }>
      <h3 data-testid={ `${index}-card-name` }>{ recipes.strMeal }</h3>
      <img
        src={ recipes.strMealThumb }
        alt={ recipes.strMeal }
        style={ { width: 100 } }
        data-testid={ `${index}-card-img` }
      />
    </main>
  );
}

CardsRecipeFoods.propTypes = {
  recipes: PropTypes.shape(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardsRecipeFoods;
