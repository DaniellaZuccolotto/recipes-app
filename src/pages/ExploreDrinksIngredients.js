import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import CardsIngredients from '../components/CardsIngredients';
// import requestAPi from '../helpers/requestApi';

// const INGREDIENTS_LIST_LENGTH = 12;

function ExploreDrinksIngredients() {
  const [/* ingredientsList, */setIngredientsList] = useState([]);

  const getIngredients = async () => {
    const URL = 'www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const result = await fetch(URL);
    const ingredients = await result.json();
    console.log(ingredients);
    setIngredientsList(ingredients);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <Header pageName="Explore Ingredients" searchEnabled={ false } />

      {/* <section>
        {
          ingredientsList
            .slice(0, INGREDIENTS_LIST_LENGTH).map((ingredient, index) => (
              <div key={ index }>
                <CardsIngredients
                  ingredients={ ingredient }
                  index={ index }
                  type="drinks"
                />
              </div>))
        }
      </section> */}

      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
