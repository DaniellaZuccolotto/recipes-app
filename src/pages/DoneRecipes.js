import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [copied, setCopied] = useState(false);
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

  // const doneRecipes = [{
  //   id: id - da - receita,
  //   type: comida - ou - bebida,
  //   nationality: nacionalidade - da - receita - ou - texto - vazio,
  //   category: categoria - da - receita - ou - texto - vazio,
  //   alcoholicOrNot: alcoholic - ou - non - alcoholic - ou - texto - vazio,
  //   name: nome - da - receita,
  //   image: imagem - da - receita,
  //   doneDate: quando - a - receita - foi - concluida,
  //   tags: array - de - tags - da - receita - ou - array - vazio,
  // }];

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
          filtredRecipes.map((recipe, index) => (
            <div key={ index }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
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
              <p data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate}
              </p>
              <input
                type="image"
                src={ shareIcon }
                alt="Botão de compartilhamento"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => {
                  navigator.clipboard.writeText(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                  setCopied(true);
                } }
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
              {
                copied ? (
                  <p>Link copied!</p>
                ) : (
                  null
                )
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
