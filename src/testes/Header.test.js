import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Header', () => {
  test('Verifica se o Header tem o icone de profile, search e o page title', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const profileIcon = screen.getByRole('button', {
      name: /profile/i,
    });
    expect(profileIcon).toBeDefined();
    const searchIcon = screen.getByRole('button', {
      name: /search/i,
    });
    expect(searchIcon).toBeDefined();
    const pageTitle = screen.getByRole('heading', { level: 1, name: /foods/i });
    expect(pageTitle).toBeDefined();
  });

  test('Verifica se ao clicar na imagem de perfil vai para a page profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const profileIcon = screen.getByRole('button', {
      name: /profile/i,
    });
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });

  test('Verifica se ao clicar na lupa a pesquisa aparece e desaparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchIcon = screen.getByRole('button', {
      name: /open-search/i,
    });
    userEvent.click(searchIcon);
    const searchText = screen.getByRole('textbox');
    expect(searchText).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(searchText).not.toBeInTheDocument();
  });

  test('Verifica se o campo de pesquisa funciona', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchIcon = screen.getByRole('button', {
      name: /open-search/i,
    });
    userEvent.click(searchIcon);
    const searchText = screen.getByRole('textbox');
    expect(searchText).toHaveValue('');

    userEvent.type(searchText, 'tuc tuc');
    expect(searchText).toHaveValue('tuc tuc');
  });

  test('Verifica se os filtros e o botão de pesquisa aparecem ao clicar na lupa', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchIcon = screen.getByRole('button', {
      name: /open-search/i,
    });
    userEvent.click(searchIcon);

    const ingredientFilter = screen.getByRole('radio', { name: /ingredient/i });
    const nameFilter = screen.getByRole('radio', { name: /name/i });
    const firstLetterFilter = screen.getByRole('radio', { name: /first letter/i });

    expect(ingredientFilter).toBeDefined();
    expect(nameFilter).toBeDefined();
    expect(firstLetterFilter).toBeDefined();

    const searchBtn = screen.getByRole('button', { name: 'Search' });
    expect(searchBtn).toBeDefined();
  });

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
});
