import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeContext from '../provider/RecipesContext';
import requestApi from '../helpers/requestApi';

function Foods() {
  const { dataApi } = useContext(RecipeContext);
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const findFoods = async () => {
    const FOOD_LIST_LENGTH = 12;
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const foodList = await requestApi(URL);
    const first12Foods = await foodList.meals.slice(0, FOOD_LIST_LENGTH);
    setFoods(first12Foods);
  };

  const foodCateg = async () => {
    const FOOD_CATEG_LENGTH = 5;
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const categList = await requestApi(URL);
    const firstFive = await categList.meals.slice(0, FOOD_CATEG_LENGTH);
    setCategories(firstFive);
  };

  useEffect(() => {
    findFoods();
    foodCateg();
  }, []);

  console.log(categories);
  return (
    <main>
      <Header pageName="Foods" />
      <div>
        {
          categories.map(({ strCategory }) => (
            <button
              type="button"
              name={ strCategory }
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
            >
              { strCategory }
            </button>
          ))
        }
      </div>
      <section>
        {
          dataApi.length === 0 && foods.map(({ strMealThumb, strMeal }, id) => (
            <div key={ strMeal } data-testid={ `${id}-recipe-card` }>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${id}-card-img` }
              />
              <p
                data-testid={ `${id}-card-name` }
              >
                { strMeal }
              </p>
            </div>
          ))
        }
      </section>
    </main>
  );
}

export default Foods;
