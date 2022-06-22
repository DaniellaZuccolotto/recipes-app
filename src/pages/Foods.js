import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeContext from '../provider/RecipesContext';
import requestApi from '../helpers/requestApi';

function Foods() {
  const { dataApi } = useContext(RecipeContext);
  const [foods, setFoods] = useState([]);

  const findFoods = async () => {
    const FOOD_LIST_LENGTH = 12;
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const foodList = await requestApi(URL);
    const first12Foods = await foodList.meals.slice(0, FOOD_LIST_LENGTH);
    setFoods(first12Foods);
  };

  useEffect(() => {
    findFoods();
  }, []);

  return (
    <main>
      <Header pageName="Foods" />
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
