import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import requestApi from '../helpers/requestApi';

function RecipesDetails() {
  const [heart, setHeart] = useState(whiteHeartIcon);
  const [recipe, setRecipe] = useState('');
  const [details, setDetails] = useState('');
  const [apiReturn, setApiReturn] = useState('');
  const history = useHistory();
  const path = history.location.pathname;
  const id = path.replace(/[^0-9]/g, '');

  const WhitchRecipe = () => {
    if (path.includes('foods')) {
      return setRecipe('food');
    }
    return setRecipe('drink');
  };

  const GetIngredient = () => {
    console.log(apiReturn);
    if (apiReturn !== '') {
      const MAX_LENGTH = 50;
      const ingredients = [];
      for (let i = 1;
        (i <= MAX_LENGTH) && (apiReturn[`strIngredient${i}`] !== '')
         && (apiReturn[`strIngredient${i}`] !== null);
        i += 1) {
        ingredients.push(apiReturn[`strIngredient${i}`] + apiReturn[`strMeasure${i}`]);
      }
      return ingredients.map((value, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {value}

        </li>
      ));
    }
  };
  useEffect(() => {
    WhitchRecipe();
  });
  useEffect(() => {
    const getRecipeInAPI = async () => {
      if (recipe === 'food') {
        const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const food = await requestApi(URL);
        const actualFood = food.meals[0];
        const foodDetail = {
          name: actualFood.strMeal,
          category: actualFood.strCategory,
          instructions: actualFood.strInstructions,
          video: actualFood.strYoutube,
          img: actualFood.strMealThumb,
        };
        setApiReturn(actualFood);
        return setDetails(foodDetail);
      }
      if (recipe === 'drink') {
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const drink = await requestApi(URL);
        const actualDrink = drink.drinks[0];
        const drinkDetail = {
          name: actualDrink.strDrink,
          category: actualDrink.strCategory,
          instructions: actualDrink.strInstructions,
          video: actualDrink.strVideo,
          img: actualDrink.strDrinkThumb,
        };
        setApiReturn(actualDrink);
        return setDetails(drinkDetail);
      }
    };

    getRecipeInAPI();
  }, [recipe, id]);

  const onClickFavorite = () => {
    if (heart === whiteHeartIcon) {
      return setHeart(blackHeartIcon);
    }
    return setHeart(whiteHeartIcon);
  };
  return (
    <main>
      <img
        data-testid="recipe-photo"
        alt="Foto da Receita"
        src={ details.img }
      />
      <h1 data-testid="recipe-title">{details.name}</h1>
      <h2 data-testid="recipe-category">{details.category}</h2>
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
      <h2>Ingredients</h2>
      <section className="ingredients">
        <ul>
          {GetIngredient()}
        </ul>
      </section>
      <h2>Instructions</h2>
      <section className="instructions">
        <p data-testid="instructions">{details.instructions}</p>
      </section>

      <h2>Video</h2>
      <iframe data-testid="video" src={ details.video } title={ details.name } />
      <h2>Recommended</h2>
      <section className="recommended">
        <p data-testid="0-recomendation-card">Recomendados</p>
      </section>
      <button type="button" data-testid="start-recipe-btn">
        Start Recipe
      </button>
    </main>
  );
}

export default RecipesDetails;
