import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  const email = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.email : 'Você não deveria estar aqui!';
  };

  const handleDoneRecipesClick = () => {
    history.push('/done-recipes');
  };

  const handleFavoriteClick = () => {
    history.push('/favorite-recipes');
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header pageName="Profile" searchEnabled={ false } />
      <div
        className="w-[90%]border-2 border-zinc-300 bg-zinc-200 flex flex-col
        items-center justify-center rounded-lg m-2 truncate"
      >

        <p
          role="paragraph"
          data-testid="profile-email"
          className="text-center text-zinc-700 font-bold mt-2"
        >
          {email()}
        </p>

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleDoneRecipesClick }
          className="bg-red-500 text-white w-[150px] ml-1 mt-1 rounded hover:bg-red-700
          font-bold mb-1 border-2 border-amber-200"
        >
          Done Recipes
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleFavoriteClick }
          className="bg-red-500 text-white w-[150px] ml-1 mt-1 rounded hover:bg-red-700
          font-bold mb-1 border-2 border-amber-200"
        >
          Favorite Recipes
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogoutClick }
          className="bg-red-500 text-white w-[150px] ml-1 mt-1 rounded hover:bg-red-700
          font-bold mb-2 border-2 border-amber-200"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
