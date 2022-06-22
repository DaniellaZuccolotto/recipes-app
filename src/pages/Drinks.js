import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeContext from '../provider/RecipesContext';
import requestApi from '../helpers/requestApi';

function Drinks() {
  const { dataApi } = useContext(RecipeContext);
  const [drinks, setDrinks] = useState([]);

  const findDrinks = async () => {
    const FOOD_LIST_LENGTH = 12;
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const drinkList = await requestApi(URL);
    const first12Foods = await drinkList.drinks.slice(0, FOOD_LIST_LENGTH);
    setDrinks(first12Foods);
  };

  useEffect(() => {
    findDrinks();
  }, []);

  return (
    <div>
      <Header pageName="Drinks" />
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
