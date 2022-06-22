import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeContext from '../provider/RecipesContext';
import requestApi from '../helpers/requestApi';

const FOOD_LIST_LENGTH = 12;
const DRINK_CATEG_LENGTH = 5;

function Drinks() {
  const { dataApi } = useContext(RecipeContext);
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
      setSelectedCat('');
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
          dataApi.length === 0 && drinks.map(({ strDrinkThumb, strDrink }, id) => (
            <div key={ strDrink } data-testid={ `${id}-recipe-card` }>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${id}-card-img` }
              />
              <p
                data-testid={ `${id}-card-name` }
              >
                { strDrink }
              </p>
            </div>
          ))
        }
      </section>
    </div>
  );
}

export default Drinks;
