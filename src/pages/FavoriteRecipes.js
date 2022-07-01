import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [remover, setRemover] = useState(false);
  const [filter, setFilter] = useState('all');

  const getFavorites = () => {
    const results = localStorage.getItem('favoriteRecipes');
    setFavorites(JSON.parse(results) || []);
  };

  const onFilterClick = ({ target: { value } }) => {
    setFilter(value);
  };

  useEffect(() => {
    getFavorites();
  }, [remover]);

  return (
    <div>
      <Header pageName="Favorite Recipes" searchEnabled={ false } />
      <main>
        <div className="flex justify-center items-center">
          <button
            type="button"
            name="all-button"
            value="all"
            data-testid="filter-by-all-btn"
            onClick={ onFilterClick }
            className="bg-red-500 text-white w-[98px] ml-1 mt-2 mb-2 rounded
            hover:bg-red-700 font-bold border-2 border-amber-200"
          >
            All
          </button>
          <button
            type="button"
            name="food-button"
            value="food"
            data-testid="filter-by-food-btn"
            onClick={ onFilterClick }
            className="bg-red-500 text-white w-[98px] ml-1 mt-2 mb-2 rounded
            hover:bg-red-700 font-bold border-2 border-amber-200"
          >
            Food
          </button>
          <button
            type="button"
            name="drink-button"
            value="drink"
            data-testid="filter-by-drink-btn"
            onClick={ onFilterClick }
            className="bg-red-500 text-white w-[98px] ml-1 mt-2 mb-2 rounded
            hover:bg-red-700 font-bold border-2 border-amber-200"
          >
            Drinks
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          { favorites.length > 0
            ? favorites
              .filter((recipe) => {
                if (filter === 'all') return true;
                return recipe.type === filter;
              })
              .map((recipe, index) => (
                <div
                  key={ recipe.id }
                  className="flex items-center rounded-md border-2 border-zinc-300
                   bg-zinc-200 w-[90%] mb-[5px]"
                >
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <img
                      src={ recipe.image }
                      alt={ recipe.name }
                      className="w-[115px] ml-3 mb-1 mt-1 rounded-lg"
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>
                  <section className="flex flex-col justify-center items-center ml-4">
                    <Link to={ `/${recipe.type}s/${recipe.id}` }>
                      <h3
                        data-testid={ `${index}-horizontal-name` }
                        className="text-center text-zinc-700 font-bold text-lg mt-2 mb-0"
                      >
                        { recipe.name }
                      </h3>
                    </Link>
                    { recipe.type === 'drink' && (
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                        className="mb-0 mt-0 text-center text-zinc-500 font-bold"
                      >
                        { recipe.alcoholicOrNot }
                      </p>
                    )}
                    { recipe.type === 'food' && (
                      <div>
                        <p
                          data-testid={ `${index}-horizontal-top-text` }
                          className="mb-0 mt-0 text-center text-zinc-500 font-bold"
                        >
                          {`${recipe.nationality} - ${recipe.category}`}
                        </p>
                      </div>
                    )}
                    <div className="flex content-between">
                      <FavoriteButton
                        btnValue={ JSON.stringify(recipe) }
                        recipeID={ recipe.id }
                        recipeType={ recipe.type }
                        remover={ setRemover }
                        data={ `${index}-horizontal-favorite-btn` }
                      />
                      <ShareButton
                        path={ `/${recipe.type}s/${recipe.id}` }
                        data={ `${index}-horizontal-share-btn` }
                      />
                    </div>
                  </section>
                </div>
              ))
            : <h2>No favorites yet!</h2> }
        </div>
      </main>
    </div>
  );
}

export default FavoriteRecipes;
