import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Footer', () => {
  test('Verifica se o Footer tem o icone de drinks, explore e foods', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const drinksIcon = screen.getByRole('button', {
      name: /drinks/i,
    });
    const exploreIcon = screen.getByRole('button', {
      name: /explore/i,
    });
    const foodsIcon = screen.getByRole('button', {
      name: /foods/i,
    });

    expect(drinksIcon).toBeDefined();
    expect(exploreIcon).toBeDefined();
    expect(foodsIcon).toBeDefined();
  });
});
