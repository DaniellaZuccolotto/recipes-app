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

      <button
        type="button"
        data-testid="explore-foods"
        onClick={ handleExploreFoodsBtn }
      >
        Explore Foods
      </button>

      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ handleExploreDrinksBtn }
      >
        Explore Drinks
      </button>

      <Footer />
    </div>
  );
}

export default Explore;
