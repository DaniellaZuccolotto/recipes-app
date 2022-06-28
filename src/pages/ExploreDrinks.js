import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import requestAPI from '../helpers/requestApi';

function ExploreDrinks() {
  const history = useHistory();

  const handleByIngredientsBtn = () => {
    history.push('/explore/drinks/ingredients');
  };

  const handleSurpriseBtn = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const randomDrink = await requestAPI(URL);
    history.push(`/drinks/${randomDrink[0].idDrink}`);
  };

  return (
    <div>
      <Header pageName="Explore Drinks" searchEnabled={ false } />

      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ handleByIngredientsBtn }
      >
        By Ingredient
      </button>

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleSurpriseBtn }
      >
        Surprise me!
      </button>

      <Footer />
    </div>
  );
}

export default ExploreDrinks;
