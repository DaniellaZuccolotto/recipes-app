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
    history.push('/foods');
    const fetch = jest.spyOn(global, 'fetch');

    const beefButton = await screen.findByRole('button', {
      name: /beef/i,
    });

    const EXPECT_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef';
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    userEvent.click(beefButton);
    expect(fetch).toHaveBeenCalledWith(EXPECT_URL);

    userEvent.click(beefButton);
    expect(fetch).toHaveBeenCalledWith(URL);

    const allBtn = await screen.findByRole('button', {
      name: /all/i,
    });
    userEvent.click(allBtn);
    expect(fetch).toHaveBeenCalledWith(URL);

    fetch.mockRestore();
  });

  test('Caso não encontre nenhuma receita, exibe a mensagem apropriada em Foods',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');

      const fetch = jest.spyOn(global, 'fetch');

      const alert = jest.spyOn(global, 'alert');
      const alertMsg = 'Sorry, we haven\'t found any recipes for these filters.';

      const searchIcon = screen.getByRole('button', {
        name: /open-search/i,
      });
      userEvent.click(searchIcon);

      const nameFilter = screen.getByRole('radio', { name: /name/i });
      const searchText = screen.getByRole('textbox');
      const searchBtn = screen.getByRole('button', { name: 'Search' });

      fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(null),
      });

      userEvent.type(searchText, 'lalala');
      userEvent.click(nameFilter);
      userEvent.click(searchBtn);

      const WAIT_SEC = 500;
      setTimeout(() => {
        expect(alert).toHaveBeenCalledWith(alertMsg);
      }, WAIT_SEC);
    });
});
