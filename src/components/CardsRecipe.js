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
      <main
        className="w-[150px] border-2 border-zinc-300 bg-zinc-200 flex flex-col
        items-center justify-center rounded-lg m-2 truncate"
      >
        {/* <h3
            data-testid={ `${index}-card-name` }
            className="text-center text-zinc-700 font-bold left-0 max-w-[140px]"
          > */}
        <span
          className="bar_content text-center text-zinc-700 font-bold left-0
          max-w-[140px]"
        >
          { recipe.name }
        </span>
        {/* </h3> */}
        <img
          src={ recipe.img }
          alt={ recipe.name }
          data-testid={ `${index}-card-img` }
          className="w-[75%] mb-3 rounded-lg"
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
