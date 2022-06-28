import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página Foods', () => {
  test('Verificar se é chamado o endPoint correto da api de Drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchIcon = screen.getByRole('button', {
      name: /open-search/i,
    });

    const spy = jest.spyOn(global, 'fetch');

    userEvent.click(searchIcon);
    const searchText = screen.getByRole('textbox');
    userEvent.type(searchText, 'vodka');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    userEvent.click(searchBtn);
    expect(spy).toBeCalled();

    const ingredientFilter = screen.getByRole('radio', { name: /ingredient/i });
    userEvent.click(ingredientFilter);
    userEvent.type(searchText, 'vodka');
    userEvent.click(searchBtn);
    expect(spy).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka',
    );

    const nameFilter = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameFilter);
    userEvent.type(searchText, 'Ace');
    userEvent.click(searchBtn);
    expect(spy).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Ace',
    );

    const firstLetterFilter = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterFilter);
    userEvent.type(searchText, 'a');
    userEvent.click(searchBtn);
    expect(spy).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a',
    );

    // referencia para pegar o teste de Alert 'https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest'
    const alert = jest.spyOn(global, 'alert');
    userEvent.click(firstLetterFilter);
    userEvent.type(searchText, 'ab');
    userEvent.click(searchBtn);
    const alertMsg = 'Your search must have only 1 (one) character';
    expect(alert).toHaveBeenCalledWith(alertMsg);

    spy.mockRestore();
  });

  test('Caso não encontre nenhuma receita, exibe a mensagem apropriada em Drinks',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks');
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

      const WAIT_SEC = 3000;
      setTimeout(() => {
        expect(alert).toHaveBeenCalledWith(alertMsg);
      }, WAIT_SEC);

      fetch.mockRestore();
      alert.mockRestore();
    });

  test('Se os botões de categoria são rederizados', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeDefined();

    const ordButton = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(ordButton).toBeDefined();

    const cocktailButton = await screen.findByRole('button', {
      name: /cocktail/i,
    });
    expect(cocktailButton).toBeDefined();

    const shakeButton = await screen.findByRole('button', {
      name: /shake/i,
    });
    expect(shakeButton).toBeDefined();

    const otherButton = await screen.findByRole('button', {
      name: /other/i,
    });
    expect(otherButton).toBeDefined();

    const cocoaButton = await screen.findByRole('button', {
      name: /cocoa/i,
    });
    expect(cocoaButton).toBeDefined();
  });

  test('Verifica se exibe as 12 receitas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const RECIPIES_LIST_LENGTH = 12;
    const recipiesImg = await screen.findAllByRole('img');
    expect(recipiesImg.length).toBe(RECIPIES_LIST_LENGTH);
  });

  test('Verifica a funcionalidade dos filtros', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const fetch = jest.spyOn(global, 'fetch');

    const shakeButton = await screen.findByRole('button', {
      name: /shake/i,
    });

    const EXPECT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake';
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    userEvent.click(shakeButton);
    expect(fetch).toHaveBeenCalledWith(EXPECT_URL);

    userEvent.click(shakeButton);
    expect(fetch).toHaveBeenCalledWith(URL);

    const allBtn = await screen.findByRole('button', {
      name: /all/i,
    });
    userEvent.click(allBtn);
    expect(fetch).toHaveBeenCalledWith(URL);

    fetch.mockRestore();
  });
});
