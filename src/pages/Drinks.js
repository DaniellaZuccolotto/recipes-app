import React, { useContext, useEffect, useState } from 'react';
import requestApi from '../helpers/requestApi';
import Header from '../components/Header';
import RecipeContext from '../provider/RecipesContext';
import Footer from '../components/Footer';
import CardsRecipe from '../components/CardsRecipe';

const FOOD_LIST_LENGTH = 12;
const DRINK_CATEG_LENGTH = 5;

function Drinks() {
  const { dataApi, cardsRecipes } = useContext(RecipeContext);
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');

  const findDrinks = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const drinkList = await requestApi(URL);
    const first12Foods = await drinkList.drinks.slice(0, FOOD_LIST_LENGTH);
    setDrinks(first12Foods);
  };

  const drinkCateg = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const categList = await requestApi(URL);
    const firstFive = await categList.drinks.slice(0, DRINK_CATEG_LENGTH);
    setCategories(firstFive);
  };

  const onCategoryClick = async ({ target: { name } }) => {
    if (selectedCat !== name) {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
      const categDrinks = await requestApi(URL);
      const first12CategDrinks = await categDrinks.drinks.slice(0, FOOD_LIST_LENGTH);
      setSelectedCat(name);
      setDrinks(first12CategDrinks);
    } else {
      setSelectedCat('All');
      findDrinks();
    }
  };

  const onAllClick = async () => {
    if (selectedCat !== 'All') {
      setSelectedCat('All');
      findDrinks();
    }
  };

  useEffect(() => {
    findDrinks();
    drinkCateg();
  }, []);

  return (
    <div>
      <Header pageName="Drinks" />
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
          dataApi.length === 0 && drinks.map((recipes, index) => (
            <CardsRecipe
              key={ index }
              recipes={ recipes }
              index={ index }
              type="drinks"
            />
          ))
        }
        {
          cardsRecipes && dataApi.drinks.map((recipes, index) => {
            if (index >= FOOD_LIST_LENGTH) return null;
            return (
              <CardsRecipe
                key={ index }
                recipes={ recipes }
                index={ index }
                type="drinks"
              />);
          })
        }
      </section>
      <Footer />
    </div>
  );
}

export default Drinks;
