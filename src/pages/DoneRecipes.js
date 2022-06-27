import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const doneRecipes = () => {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    return done || [];
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
          // onClick={ onAllClick }
          data-testid="filter-by-all-btn"
        >
          All
        </button>

        <button
          type="button"
          // onClick={ onAllClick }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>

        <button
          type="button"
          // onClick={ onAllClick }
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
      </div>
      <div>
        {
          doneRecipes().map((recipe, index) => (
            <div key={ index }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.category}
              </p>
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
                // onClick={ shareRecipe }
              />
              <div>
                {
                  recipe.tags.map((tagName) => (
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
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
