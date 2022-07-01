import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <div className="bg-red-800 w-[360px] flex justify-between text-white">
        <input
          type="image"
          src={ drinkIcon }
          alt="drinks"
          data-testid="drinks-bottom-btn"
          onClick={ () => { history.push('/drinks'); } }
          className="bg-white rounded-full h-10 w-10 ml-1 my-1 px-1"
        />
        <input
          type="image"
          src={ exploreIcon }
          alt="explore"
          data-testid="explore-bottom-btn"
          onClick={ () => { history.push('/explore'); } }
          className="bg-white rounded-full h-10 w-10 ml-1 my-1 px-1"

        />
        <input
          type="image"
          src={ mealIcon }
          alt="foods"
          data-testid="food-bottom-btn"
          onClick={ () => { history.push('/foods'); } }
          className="bg-white rounded-full h-10 w-10 mr-1 my-1 px-1"
        />
      </div>
    </footer>
  );
}

export default Footer;
