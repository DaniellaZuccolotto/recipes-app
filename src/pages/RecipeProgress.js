import React from 'react';

function RecipeProgress() {
  const recipes = [{
    idMeal: '52768',
    strCategory: 'Dessert',
    strIngredient1: 'digestive biscuits',
    strIngredient2: 'butter',
    strIngredient3: 'Bramley apples',
    strIngredient4: 'butter, softened',
    strIngredient5: 'caster sugar',
    strIngredient6: 'free-range eggs, beaten',
    strIngredient7: 'ground almonds',
    strIngredient8: 'almond extract',
    strIngredient9: 'flaked almonds',
    strInstructions: `Preheat the oven to 200C/180C Fan/Gas 6.
    \r\nPut the biscuits in a largere-sealable freezer bag and bash
     with a rolling pin into fine crumbs. Melt the butter in a small pan,
     then add the biscuit crumbs and stir until coated with butter.
     Tip into the tart tin and, using the back of a spoon, press over the
     base and sides of the tin to give an even layer. Chill in the fridge
     while you make the filling.\r\nCream together the butter and sugar until
     light and fluffy. You can do this in a food processor if you have one. Process
     for 2-3 minutes. Mix in the eggs, then add the ground almonds and almond
     extract and blend until well combined.\r\nPeel the apples, and cut thin
     slices of apple. Do this at the last minute to prevent the apple going brown.
     Arrange the slices over the biscuit base. Spread the frangipane filling evenly on
     top.Level the surface and sprinkle with the flaked almonds.\r\nBake for 20-25
     minutes until golden-brown and set.\r\nRemove from the oven and leave to cool
     for 15 minutes. Remove the sides of the tin. An easy way to do this is to
     stand the tin on a can of beans and push down gently on the edges of the tin.
     \r\nTransfer the tart, with the tin base attached, to a serving plate.
     Serve warm with cream, crème fraiche or ice cream.`,
    strMeal: 'Apple Frangipan Tart',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
  }];

  const arrayIngredients = [
    recipes[0].strIngredient1,
    recipes[0].strIngredient2,
    recipes[0].strIngredient3,
    recipes[0].strIngredient4,
    recipes[0].strIngredient5,
    recipes[0].strIngredient6,
    recipes[0].strIngredient7,
    recipes[0].strIngredient8,
    recipes[0].strIngredient9,
  ];

  return (
    <main>
      <h3 data-testid="recipe-title">{ recipes[0].strMeal }</h3>
      <img
        src={ recipes[0].strMealThumb }
        alt={ recipes[0].strMeal }
        style={ { width: 100 } }
        data-testid="recipe-photo"
      />
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <p data-testid="recipe-category">{ recipes[0].strCategory }</p>
      {
        arrayIngredients.map((ingredients, i) => (
          <label htmlFor={ ingredients } key={ i }>
            { ingredients }
            <input
              id={ ingredients }
              type="checkbox"
            />
          </label>
        ))
      }
      <p data-testid="instructions">{ recipes[0].strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn">
        Finalizar
      </button>
    </main>

  );
}

export default RecipeProgress;
