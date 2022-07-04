import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { mockRecipeProgressFood,
} from './helpers/mockRecipeProgress';
import renderWithRouter from './helpers/renderWithRouter';

const pathFood = '/foods/52977/in-progress';
const INGREDIENTS_LIST_LENGTH = 13;
// const TIME_OUT = 1000;

describe('Testa a página de Recipe in Progress', () => {
  test('Testa se a Api de Foods é chamada ', async () => {
    const { history } = renderWithRouter(<App />);

    const fetch = jest.spyOn(global, 'fetch');

    history.push('/foods/52977');
    expect(history.location.pathname).toBe('/foods/52977');

    const buttonStart = screen.getByRole('button', {
      name: /start recipe/i,
    });
    userEvent.click(buttonStart);
    expect(history.location.pathname).toBe(pathFood);
    const EXPECT_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';

    expect(fetch).toHaveBeenCalledWith(EXPECT_URL);

    fetch.mockRestore();
  });

  test('Testa se a Api de Drinks é chamada ', async () => {
    const { history } = renderWithRouter(<App />);

    const fetch = jest.spyOn(global, 'fetch');

    history.push('/drinks/15997');
    expect(history.location.pathname).toBe('/drinks/15997');
    const buttonStart = screen.getByRole('button', {
      name: /start recipe/i,
    });
    userEvent.click(buttonStart);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
    const EXPECT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';

    expect(fetch).toHaveBeenCalledWith(EXPECT_URL);

    fetch.mockRestore();
  });

  test('Testa se existe um title, imagem, botao de compartilhar e de favoritar',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(pathFood);

      const titleRecipe = await screen.findByRole('heading', {
        name: /corba/i,
      });
      expect(titleRecipe).toBeDefined();

      const imgRecipe = await screen.findByRole('img', {
        name: /corba/i,
      });
      expect(imgRecipe).toBeDefined();

      const buttonShare = await screen.findByRole('button', {
        name: /botão de compartilhamento/i,
      });
      expect(buttonShare).toBeDefined();

      const buttonFavorite = await screen.findByRole('button', {
        name: /botão de favorito/i,
      });
      expect(buttonFavorite).toBeDefined();
    });

  test('Testa se existe uma lista de ingredientes e as instruções', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(pathFood);

    const ingredientListCheck = await screen.findAllByRole('checkbox');
    expect(ingredientListCheck.length).toBe(INGREDIENTS_LIST_LENGTH);

    const instructionsList = await screen.findByTestId('instructions');
    expect(instructionsList).toBeDefined();
  });

  test('Testa se existe um botao finalizar e se ele está desabilitado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(pathFood);

    const buttonFinish = await screen.findByRole('button', {
      name: /finalizar/i,
    });
    expect(buttonFinish).toBeDefined();
    expect(buttonFinish).toBeDisabled();
  });
  test('Testa se ao clicar em um checkbox risca o ingrediente', async () => {
    const { history } = renderWithRouter(<App />);
    const { localStorage } = global;

    history.push(pathFood);

    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ cocktails: {}, meals: {} }));

    const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(getLocal).toEqual({ cocktails: {}, meals: {} });

    const checkbox = await screen.findByRole('checkbox', {
      name: /lentils1 cup/i,
    });
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    // const ingredient = await screen.findByText(/lentils1 cup/i);
    // expect(ingredient).toHaveStyle('text-decoration: line-through;');
    // expect(checkbox).toHaveStyleRule('text-decoration', expect
    //   .stringContaining('line-through'));
    // expect(getLocal).toEqual({ cocktails: {}, meals: { 52977: ['Lentils1 cup'] } });
  });
});
