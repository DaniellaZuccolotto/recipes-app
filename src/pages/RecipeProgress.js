import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import requestApi from '../helpers/requestApi';
import RecipeContext from '../provider/RecipesContext';

function RecipeProgress() {
  const { verifyPath } = useContext(RecipeContext);
  const history = useHistory();
  const path = history.location.pathname;
  const idPath = path.replace(/[^0-9]/g, '');
  const [heart, setHeart] = useState(whiteHeartIcon);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredientsDetails, setIngredientsDetails] = useState({});
  const [ingredientsCheckedList, setIngredientsCheckedList] = useState([]);
  const [copied, setCopied] = useState(false);
  const [buttonFinish, setButtonFinish] = useState(true);

  useEffect(() => {
    const checkHeart = () => {
      const getLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (getLocal) {
        getLocal.some((favorite) => {
          if (favorite.id === idPath) {
            setHeart(blackHeartIcon);
            return true;
          }
          setHeart(whiteHeartIcon);
          return false;
        });
      }
    };
    checkHeart();
  }, [idPath]);

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
      if (ingredientsCheckedList.length !== 0 && getIngredientArray() !== null) {
        if (ingredientsCheckedList.length === getIngredientArray().length) {
          setButtonFinish(false);
        } else {
          setButtonFinish(true);
        }
      }
    };

    buttonFinishDisabled();
  }, [ingredientsCheckedList, buttonFinish, ingredientsDetails]);

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

  const onClickFavorite = ({ target: { value } }) => {
    const parseValue = JSON.parse(value);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (heart === whiteHeartIcon) {
      const newFav = {
        id: parseValue.idMeal || parseValue.idDrink,
        type: path.includes('foods') ? 'food' : 'drink',
        nationality: parseValue.strArea || '',
        category: parseValue.strCategory || '',
        alcoholicOrNot: parseValue.strAlcoholic || '',
        name: parseValue.strMeal || parseValue.strDrink,
        image: parseValue.strMealThumb || parseValue.strDrinkThumb,
      };

      const newFavList = favoriteRecipes ? [...favoriteRecipes, newFav] : [newFav];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavList));
      setHeart(blackHeartIcon);
    } else {
      const newReduceFavorites = favoriteRecipes
        .filter(({ id: foodId }) => foodId !== idPath);

      localStorage.setItem('favoriteRecipes', JSON.stringify(newReduceFavorites));
      setHeart(whiteHeartIcon);
    }
  };

  const shareRecipe = () => {
    const pathName = path.includes('foods') ? 'foods' : 'drinks';
    navigator.clipboard.writeText(`http://localhost:3000/${pathName}/${idPath}`);
    setCopied(true);
  };

  const riscar = (name) => ingredientsCheckedList
    .some((ingredient) => ingredient === name);

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
            <input
              type="image"
              src={ shareIcon }
              alt="Botão de compartilhamento"
              data-testid="share-btn"
              onClick={ shareRecipe }
            />
            {
              copied && (
                <p>Link copied!</p>
              )
            }
            <input
              src={ heart }
              type="image"
              alt="Botão de favorito"
              onClick={ onClickFavorite }
              data-testid="favorite-btn"
              value={ JSON.stringify(ingredientsDetails) }
            />
            <p data-testid="recipe-category">{ recipeDetails.category }</p>
            { getIngredient().map((ingredients, i) => (
              <label
                data-testid={ `${i}-ingredient-step` }
                htmlFor={ `ingredient-${i}` }
                key={ i }
                style={ riscar(ingredients) ? { textDecoration: 'line-through' } : null }
              >
                { ingredients }
                <input
                  id={ `ingredient-${i}` }
                  type="checkbox"
                  name={ ingredients }
                  value={ ingredients }
                  checked={ checkedIngredients(ingredients) }
                  onChange={ onclickChecked }
                />
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
