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
      <div
        className="w-[80%] h-28 border-2 border-zinc-300 bg-zinc-200 flex flex-col
        items-center justify-center rounded-lg m-[auto] mt-[50%]"
      >
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ handleByIngredientsBtn }
          className="bg-red-500 text-white w-[150px] ml-1 mt-1 rounded hover:bg-red-700
          font-bold mb-1 border-2 border-amber-200"
        >
          By Ingredient
        </button>

        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleSurpriseBtn }
          className="bg-red-500 text-white w-[150px] ml-1 mt-1 rounded hover:bg-red-700
          font-bold mb-1 border-2 border-amber-200"
        >
          Surprise me!
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default ExploreDrinks;
