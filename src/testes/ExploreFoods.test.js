import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página Explore Foods', () => {
  test('Verifica se existem os 3 botões de acordo com o protótipo', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');

    const byIngredientButton = screen.getByRole('button', {
      name: /by ingredient/i,
    });
    expect(byIngredientButton).toBeDefined();

    const byNationalityButton = screen.getByRole('button', {
      name: /by nationality/i,
    });
    expect(byNationalityButton).toBeDefined();

    const surpriseMeButton = screen.getByRole('button', {
      name: /by nationality/i,
    });
    expect(surpriseMeButton).toBeDefined();
  });

  test('Verifica se o botão "By Ingredient" redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');

    const exploreFoodsButton = screen.getByRole('button', {
      name: /by ingredient/i,
    });
    userEvent.click(exploreFoodsButton);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });

  test('Verifica se o botão "By Nationality" redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');

    const byNationalityButton = screen.getByRole('button', {
      name: /by nationality/i,
    });
    userEvent.click(byNationalityButton);
    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });

  test('Verifica se o botão "Surprise Me" mostra uma comida aleatória', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');

    const surpriseMeButton = screen.getByRole('button', {
      name: /surprise me/i,
    });
    userEvent.click(surpriseMeButton);
    expect(history.location.pathname).toMatch(/foods/);
  });
});
