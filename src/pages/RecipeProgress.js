import React, { useState, useContext } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeContext from '../provider/RecipesContext';

function RecipeProgress() {
  const { recipeDetails, ingredientDetails } = useContext(RecipeContext);
  const [riscar, setRiscar] = useState(false);
  const [heart, setHeart] = useState(whiteHeartIcon);

  // pegar os valores pela API.
  const getIngredient = () => {
    const MAX_LENGTH = 50;
    const ingredients = [];
    for (let i = 1;
      (i <= MAX_LENGTH) && (ingredientDetails[`strIngredient${i}`] !== '')
         && (ingredientDetails[`strIngredient${i}`] !== null);
      i += 1) {
      ingredients.push(
        ingredientDetails[`strIngredient${i}`] + ingredientDetails[`strMeasure${i}`],
      );
    }
    return ingredients;
  };

  console.log(getIngredient());

  const onclickChecked = ({ target }) => {
    if (target.checked) {
      if (target.value === target.name) { setRiscar(true); }
    } else {
      setRiscar(false);
    }
  };

  const onClickFavorite = () => {
    if (heart === whiteHeartIcon) {
      return setHeart(blackHeartIcon);
    }
    return setHeart(whiteHeartIcon);
  };

  return (
    <main>
      <h3 data-testid="recipe-title">{ recipeDetails.name }</h3>
      <img
        src={ recipeDetails.img }
        alt={ recipeDetails.name }
        style={ { width: 100 } }
        data-testid="recipe-photo"
      />
      <input
        type="image"
        src={ shareIcon }
        alt="Botão de compartilhamento"
        data-testid="share-btn"
      />
      <input
        src={ heart }
        type="image"
        alt="Botão de compartilhamento"
        onClick={ onClickFavorite }
        data-testid="favorite-btn"
      />
      <p data-testid="recipe-category">{ recipeDetails.category }</p>
      {
        getIngredient().map((ingredients, i) => (
          <label
            data-testid={ `${i}-ingredient-step` }
            htmlFor={ ingredients }
            key={ i }
            style={ riscar ? { textDecoration: 'line-through' } : null }
          >
            { ingredients }
            <input
              id={ ingredients }
              type="checkbox"
              name={ ingredients }
              value={ ingredients }
              onClick={ onclickChecked }
            />
          </label>
        ))
      }
      <p data-testid="instructions">{ recipeDetails.instructions }</p>
      <button type="button" data-testid="finish-recipe-btn">
        Finalizar
      </button>
    </main>
  );
}

export default RecipeProgress;
