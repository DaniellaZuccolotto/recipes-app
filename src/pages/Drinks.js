import React, { useContext } from 'react';
import Header from '../components/Header';
import CardsRecipeDrinks from '../components/CardsRecipeDrinks';
import RecipeContext from '../provider/RecipesContext';

function Drinks() {
  const { cardsRecipes, dataApi } = useContext(RecipeContext);
  console.log(dataApi);
  return (
    <div>
      <Header pageName="Drinks" />
      {
        cardsRecipes && dataApi.drinks.map((recipes, index) => {
          const NUMBER_TWELVE = 12;
          if (index >= NUMBER_TWELVE) return null;
          return (
            <CardsRecipeDrinks
              key={ index }
              recipes={ recipes }
              index={ index }
            />);
        })
      }
    </div>
  );
}

export default Drinks;
