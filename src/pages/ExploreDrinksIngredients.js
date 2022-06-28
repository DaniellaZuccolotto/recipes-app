import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardsIngredients from '../components/CardsIngredients';
import requestAPi from '../helpers/requestApi';

const INGREDIENTS_LIST_LENGTH = 12;

function ExploreDrinksIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);

  const getIngredients = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const result = await requestAPi(URL);
    setIngredientsList(result);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <Header pageName="Explore Ingredients" searchEnabled={ false } />

      <section>
        { ingredientsList.length > 0
          && ingredientsList
            .slice(0, INGREDIENTS_LIST_LENGTH).map(({ strIngredient1 }, index) => (
              <div key={ index }>
                <CardsIngredients
                  ingredients={ strIngredient1 }
                  index={ index }
                  type="drinks"
                />
              </div>))}
      </section>

      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
