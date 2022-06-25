import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  const email = JSON.parse(localStorage.getItem('user'));
  console.log(email.email);
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
      <p role="paragraph" data-testid="profile-email">{email.email}</p>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleDoneRecipesClick }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleFavoriteClick }
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogoutClick }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
