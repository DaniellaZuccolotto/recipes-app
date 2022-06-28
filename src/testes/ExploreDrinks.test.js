import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página Explore Drinks', () => {
  test('Verifica se existem os 2 botões de acordo com o protótipo', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');

    const byIngredientButton = screen.getByRole('button', {
      name: /by ingredient/i,
    });
    expect(byIngredientButton).toBeDefined();

    const surpriseMeButton = screen.getByRole('button', {
      name: /surprise me/i,
    });
    expect(surpriseMeButton).toBeDefined();
  });

  test('Verifica se o botão "By Ingredient" redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');

    const exploreFoodsButton = screen.getByRole('button', {
      name: /by ingredient/i,
    });
    userEvent.click(exploreFoodsButton);
    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });

  test('Verifica se o botão "Surprise Me" redireciona para uma comida aleatória', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');

    const surpriseMeButton = screen.getByRole('button', {
      name: /surprise me/i,
    });
    userEvent.click(surpriseMeButton);
    expect(history.location.pathname).toMatch(/drinks/);
  });
});
