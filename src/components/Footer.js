import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <div>
        <input
          type="image"
          src={ drinkIcon }
          alt="drinks"
          data-testid="drinks-bottom-btn"
          onClick={ () => { history.push('/drinks'); } }
        />
        <input
          type="image"
          src={ exploreIcon }
          alt="explore"
          data-testid="explore-bottom-btn"
          onClick={ () => { history.push('/explore'); } }

        />
        <input
          type="image"
          src={ mealIcon }
          alt="foods"
          data-testid="food-bottom-btn"
          onClick={ () => { history.push('/foods'); } }
        />
      </div>
    </footer>
  );
}

export default Footer;
