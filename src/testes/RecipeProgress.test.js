import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
// import { mockRecipeProgressFood,
// } from './helpers/mockRecipeProgress';
import renderWithRouter from './helpers/renderWithRouter';

const pathFood = '/foods/52977/in-progress';
const INGREDIENTS_LIST_LENGTH = 13;
// const TIME_OUT = 3000;

describe('Testa a página de Recipe in Progress', () => {
  // test('Testa se a Api é chamada', async () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push(pathFood);

  //   const fetch = jest.spyOn(global, 'fetch');
  //   const EXPECT_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';

  //   setTimeout(() => {
  //   expect(fetch).toHaveBeenCalledWith(EXPECT_URL);
  //   }, TIME_OUT);
  //   fetch.mockRestore();
  // });

  test('Testa se existe um title, imagem, botao de compartilhar e de favoritar',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(pathFood);

      // fetch.mockResolvedValue({
      //   json: jest.fn().mockResolvedValue(mockRecipeProgressFood),
      // });

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
});
