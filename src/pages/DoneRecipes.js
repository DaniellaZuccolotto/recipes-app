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
      <div>
        <button
          type="button"
          onClick={ onClick }
          data-testid="filter-by-all-btn"
          value="All"
        >
          All
        </button>

        <button
          type="button"
          onClick={ onClick }
          data-testid="filter-by-food-btn"
          value="Food"
        >
          Food
        </button>

        <button
          type="button"
          onClick={ onClick }
          data-testid="filter-by-drink-btn"
          value="Drink"
        >
          Drink
        </button>
      </div>
      <div>
        {
          filtredRecipes.length === 0 ? (
            <p>Não existem receitas concluidas!</p>
          ) : (
            filtredRecipes.map((recipe, index) => (
              <div key={ index }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                    style={ { width: '150px' } }
                  />
                </Link>
                {
                  recipe.type === 'food' ? (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {`${recipe.nationality} - ${recipe.category}`}
                    </p>
                  ) : (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {recipe.alcoholicOrNot}
                    </p>
                  )
                }
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {recipe.name}
                  </p>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {recipe.doneDate}
                </p>
                <ShareButton
                  path={ `/${recipe.type}s/${recipe.id}` }
                  data={ `${index}-horizontal-share-btn` }
                />
                <div>
                  {
                    recipe.tags.slice(0, 2).map((tagName) => (
                      <p
                        key={ tagName }
                        data-testid={ `${index}-${tagName}-horizontal-tag` }
                      >
                        {tagName}
                      </p>
                    ))
                  }
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
