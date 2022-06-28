import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { mockFoodRecipe, mockFoodCategories } from './helpers/mockFoodResults';

describe('Testa a página Foods', () => {
  test('Verificar se é chamado o endPoint correto da api de Foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const spy = jest.spyOn(global, 'fetch');

    const searchIcon = screen.getByRole('button', {
      name: /open-search/i,
    });
    userEvent.click(searchIcon);
    const searchText = screen.getByRole('textbox');
    userEvent.type(searchText, 'butter');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    userEvent.click(searchBtn);
    expect(spy).toHaveBeenCalled();

    const ingredientFilter = screen.getByRole('radio', { name: /ingredient/i });
    userEvent.click(ingredientFilter);
    userEvent.type(searchText, 'butter');
    userEvent.click(searchBtn);
    expect(spy).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=butter',
    );

    const nameFilter = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameFilter);
    userEvent.type(searchText, 'beef');
    userEvent.click(searchBtn);
    expect(spy).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=beef',
    );

    const firstLetterFilter = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterFilter);
    userEvent.type(searchText, 'a');
    userEvent.click(searchBtn);
    expect(spy).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=a',
    );

    // referencia para pegar o teste de Alert 'https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest'
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    userEvent.click(firstLetterFilter);
    userEvent.type(searchText, 'ab');
    userEvent.click(searchBtn);
    const alertMsg = 'Your search must have only 1 (one) character';
    expect(global.alert).toHaveBeenCalledWith(alertMsg);

    spy.mockRestore();
  });

  test('Caso não encontre nenhuma receita, exibe a mensagem apropriada',
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

      const WAIT_SEC = 2000;
      setTimeout(() => {
        expect(alert).toHaveBeenCalledWith(alertMsg);
      }, WAIT_SEC);

      fetch.mockRestore();
      alert.mockRestore();
    });

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
    const fetch = jest.spyOn(global, 'fetch');
    history.push('/foods');
    fetch.mockResolvedValueOnce(({
      json: jest.fn().mockResolvedValue(mockFoodRecipe),
    }))
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockFoodCategories),
      });

    const RECIPIES_LIST_LENGTH = 12;
    const recipiesImg = await screen.findAllByRole('img');
    expect(recipiesImg.length).toBe(RECIPIES_LIST_LENGTH);

    fetch.mockRestore();
  });

  test('Verifica a funcionalidade dos filtros', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const fetch = jest.spyOn(global, 'fetch');

    fetch.mockResolvedValueOnce(({
      json: jest.fn().mockResolvedValue(mockFoodRecipe),
    }))
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockFoodCategories),
      });

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
});
