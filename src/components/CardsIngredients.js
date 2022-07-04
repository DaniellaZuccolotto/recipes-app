import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import requestAPI from '../helpers/requestApi';
import RecipeContext from '../provider/RecipesContext';

function CardsIngredients({ ingredients, index, type }) {
  const { setDataApi } = useContext(RecipeContext);
  const history = useHistory();

  const imageUrl = () => {
    let imageURL;
    if (type === 'foods') {
      imageURL = `https://www.themealdb.com/images/ingredients/${ingredients}-Small.png`;
    }
    if (type === 'drinks') {
      imageURL = `https://www.thecocktaildb.com/images/ingredients/${ingredients}-Small.png`;
    }
    return imageURL;
  };

  // useEffect(() => {
  //   const filterByIngredient = async () => {
  //     let url;
  //     if (type === 'foods') url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`;
  //     if (type === 'drinks') url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`;
  //     const recipes = await requestAPI(url);
  //     setTemporaryDataApi(recipes);
  //   };

  //   filterByIngredient();
  // }, [ingredients, setTemporaryDataApi, type]);

  const onClickIngredient = async () => {
    let URL;
    if (type === 'foods') URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`;
    if (type === 'drinks') URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`;
    const recipes = await requestAPI(URL);
    setDataApi(recipes);
    history.push(`/${type}`);
  };

  return (
    <div
      className="w-[150px] border-2 border-zinc-300 bg-zinc-200 flex flex-col
      items-center justify-center rounded-lg m-2 truncate"
    >
      <button type="button" onClick={ onClickIngredient }>
        <main data-testid={ `${index}-ingredient-card` }>
          <h3
            data-testid={ `${index}-card-name` }
            className="bar_content text-center text-zinc-700 font-bold left-0
            max-w-[140px]"
          >
            { ingredients }
          </h3>
          <img
            src={ imageUrl() }
            alt={ ingredients }
            data-testid={ `${index}-card-img` }
            className="w-[130px] h-[130px] mb-3 rounded-lg"
          />
        </main>
      </button>
    </div>
  );
}

CardsIngredients.propTypes = {
  ingredients: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardsIngredients;
