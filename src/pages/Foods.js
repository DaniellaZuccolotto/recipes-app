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
    if (dataApi.length === 0) findFoods();
    foodCateg();
  }, [dataApi]);

  useEffect(() => {
    setRecipesList(dataApi);
  }, [dataApi]);

  useEffect(() => {
    if (cardsRecipes) setSelectedCat('None');
  }, [cardsRecipes]);

  return (
    <main>
      <Header pageName="Foods" />
      <div className="ml-[25px] mt-2 w-[310px] flex flex-wrap">
        <button
          type="button"
          onClick={ onAllClick }
          data-testid="All-category-filter"
          className="bg-red-500 text-white w-[98px] ml-1 mt-1 rounded hover:bg-red-700
          font-bold border-2 border-amber-200"
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
              className="bg-red-500 text-white w-[98px] ml-1 mt-1 rounded
              hover:bg-red-700 font-bold border-2 border-amber-200"
            >
              { strCategory }
            </button>
          ))
        }
      </div>
      <section className="flex flex-wrap justify-center items-center pb-[50px]">
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
