import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ btnValue, recipeID, recipeType, remover }) {
  const [heart, setHeart] = useState(whiteHeartIcon);

  const onClickFavorite = ({ target: { value } }) => {
    const parseValue = JSON.parse(value);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (heart === whiteHeartIcon) {
      const newFav = {
        id: parseValue.idMeal || parseValue.idDrink,
        type: recipeType,
        nationality: parseValue.strArea || '',
        category: parseValue.strCategory || '',
        alcoholicOrNot: parseValue.strAlcoholic || '',
        name: parseValue.strMeal || parseValue.strDrink,
        image: parseValue.strMealThumb || parseValue.strDrinkThumb,
      };

      const newFavList = favoriteRecipes ? [...favoriteRecipes, newFav] : [newFav];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavList));
      setHeart(blackHeartIcon);
    } else {
      const newReduceFavorites = favoriteRecipes
        .filter(({ id: foodId }) => foodId !== recipeID);

      localStorage.setItem('favoriteRecipes', JSON.stringify(newReduceFavorites));
      if (remover) remover((prev) => !prev);
      setHeart(whiteHeartIcon);
    }
  };

  useEffect(() => {
    const recipeFavorite = () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes) {
        const verifica = favoriteRecipes.some((rec) => rec.id === recipeID);
        setHeart(verifica ? blackHeartIcon : whiteHeartIcon);
      }
    };

    recipeFavorite();
  }, [recipeID]);

  return (
    <input
      src={ heart }
      type="image"
      alt="Botão de favorito"
      onClick={ onClickFavorite }
      value={ btnValue }
      data-testid="favorite-btn"
    />
  );
}

FavoriteButton.propTypes = {
  btnValue: PropTypes.string.isRequired,
  recipeID: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
  remover: PropTypes.func,
};

FavoriteButton.defaultProps = {
  remover: null,
};

export default FavoriteButton;
