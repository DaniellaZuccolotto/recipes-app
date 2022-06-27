import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import requestApi from '../helpers/requestApi';

function RecipeProgress() {
  const history = useHistory();
  const path = history.location.pathname;
  const idPath = path.replace(/[^0-9]/g, '');
  const [heart, setHeart] = useState(whiteHeartIcon);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredientsDetails, setIngredientsDetails] = useState({});
  const [ingredientsCheckedList, setIngredientsCheckedList] = useState([]);
  // const [saveIgredients, setSaveIgredients] = useState({
  //   cocktails: {},
  //   meals: {},
  // });

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

  const verifyKey = (local, type, value) => (local[type][idPath]
    ? [...local[type][idPath], value] : [value]);

  const onclickChecked = ({ target }) => {
    if (target.checked) {
      setIngredientsCheckedList((prevState) => [...prevState, target.value]);
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (path.includes('foods')) {
        if (getLocal) {
          const food = {
            ...getLocal,
            meals: {
              ...getLocal.meals,
              [idPath]: verifyKey(getLocal, 'meals', target.value),
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(food));
        } else {
          const food = {
            cocktails: {},
            meals: {
              [idPath]: [target.value],
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(food));
        }
      }
      if (path.includes('drinks')) {
        if (getLocal) {
          const drink = {
            ...getLocal,
            cocktails: {
              ...getLocal.cocktails,
              [idPath]: verifyKey(getLocal, 'cocktails', target.value),
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(drink));
        } else {
          const drink = {
            meals: {},
            cocktails: {
              [idPath]: [target.value],
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(drink));
        }
      }
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

  const onClickFavorite = () => {
    if (heart === whiteHeartIcon) {
      return setHeart(blackHeartIcon);
    }
    return setHeart(whiteHeartIcon);
  };

  const riscar = (name) => ingredientsCheckedList
    .some((ingredient) => ingredient === name);

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
                style={ riscar(ingredients) ? { textDecoration: 'line-through' } : null }
              >
                { ingredients }
                <input
                  id={ `ingredient-${i}` }
                  type="checkbox"
                  name={ ingredients }
                  value={ ingredients }
                  checked={ checkedIngredients(ingredients) }
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
