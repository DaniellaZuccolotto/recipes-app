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
        const ingredientsChecked = getLocal[type][idPath];
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
      const ingredientsLocal = getLocal[type][idPath];
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
      const ingredientsChecked = getLocal[type][idPath];
      return ingredientsChecked
        .some((ingredient) => ingredient === name);
    }
    return ingredientsCheckedList
      .some((ingredient) => ingredient === name);
  };

  const onClickFinish = () => {
    history.push('/done-recipes');
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
            <ShareButton path={ `/${findRecipeType()}s/${idPath}` } data="share-btn" />
            <FavoriteButton
              btnValue={ JSON.stringify(ingredientsDetails) }
              recipeID={ idPath }
              recipeType={ findRecipeType() }
              data="favorite-btn"
            />
            <p data-testid="recipe-category">{ recipeDetails.category }</p>
            { getIngredient().map((ingredients, i) => (
              <label
                data-testid={ `${i}-ingredient-step` }
                htmlFor={ `ingredient-${i}` }
                key={ i }
                style={ riscar(ingredients) ? { textDecoration: 'line-through' } : null }
              >
                <input
                  id={ `ingredient-${i}` }
                  type="checkbox"
                  name={ ingredients }
                  value={ ingredients }
                  checked={ checkedIngredients(ingredients) }
                  onChange={ onclickChecked }
                />
                { ingredients }
              </label>
            ))}
            <p data-testid="instructions">{ recipeDetails.instructions }</p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ buttonFinish }
              onClick={ onClickFinish }
            >
              Finalizar
            </button>
          </main>
        )
      }
    </div>
  );
}

export default RecipeProgress;
