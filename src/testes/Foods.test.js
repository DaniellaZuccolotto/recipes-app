import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página Foods', () => {
  test('Se os botões de categoria são rederizados', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeDefined();

    const beefButton = await screen.findByRole('button', {
      name: /beef/i,
    });
    expect(beefButton).toBeDefined();

    const breakfastButton = await screen.findByRole('button', {
      name: /breakfast/i,
    });
    expect(breakfastButton).toBeDefined();

    const chickenButton = await screen.findByRole('button', {
      name: /chicken/i,
    });
    expect(chickenButton).toBeDefined();

    const dessertButton = await screen.findByRole('button', {
      name: /dessert/i,
    });
    expect(dessertButton).toBeDefined();

    const goatButton = await screen.findByRole('button', {
      name: /goat/i,
    });
    expect(goatButton).toBeDefined();
  });

  test('Verifica se exibe as 12 receitas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const RECIPIES_LIST_LENGTH = 12;
    const recipiesImg = await screen.findAllByRole('img');
    expect(recipiesImg.length).toBe(RECIPIES_LIST_LENGTH);
  });

  test('Verifica a funcionalidade dos filtros', async () => {
    const { history } = renderWithRouter(<App />);
    jest.spyOn(global, 'fetch');
    history.push('/foods');
    const beefButton = await screen.findByRole('button', {
      name: /beef/i,
    });

    userEvent.click(beefButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');

    userEvent.click(beefButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

    const allBtn = await screen.findByRole('button', {
      name: /all/i,
    });
    userEvent.click(allBtn);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});
