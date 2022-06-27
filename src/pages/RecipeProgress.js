import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import requestApi from '../helpers/requestApi';

function RecipeProgress() {
  const [riscar, setRiscar] = useState(false);
  const [heart, setHeart] = useState(whiteHeartIcon);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredientsDetails, setIngredientsDetails] = useState({});
  const history = useHistory();
  const path = history.location.pathname;
  const idPath = path.replace(/[^0-9]/g, '');

  const getIngredient = () => {
    const MAX_LENGTH = 50;
    const ingredients = [];
    for (let i = 1;
      (i <= MAX_LENGTH) && (ingredientsDetails[`strIngredient${i}`] !== '')
             && (ingredientsDetails[`strIngredient${i}`] !== null);
      i += 1) {
      ingredients.push(
        ingredientsDetails[`strIngredient${i}`] + ingredientsDetails[`strMeasure${i}`],
      );
    }
    const NUMBER_CINQUENTA = 50;
    if (ingredients.length === NUMBER_CINQUENTA) return null;
    return ingredients;
  };

  useEffect(() => {
    const getRecipeInAPI = async () => {
      if (path.includes('foods')) {
        const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idPath}`;
        const food = await requestApi(URL);
        const actualFood = await food.meals[0];
        const foodDetail = {
          name: actualFood.strMeal,
          category: actualFood.strCategory,
          instructions: actualFood.strInstructions,
          video: actualFood.strYoutube,
          img: actualFood.strMealThumb,
        };
        setRecipeDetails(foodDetail);
        setIngredientsDetails(actualFood);
      }
      if (path.includes('drinks')) {
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idPath}`;
        const drink = await requestApi(URL);
        const actualDrink = await drink.drinks[0];
        const drinkDetail = {
          name: actualDrink.strDrink,
          category: actualDrink.strAlcoholic,
          instructions: actualDrink.strInstructions,
          video: actualDrink.strVideo,
          img: actualDrink.strDrinkThumb,
        };
        setRecipeDetails(drinkDetail);
        setIngredientsDetails(actualDrink);
      }
    };
    getRecipeInAPI();
  }, [path, idPath]);

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
    <div>
      {
        getIngredient() && (
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
            { getIngredient().map((ingredients, i) => (
              <label
                data-testid={ `${i}-ingredient-step` }
                htmlFor={ `ingredient-${i}` }
                key={ i }
                style={ riscar ? { textDecoration: 'line-through' } : null }
              >
                { ingredients }
                <input
                  id={ `ingredient-${i}` }
                  type="checkbox"
                  name={ ingredients }
                  value={ ingredients }
                  onClick={ onclickChecked }
                />
              </label>
            ))}
            <p data-testid="instructions">{ recipeDetails.instructions }</p>
            <button type="button" data-testid="finish-recipe-btn">
              Finalizar
            </button>
          </main>
        )
      }
    </div>
  );
}

export default RecipeProgress;
