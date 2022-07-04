import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardsIngredients from '../components/CardsIngredients';
import requestAPi from '../helpers/requestApi';

const INGREDIENTS_LIST_LENGTH = 12;

function ExploreFoodsIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);

  const getIngredients = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const result = await requestAPi(URL);
    setIngredientsList(result);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <Header pageName="Explore Ingredients" searchEnabled={ false } />
      <section className="flex flex-wrap justify-center items-center pb-[50px]">
        {
          ingredientsList
            .slice(0, INGREDIENTS_LIST_LENGTH).map(({ strIngredient }, index) => (
              <div key={ index }>
                <CardsIngredients
                  ingredients={ strIngredient }
                  index={ index }
                  type="foods"
                />
              </div>))
        }
      </section>
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;
