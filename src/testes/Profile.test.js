import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const EMAIL = 'teste@test.com';

describe('Testa a página Profile', () => {
  test('Verifica se existem os botões Done Recipes, Favorite Recipes, Logout', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('user', JSON.stringify(EMAIL));
    history.push('/profile');

    const DoneRecipesButton = screen.getByRole('button', {
      name: /done recipes/i,
    });
    expect(DoneRecipesButton).toBeDefined();

    const FavoriteRecipesButton = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    expect(FavoriteRecipesButton).toBeDefined();

    const LogoutButton = screen.getByRole('button', {
      name: /logout/i,
    });
    expect(LogoutButton).toBeDefined();
  });

  test('Verifica se o email vindo do LocalStorage aparece', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('user', JSON.stringify(EMAIL));
    history.push('/profile');
    const userEmail = JSON.parse(localStorage.getItem('user'));
    const emailEl = screen.getByRole('paragraph', { name: userEmail.email });
    expect(emailEl).toBeInTheDocument();
  });

  test('Verifica se o botão "Done Recipes" redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('user', JSON.stringify(EMAIL));
    history.push('/profile');

    const DoneRecipesButtonEl = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(DoneRecipesButtonEl);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Verifica se o botão "Favorite Recipes" redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('user', JSON.stringify(EMAIL));
    history.push('/profile');

    const FavoriteRecipesButton = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    userEvent.click(FavoriteRecipesButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Verifica se o botão Logout limpa LocalStorage e redireciona para o Login', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('user', JSON.stringify(EMAIL));
    history.push('/profile');

    const LogoutButton = screen.getByRole('button', {
      name: /logout/i,
    });
    userEvent.click(LogoutButton);
    expect(localStorage.getItem('user') === null).toBe(true);
    expect(history.location.pathname).toBe('/');
  });
});
