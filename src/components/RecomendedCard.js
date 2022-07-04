import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecomendedCard({ recipes, index, type }) {
  return (
    <div className="w-[145px] border-2 border-zinc-300">
      {
        type === 'drink' ? (
          <Link to={ `/drinks/${recipes.idDrink}` }>
            <main
              data-testid={ `${index}-recipe-card` }
              className="w-[130px]"
            >
              <h3
                data-testid={ `${index}-recomendation-title` }
                className="text-zinc-500 font-bold text-xl"
              >
                { recipes.strDrink }
              </h3>
              <img
                src={ recipes.strDrinkThumb }
                alt={ recipes.strDrink }
                data-testid={ `${index}-card-img` }
                className="w-[130px] mx-[5px] mt-2 rounded"
              />
            </main>
          </Link>
        ) : (
          <Link to={ `/foods/${recipes.idMeal}` }>
            <main data-testid={ `${index}-recipe-card` }>
              <h3
                data-testid={ `${index}-recomendation-title` }
                className="text-center text-zinc-500 font-bold left-0
                text-xl flex justify-center items-center"
              >
                { recipes.strMeal }
              </h3>
              <img
                src={ recipes.strMealThumb }
                alt={ recipes.strMeal }
                data-testid={ `${index}-card-img` }
                className="w-[130px] ml-1 mt-2 mb-2 rounded"
              />
            </main>
          </Link>
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
