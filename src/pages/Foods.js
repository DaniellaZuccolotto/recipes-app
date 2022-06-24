import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeContext from '../provider/RecipesContext';
import requestApi from '../helpers/requestApi';
import Footer from '../components/Footer';
import CardsRecipe from '../components/CardsRecipe';

const FOOD_LIST_LENGTH = 12;
const FOOD_CATEG_LENGTH = 5;

function Foods() {
  const { dataApi, cardsRecipes } = useContext(RecipeContext);
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');

  const findFoods = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const foodList = await requestApi(URL);
    const first12Foods = await foodList.meals.slice(0, FOOD_LIST_LENGTH);
    setFoods(first12Foods);
  };

  const foodCateg = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const categList = await requestApi(URL);
    const firstFive = await categList.meals.slice(0, FOOD_CATEG_LENGTH);
    setCategories(firstFive);
  };

  const onCategoryClick = async ({ target: { name } }) => {
    if (selectedCat !== name) {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
      const categFoods = await requestApi(URL);
      const first12CategFoods = await categFoods.meals.slice(0, FOOD_LIST_LENGTH);
      setSelectedCat(name);
      setFoods(first12CategFoods);
    } else {
      setSelectedCat('All');
      findFoods();
    }
  };

  const onAllClick = async () => {
    if (selectedCat !== 'All') {
      setSelectedCat('All');
      findFoods();
    }
  };

  useEffect(() => {
    findFoods();
    foodCateg();
  }, []);

  return (
    <main>
      <Header pageName="Foods" />
      <div>
        <button
          type="button"
          onClick={ onAllClick }
          data-testid="All-category-filter"
        >
          All
        </button>
        {
          categories.map(({ strCategory }) => (
            <button
              type="button"
              name={ strCategory }
              key={ strCategory }
              onClick={ onCategoryClick }
              data-testid={ `${strCategory}-category-filter` }
            >
              { strCategory }
            </button>
          ))
        }
      </div>
      <section>
        {
          dataApi.length === 0 && foods.map((recipes, index) => (
            <CardsRecipe
              key={ index }
              recipes={ recipes }
              index={ index }
              type="foods"
            />
          ))
        }
        {
          cardsRecipes && dataApi.meals.map((recipes, index) => {
            const NUMBER_TWELVE = 12;
            if (index >= NUMBER_TWELVE) return null;
            return (
              <CardsRecipe
                key={ index }
                recipes={ recipes }
                index={ index }
                type="foods"
              />);
          })
        }
      </section>
      <Footer />
    </main>
  );
}

export default Foods;
