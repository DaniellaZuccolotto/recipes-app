import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filtredRecipes, setFiltredRecipes] = useState([]);

  const doneRecipes = () => {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    return done || [];
  };

  useEffect(() => {
    setRecipes(doneRecipes());
    setFiltredRecipes(doneRecipes());
  }, []);

  useEffect(() => {}, [filtredRecipes]);

  const onClick = ({ target }) => {
    switch (target.value) {
    case 'Food':
      return setFiltredRecipes(recipes
        .filter((recipe) => recipe.type === 'food'));
    case 'Drink':
      return setFiltredRecipes(recipes
        .filter((recipe) => recipe.type === 'drink'));
    default:
      return setFiltredRecipes(doneRecipes());
    }
  };

  return (
    <div>
      <div>
        <Header pageName="Done Recipes" searchEnabled={ false } />
      </div>
      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={ onClick }
          data-testid="filter-by-all-btn"
          value="All"
          className="bg-red-500 text-white w-[98px] ml-1 mt-2 rounded hover:bg-red-700
          font-bold mb-2 border-2 border-amber-200"
        >
          All
        </button>

        <button
          type="button"
          onClick={ onClick }
          data-testid="filter-by-food-btn"
          value="Food"
          className="bg-red-500 text-white w-[98px] ml-1 mt-2 rounded hover:bg-red-700
          font-bold mb-2 border-2 border-amber-200"
        >
          Food
        </button>

        <button
          type="button"
          onClick={ onClick }
          data-testid="filter-by-drink-btn"
          value="Drink"
          className="bg-red-500 text-white w-[98px] ml-1 mt-2 mb-2 rounded
          hover:bg-red-700 font-bold border-2 border-amber-200"
        >
          Drink
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        {
          filtredRecipes.length === 0 ? (
            <p>Não existem receitas concluidas!</p>
          ) : (
            filtredRecipes.map((recipe, index) => (
              <div
                key={ index }
                className="flex justify-center items-center rounded-md
                border-2 border-zinc-300 bg-zinc-200 w-[90%] mb-[5px]"
              >
                <div className="flex flex-col justify-center items-center">
                  <Link
                    to={ `/${recipe.type}s/${recipe.id}` }
                    className="w-[115px] mb-1 mt-2 rounded-lg"
                  >
                    <img
                      src={ recipe.image }
                      alt={ recipe.name }
                      data-testid={ `${index}-horizontal-image` }
                      className="w-[115px] mb-1 mt-1 rounded-lg"
                    />
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                    className="mb-0 text-center text-zinc-500 font-bold"
                  >
                    {recipe.doneDate}
                  </p>

                </div>
                <div className="flex flex-col w-[50%] ml-1">
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <p
                      data-testid={ `${index}-horizontal-name` }
                      className="text-center text-zinc-700 font-bold text-lg mt-2 mb-0"
                    >
                      {recipe.name}
                    </p>
                  </Link>
                  {
                    recipe.type === 'food' ? (
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                        className="mb-0 mt-0 text-center text-zinc-500 font-bold"
                      >
                        {`${recipe.nationality} - ${recipe.category}`}
                      </p>
                    ) : (
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                        className="mb-0 mt-0 text-center text-zinc-500 font-bold"
                      >
                        {recipe.alcoholicOrNot}
                      </p>
                    )
                  }
                  <div className="flex flex-wrap justify-center ml-2">
                    {
                      recipe.tags.slice(0, 2).map((tagName) => (
                        <p
                          key={ tagName }
                          data-testid={ `${index}-${tagName}-horizontal-tag` }
                          className="mb-0 mt-0 text-center text-zinc-200
                          bg-red-500 font-bold rounded-3xl pl-1 pr-1 mx-1 mb-2
                          opacity-80"
                        >
                          {tagName}
                        </p>
                      ))
                    }
                  </div>
                  <ShareButton
                    path={ `/${recipe.type}s/${recipe.id}` }
                    data={ `${index}-horizontal-share-btn` }
                  />
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
