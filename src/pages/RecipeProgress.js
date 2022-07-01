import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import requestApi from '../helpers/requestApi';
import RecipeContext from '../provider/RecipesContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

function RecipeProgress() {
  const { verifyPath } = useContext(RecipeContext);
  const history = useHistory();
  const path = history.location.pathname;
  const idPath = path.replace(/[^0-9]/g, '');
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredientsDetails, setIngredientsDetails] = useState({});
  const [ingredientsCheckedList, setIngredientsCheckedList] = useState([]);
  const [buttonFinish, setButtonFinish] = useState(true);
  const findRecipeType = () => {
    if (path.includes('foods')) return 'food';
    return 'drink';
  };
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
    const getIngredientArray = () => {
      const NUMBER_CINQUENTA = 50;
      const ingredients = [];
      for (let i = 1;
        (i <= NUMBER_CINQUENTA) && (ingredientsDetails[`strIngredient${i}`] !== '')
               && (ingredientsDetails[`strIngredient${i}`] !== null);
        i += 1) {
        ingredients.push(
          ingredientsDetails[`strIngredient${i}`] + ingredientsDetails[`strMeasure${i}`],
        );
      }
      if (ingredients.length === NUMBER_CINQUENTA) return null;
      return ingredients;
    };
    const buttonFinishDisabled = () => {
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const type = path.includes('foods') ? 'meals' : 'cocktails';
      if (getLocal && getIngredientArray() !== null) {
        const ingredientsChecked = getLocal[type][idPath] || [];
        if (ingredientsChecked.length === getIngredientArray().length) {
          setButtonFinish(false);
        } else {
          setButtonFinish(true);
        }
      }
    };
    buttonFinishDisabled();
  }, [ingredientsCheckedList, buttonFinish, ingredientsDetails, path, idPath]);
  useEffect(() => {
    const getRecipeInAPI = async () => {
      if (path.includes('foods')) {
        const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idPath}`;
        const food = await requestApi(URL);
        const actualFood = await food[0];
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
        const actualDrink = await drink[0];
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
      setIngredientsCheckedList((prevState) => [...prevState, target.value]);
      verifyPath(target.value, idPath);
    } else {
      const removeChecked = ingredientsCheckedList.filter(
        (item) => item !== target.value,
      );
      setIngredientsCheckedList(removeChecked);
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const type = path.includes('foods') ? 'meals' : 'cocktails';
      const ingredientsLocal = getLocal[type][idPath] || [];
      const removeLocal = ingredientsLocal
        .filter((ingredients) => ingredients !== target.value);
      const saveObj = {
        ...getLocal,
        [type]: {
          ...getLocal[type],
          [idPath]: removeLocal,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(saveObj));
    }
  };
  const checkedIngredients = (ingredient) => {
    const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocal) {
      if (path.includes('foods') && getLocal.meals[idPath]) {
        return getLocal.meals[idPath].includes(ingredient);
      }
      if (path.includes('drinks') && getLocal.cocktails[idPath]) {
        return getLocal.cocktails[idPath].includes(ingredient);
      }
    }
  };
  const riscar = (name) => {
    const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const type = path.includes('foods') ? 'meals' : 'cocktails';
    if (getLocal) {
      const ingredientsChecked = getLocal[type][idPath] || [];
      if (ingredientsCheckedList.length === 0) {
        return false;
      }
      return ingredientsChecked
        .some((ingredient) => ingredient === name);
    }
    return ingredientsCheckedList
      .some((ingredient) => ingredient === name);
  };
  const tags = (chave) => {
    if (chave === null) return [];
    const tagsArray = chave.split(',');
    return tagsArray;
  };
  const onClickFinish = () => {
    const date = new Date();
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    const array = [ingredientsDetails.strTags];
    const newDoneRecipe = {
      id: ingredientsDetails.idMeal || ingredientsDetails.idDrink,
      type: findRecipeType(),
      nationality: ingredientsDetails.strArea || '',
      category: ingredientsDetails.strCategory || '',
      alcoholicOrNot: ingredientsDetails.strAlcoholic,
      name: ingredientsDetails.strMeal || ingredientsDetails.strDrink,
      image: ingredientsDetails.strMealThumb || ingredientsDetails.strDrinkThumb,
      doneDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      tags: tags(array[0]),
    };
    const doneRecipe = done ? [...done, newDoneRecipe] : [newDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
    history.push('/done-recipes');
  };
  return (
    <div className="mt-3">
      { getIngredient() && (
        <main
          className="mt-3 w-[330px] border-2 border-zinc-300 bg-zinc-200
            flex flex-col items-center justify-center rounded-lg m-auto"
        >
          <h3
            data-testid="recipe-title"
            className="text-center text-zinc-700 left-0 w-[300px] h-auto
            mt-2.5 mb-0 break-words text-3xl font-extrabold"
          >
            { recipeDetails.name }
          </h3>
          <img
            src={ recipeDetails.img }
            alt={ recipeDetails.name }
            className="w-[85%] rounded-xl mt-2.5"
            data-testid="recipe-photo"
          />
          <div className="flex mt-3">
            <ShareButton path={ `/${findRecipeType()}s/${idPath}` } data="share-btn" />
            <FavoriteButton
              btnValue={ JSON.stringify(ingredientsDetails) }
              recipeID={ idPath }
              recipeType={ findRecipeType() }
              data="favorite-btn"
            />
          </div>
          <p
            data-testid="recipe-category"
            className="text-center text-zinc-400 font-bold left-0 text-xl mt-2.5"
          >
            { recipeDetails.category }
          </p>
          <div className="flex flex-col">
            { getIngredient().map((ingredients, i) => (
              <label
                data-testid={ `${i}-ingredient-step` }
                htmlFor={ `ingredient-${i}` }
                key={ i }
                style={ riscar(ingredients)
                  ? { textDecoration: 'line-through' } : null }
              >
                <input
                  id={ `ingredient-${i}` }
                  type="checkbox"
                  name={ ingredients }
                  value={ ingredients }
                  checked={ checkedIngredients(ingredients) }
                  onChange={ onclickChecked }
                />
                {' '}
                { ingredients }
              </label>))}
          </div>
          <p
            data-testid="instructions"
            className="text-zinc-600 left-0 w-[300px] h-auto
              mt-2.5 mb-0 break-words text-justify"
          >
            { recipeDetails.instructions }
          </p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ buttonFinish }
            onClick={ onClickFinish }
            className="bg-red-500 text-white w-16 rounded hover:bg-red-700
              disabled:bg-red-300 font-bold"
          >
            Finalizar
          </button>
        </main>
      )}
    </div>);
}
export default RecipeProgress;
