import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <div>
        <input
          type="image"
          src={ drinkIcon }
          alt="drinks"
          data-testid="drinks-bottom-btn"
        // onClick={  }
        />
        <input
          type="image"
          src={ exploreIcon }
          alt="explore"
          data-testid="explore-bottom-btn"
          // onClick={  }

        />
        <input
          type="image"
          src={ mealIcon }
          alt="foods"
          data-testid="food-bottom-btn"
          // onClick={  }
        />
      </div>
    </footer>
  );
}

export default Footer;
