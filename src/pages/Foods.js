import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipeContext from '../provider/RecipesContext';
import CardsRecipeFoods from '../components/CardsRecipeFoods';

function Foods() {
  const { cardsRecipes, dataApi } = useContext(RecipeContext);
  return (
    <div>
      <Header pageName="Foods" />
      {
        cardsRecipes && dataApi.meals.map((recipes, index) => {
          const NUMBER_TWELVE = 12;
          if (index >= NUMBER_TWELVE) return null;
          return (
            <CardsRecipeFoods
              key={ index }
              recipes={ recipes }
              index={ index }
            />);
        })
      }
    </div>
  );
}

export default Foods;
