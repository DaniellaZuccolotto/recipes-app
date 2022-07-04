import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();

  const handleExploreFoodsBtn = () => {
    history.push('/explore/foods');
  };

  const handleExploreDrinksBtn = () => {
    history.push('/explore/drinks');
  };

  return (
    <div>
      <Header pageName="Explore" searchEnabled={ false } />
      <div
        className="w-[80%] h-28 border-2 border-zinc-300 bg-zinc-200 flex flex-col
        items-center justify-center rounded-lg m-[auto] mt-[50%]"
      >
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ handleExploreFoodsBtn }
          className="bg-red-500 text-white w-[150px] ml-1 mt-1 rounded hover:bg-red-700
          font-bold mb-1 border-2 border-amber-200"
        >
          Explore Foods
        </button>

        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ handleExploreDrinksBtn }
          className="bg-red-500 text-white w-[150px] ml-1 mt-1 rounded hover:bg-red-700
          font-bold mb-1 border-2 border-amber-200"
        >
          Explore Drinks
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Explore;
