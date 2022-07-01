import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeContext from '../provider/RecipesContext';
import requestApi from '../helpers/requestApi';
import Footer from '../components/Footer';
import CardsRecipe from '../components/CardsRecipe';

const FOOD_LIST_LENGTH = 12;

function ExploreFoodsNationalities() {
  const { dataApi, setDataApi,
    cardsRecipes, setCardsRecipes } = useContext(RecipeContext);
  const [nationalities, setNatioNalities] = useState([]);
  const [recipesList, setRecipesList] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState('');

  const findFoods = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const foodList = await requestApi(URL);
    setRecipesList(foodList);
  };

  const getNationalities = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const nationalityList = await requestApi(URL);
    setNatioNalities(nationalityList);
  };

  const onNationalityChange = async ({ target: { value } }) => {
    if (value === 'All') {
      findFoods();
    } else if (selectedNationality !== value) {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
      const nationalityFoods = await requestApi(URL);
      setDataApi(nationalityFoods);
      setCardsRecipes(false);
    } else {
      setCardsRecipes(false);
      findFoods();
    }
  };

  useEffect(() => {
    if (dataApi.length === 0) findFoods();
    getNationalities();
  }, [dataApi]);

  useEffect(() => {
    setRecipesList(dataApi);
  }, [dataApi]);

  useEffect(() => {
    if (cardsRecipes) setSelectedNationality('None');
  }, [cardsRecipes]);

  return (
    <div>
      <Header pageName="Explore Nationalities" />

      <div>

        <select
          onChange={ onNationalityChange }
          data-testid="explore-by-nationality-dropdown"
          className="bg-red-500 text-white w-[150px] ml-[30%] mt-1 rounded
          font-bold mb-1 border-2 border-amber-200"
        >
          <option
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {
            nationalities.map(({ strArea }, index) => (
              <option
                value={ strArea }
                key={ index }
                data-testid={ `${strArea}-option` }
              >
                {strArea}
              </option>

            ))
          }
        </select>

      </div>
      <section className="flex flex-wrap justify-center items-center pb-[50px]">
        {
          recipesList
            .slice(0, FOOD_LIST_LENGTH).map((recipes, index) => (
              <div key={ index }>
                <CardsRecipe
                  recipes={ recipes }
                  index={ index }
                  type="foods"
                />
              </div>))
        }
      </section>
      <Footer />
    </div>
  );
}

export default ExploreFoodsNationalities;
