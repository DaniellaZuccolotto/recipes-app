import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeContext from '../provider/RecipesContext';
import requestApi from '../helpers/requestApi';
import Footer from '../components/Footer';
import CardsRecipe from '../components/CardsRecipe';

const FOOD_LIST_LENGTH = 12;
const FOOD_CATEG_LENGTH = 5;

function Foods() {
  const { dataApi, setDataApi,
    cardsRecipes, setCardsRecipes } = useContext(RecipeContext);
  const [categories, setCategories] = useState([]);
  const [recipesList, setRecipesList] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');

  const findFoods = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const foodList = await requestApi(URL);
    setRecipesList(foodList);
  };

  const foodCateg = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const categList = await requestApi(URL);
    setCategories(categList);
  };

  const onCategoryClick = async ({ target: { name } }) => {
    if (selectedCat !== name) {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
      const categFoods = await requestApi(URL);
      setSelectedCat(name);
      setDataApi(categFoods);
      setCardsRecipes(false);
    } else {
      setSelectedCat('All');
      setCardsRecipes(false);
      findFoods();
    }
  };

  const onAllClick = async () => {
    if (selectedCat !== 'All') {
      setSelectedCat('All');
      setCardsRecipes(false);
      findFoods();
    }
  };

  useEffect(() => {
    findFoods();
    foodCateg();
  }, []);

  useEffect(() => {
    setRecipesList(dataApi);
  }, [dataApi]);

  useEffect(() => {
    if (cardsRecipes) setSelectedCat('None');
  }, [cardsRecipes]);

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
          categories.slice(0, FOOD_CATEG_LENGTH).map(({ strCategory }, id) => (
            <button
              type="button"
              name={ strCategory }
              key={ id }
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
          recipesList
            .slice(0, FOOD_LIST_LENGTH).map((recipes, index) => (
              <div key={ index }>
                <CardsRecipe
                  recipes={ recipes }
                  index={ index }
                  type="foods"
                />
              </div>))
        }
      </section>
      <Footer />
    </main>
  );
}

export default Foods;
