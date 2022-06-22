import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  test('Verifica se ao clicar no icone de drinks, a pagina é redirecionada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const drinksIcon = screen.getByRole('button', {
      name: /drinks/i,
    });

    userEvent.click(drinksIcon);

    const { pathname } = history.location;

    expect(pathname).toBe('/drinks');
  });

  test('Verifica se ao clicar no icone de explore, a pagina é redirecionada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const exploreIcon = screen.getByRole('button', {
      name: /explore/i,
    });

    userEvent.click(exploreIcon);

    const { pathname } = history.location;

    expect(pathname).toBe('/explore');
  });

  test('Verifica se ao clicar no icone de foods, a pagina é redirecionada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const foodsIcon = screen.getByRole('button', {
      name: /foods/i,
    });

    userEvent.click(foodsIcon);

    const { pathname } = history.location;

    expect(pathname).toBe('/foods');
  });
});
