import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import requestApi from '../helpers/requestApi';
import RecomendedCard from '../components/RecomendedCard';
import RecipeContext from '../provider/RecipesContext';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

const RECIPE_LIST_LENGTH = 6;

function RecipesDetails() {
  const { inProgress, recipeInProgress } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState('');
  const [details, setDetails] = useState('');
  const [apiReturn, setApiReturn] = useState('');
  const [recomendRecipes, setRecomendRecipes] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const history = useHistory();
  const path = history.location.pathname;
  const id = path.replace(/[^0-9]/g, '');

  const GetIngredient = () => {
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
    const WhitchRecipe = () => {
      if (path.includes('foods')) {
        setRecipe('food');
      } else {
        setRecipe('drink');
      }
    };

    const recipeDone = () => {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneRecipes) {
        const verifica = doneRecipes.some((rec) => rec.id === id);
        setIsDone(verifica);
      }
    };

    WhitchRecipe();
    recipeDone();
    recipeInProgress(id);
  }, [id, path, recipeInProgress]);

  useEffect(() => {
    const getRecipeInAPI = async () => {
      if (path.includes('foods')) {
        const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const food = await requestApi(URL);
        const actualFood = food[0];
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
      if (path.includes('drinks')) {
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const drink = await requestApi(URL);
        const actualDrink = drink[0];
        const drinkDetail = {
          name: actualDrink.strDrink,
          category: actualDrink.strAlcoholic,
          instructions: actualDrink.strInstructions,
          video: actualDrink.strVideo,
          img: actualDrink.strDrinkThumb,
        };
        setApiReturn(actualDrink);
        return setDetails(drinkDetail);
      }
    };

    getRecipeInAPI();
  }, [recipe, id, path]);

  useEffect(() => {
    const FindRecipes = async () => {
      if (path.includes('drinks')) {
        const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const foodList = await requestApi(URL);
        setRecomendRecipes(foodList);
      }
      if (path.includes('foods')) {
        const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const drinkList = await requestApi(URL);
        setRecomendRecipes(drinkList);
      }
    };
    FindRecipes();
  }, [path]);

  const onClickStart = () => {
    history.push(`/${recipe}s/${id}/in-progress`);
  };

  return (
    <main
      className="w-[330px] border-2 border-zinc-300 bg-zinc-200 flex flex-col
      items-center justify-center rounded-lg m-auto"
    >
      <img
        data-testid="recipe-photo"
        alt="Foto da Receita"
        src={ details.img }
        className="w-[85%] rounded-xl mt-2.5"
      />
      <h1
        data-testid="recipe-title"
        className="text-center text-zinc-700 left-0 w-[300px] h-auto
        mt-2.5 mb-0 break-words text-3xl font-extrabold"
      >
        {details.name}
      </h1>
      <h2
        data-testid="recipe-category"
        className="text-center text-zinc-400 font-bold left-0
        text-xl"
      >
        {details.category}
      </h2>
      <div className="flex">
        <FavoriteButton
          btnValue={ JSON.stringify(apiReturn) }
          recipeID={ id }
          recipeType={ recipe }
          data="favorite-btn"
        />
        <ShareButton
          path={ path }
          data="share-btn"
        />
      </div>
      <h2
        className="text-center text-zinc-600 font-bold left-0
        text-2xl mt-3"
      >
        Ingredients
      </h2>
      <section className="ingredients">
        <ul className="flex flex-col">
          {GetIngredient()}
        </ul>
      </section>
      <h2
        className="text-center text-zinc-600 font-bold left-0
        text-2xl mt-2"
      >
        Instructions
      </h2>
      <section className="instructions">
        <p
          data-testid="instructions"
          className="text-zinc-600 left-0 w-[300px] h-auto
          mt-2.5 mb-0 break-words text-justify"
        >
          {details.instructions}
        </p>
      </section>
      <h2
        className="text-center text-zinc-600 font-bold left-0
        text-2xl mt-2"
      >
        Video
      </h2>
      <iframe
        data-testid="video"
        src={ details.video }
        title={ details.name }
        className="w-[310px] border-2 border-zinc-300"
      />
      <h2
        className="text-center text-zinc-600 font-bold left-0
        text-2xl mt-2"
      >
        Recommended
      </h2>
      <section className="recommended">
        { recomendRecipes.slice(0, RECIPE_LIST_LENGTH).map((recipes, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <RecomendedCard
              recipes={ recipes }
              index={ index }
              type={ recipe === 'food' ? 'drink' : 'food' }
            />
          </div>
        )) }
      </section>
      {
        !isDone && (
          <button
            type="button"
            className="start-btn bg-red-800 text-white font-bold"
            data-testid="start-recipe-btn"
            onClick={ onClickStart }
          >
            { inProgress }
          </button>
        )
      }
    </main>
  );
}

export default RecipesDetails;
