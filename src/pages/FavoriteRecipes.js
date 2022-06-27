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
    setFavorites(JSON.parse(results));
  };

  const onFilterClick = ({ target: { value } }) => {
    setFilter(value);
  };

  useEffect(() => {
    getFavorites();
  }, [remover]);

  console.log(favorites);
  return (
    <div>
      <Header pageName="Favorite Recipes" searchEnabled={ false } />
      <main>
        <div>
          <button
            type="button"
            name="all-button"
            value="all"
            data-testid="filter-by-all-btn"
            onClick={ onFilterClick }
          >
            All
          </button>
        </div>
        {
          favorites
            .filter((recipe) => {
              if (filter === 'all') return true;
              return recipe.type === filter;
            })
            .map((recipe, index) => (
              <div key={ recipe.id }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    style={ { width: 150 } }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <section>
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <h3 data-testid={ `${index}-horizontal-name` }>
                      { recipe.name }
                    </h3>
                  </Link>
                  { recipe.type === 'drink' && (
                    <p>{ recipe.alcoholicOrNot }</p>
                  )}
                  { recipe.type === 'food' && (
                    <div>
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        { recipe.category }
                      </p>
                      <p>{ recipe.nationality }</p>
                    </div>
                  )}
                  <div>
                    <FavoriteButton
                      btnValue={ JSON.stringify(recipe) }
                      recipeID={ recipe.id }
                      recipeType={ recipe.type }
                      remover={ setRemover }
                    />
                    <ShareButton
                      path={ `/${recipe.type}s/${recipe.id}` }
                      id={ index }
                    />
                  </div>
                </section>
              </div>
            ))
        }
      </main>
    </div>
  );
}

export default FavoriteRecipes;
