import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockFavorites, mockNewFavorites } from './helpers/mock';

describe('Testes da página FavoriteRecipes', () => {
  const { localStorage } = global;
  const PATH_NAME = '/favorite-recipes';

  // Fazendo um mock de navigator.clipboard.writeText:
  // https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });
  // No ambiente de testes, nem tudo esta definido, como o acima, então é necessário defini-los antes de utiliza-los.

  test('A página possui o header adequado', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH_NAME);

    const profileButton = screen.getByRole('button', { name: /profile/i });
    expect(profileButton).toBeDefined();

    const headerTitle = screen.getByRole('heading', { name: 'Favorite Recipes' });
    expect(headerTitle).toBeDefined();
  });

  test('Exibe a mensagem correta, caso não existam favoritos', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH_NAME);

    const noFavsMsg = screen.getByRole('heading', { name: 'No favorites yet!' });
    expect(noFavsMsg).toBeDefined();
  });

  test('Exibe a lista de favoritos adequadamente', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorites));

    const { history } = renderWithRouter(<App />);
    history.push(PATH_NAME);

    const favoriteBTNQuant = await screen.findAllByRole(
      'button',
      { name: 'Botão de favorito' },
    );
    expect(favoriteBTNQuant.length).toBe(2);

    const shareBTNQuant = await screen.findAllByRole(
      'button',
      { name: 'Botão de compartilhamento' },
    );
    expect(shareBTNQuant.length).toBe(2);

    const favFoodName = await screen.findByRole('heading', { name: 'Corba' });
    const favFoodDetails = await screen.findByText('Turkish - Side');
    expect(favFoodName).toBeDefined();
    expect(favFoodDetails).toBeDefined();

    const favDrinkName = await screen.findByRole('heading', { name: 'GG' });
    const favDrinkDetails = await screen.findByText('Optional alcohol');
    expect(favDrinkName).toBeDefined();
    expect(favDrinkDetails).toBeDefined();

    localStorage.clear();
  });

  test('Exibe os botões de filtro e eles funcionam adequadamente', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorites));

    const { history } = renderWithRouter(<App />);
    history.push(PATH_NAME);

    const favDrinkName = await screen.findByRole('heading', { name: 'GG' });
    const favFoodName = await screen.findByRole('heading', { name: 'Corba' });
    expect(favDrinkName).toBeInTheDocument();
    expect(favFoodName).toBeInTheDocument();

    const filterAll = screen.getByRole('button', { name: 'All' });
    const filterFood = screen.getByRole('button', { name: 'Food' });
    const filterDrinks = screen.getByRole('button', { name: 'Drinks' });
    expect(filterAll).toBeDefined();
    expect(filterFood).toBeDefined();
    expect(filterDrinks).toBeDefined();

    userEvent.click(filterFood);
    expect(favDrinkName).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Corba' })).toBeInTheDocument();

    userEvent.click(filterDrinks);
    expect(favFoodName).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'GG' })).toBeInTheDocument();

    userEvent.click(filterAll);
    expect(screen.getByRole('heading', { name: 'GG' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Corba' })).toBeInTheDocument();

    localStorage.clear();
  });

  test('É possivel copiar o link da página de detalhes clicando em compartilhar',
    async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorites));

      const { history } = renderWithRouter(<App />);
      history.push(PATH_NAME);
      const copiar = jest.spyOn(navigator.clipboard, 'writeText');

      const shareBTNQuant = await screen.findAllByRole(
        'button',
        { name: 'Botão de compartilhamento' },
      );

      userEvent.click(shareBTNQuant[0]);
      expect(copiar).toBeCalledWith('http://localhost:3000/foods/52977');

      userEvent.click(shareBTNQuant[1]);
      expect(copiar).toBeCalledWith('http://localhost:3000/drinks/15997');

      copiar.mockRestore();
      localStorage.clear();
    });

  test('É possivel defavoritar uma receita, atualizando o localStorage', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorites));

    const { history } = renderWithRouter(<App />);
    history.push(PATH_NAME);

    const favoriteButtons = await screen.findAllByRole(
      'button',
      { name: 'Botão de favorito' },
    );

    expect(JSON.parse(localStorage.getItem('favoriteRecipes')))
      .toEqual(mockFavorites);

    userEvent.click(favoriteButtons[1]);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')))
      .toEqual(mockNewFavorites);

    userEvent.click(favoriteButtons[0]);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')))
      .toEqual([]);

    localStorage.clear();
  });
});
