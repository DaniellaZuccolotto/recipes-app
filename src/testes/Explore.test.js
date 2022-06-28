import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página Explore', () => {
  test('Verifica se existem os botões Explore Foods e Explore Drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const ExploreFoodsButton = screen.getByRole('button', {
      name: /explore foods/i,
    });
    expect(ExploreFoodsButton).toBeDefined();

    const ExploreDrinksButton = screen.getByRole('button', {
      name: /explore drinks/i,
    });
    expect(ExploreDrinksButton).toBeDefined();
  });

  test('Verifica se o botão "Explore Foods" redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const ExploreFoodsButton = screen.getByRole('button', {
      name: /explore foods/i,
    });
    userEvent.click(ExploreFoodsButton);
    expect(history.location.pathname).toBe('/explore/foods');
  });

  test('Verifica se o botão "Explore Drinks" redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const ExploreDrinksButton = screen.getByRole('button', {
      name: /explore drinks/i,
    });
    userEvent.click(ExploreDrinksButton);
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
