import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import requestAPI from '../helpers/requestApi';

function ExploreFoods() {
  const history = useHistory();

  const handleByIngredientsBtn = () => {
    history.push('/explore/foods/ingredients');
  };

  const handleByNationalityBtn = () => {
    history.push('/explore/foods/nationalities');
  };

  const handleSurpriseBtn = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const randomFood = await requestAPI(URL);
    console.log(randomFood);
    history.push(`/foods/${randomFood[0].idMeal}`);
  };

  return (
    <div>
      <Header pageName="Explore Foods" searchEnabled={ false } />

      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ handleByIngredientsBtn }
      >
        By Ingredient
      </button>

      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ handleByNationalityBtn }
      >
        By Nationality
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

export default ExploreFoods;
