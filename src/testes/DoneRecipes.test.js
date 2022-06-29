import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mockDoneRecipes from './helpers/mockDoneRecipes';

describe('Testa a pagina "DoneRecipes"', () => {
  const { localStorage } = global;
  const PATH_NAME = '/done-recipes';
  const NUMBER_OF_RECIPES = 3;
  const NUMBER_OF_FOODS = 2;
  const NUMBER_OF_DRINKS = 1;

  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });

  test('Verifica se a pagina possui o Header sem search', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH_NAME);

    const profileButton = screen.getByRole('button', { name: /profile/i });
    const pageTitle = screen.getByRole('heading', { name: /done recipes/i });

    expect(profileButton).toBeDefined();
    expect(pageTitle).toBeDefined();
  });

  test('Verifica se exibe a mensagem correta caso não haja receitas prontas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH_NAME);

    const msg = screen.getByText(/não existem receitas concluidas!/i);
    expect(msg).toBeDefined();
  });

  test('Verifica se exibe a lista de receitas prontas corretamente', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));

    const { history } = renderWithRouter(<App />);
    history.push(PATH_NAME);

    const shareButton = await screen.findAllByRole('button', {
      name: /Botão de compartilhamento/i });

    expect(shareButton.length).toBe(NUMBER_OF_RECIPES);

    const date = screen.getAllByText('28/5/2022');

    const food1 = screen.getByText(/kumpir/i);
    const natCat1 = screen.getByText(/Turkish - Side/i);
    const img1 = screen.getByRole('img', { name: /kumpir/i });
    const tag1 = screen.getByText(/SideDish/i);

    const food2 = screen.getByText(/Baked salmon with fennel & tomatoes/i);
    const natCat2 = screen.getByText(/British - Seafood/i);
    const img2 = screen.getByRole('img', {
      name: /Baked salmon with fennel & tomatoes/i });
    const tag2 = screen.getByText(/Paleo/i);
    const tag3 = screen.getByText(/Keto/i);

    const drink1 = screen.getByText(/Adam/i);
    const alcohol = screen.getByTestId('2-horizontal-top-text');
    const img3 = screen.getByRole('img', { name: /adam/i });
    const tag4 = screen.getByTestId('2-Holiday-horizontal-tag');
    const tag5 = screen.getByText(/Holiday/i);

    expect(date.length).toBe(NUMBER_OF_RECIPES);

    expect(food1).toBeDefined();
    expect(img1).toBeDefined();
    expect(natCat1).toBeDefined();
    expect(tag1).toBeDefined();

    expect(food2).toBeDefined();
    expect(img2).toBeDefined();
    expect(natCat2).toBeDefined();
    expect(tag2).toBeDefined();
    expect(tag3).toBeDefined();

    expect(drink1).toBeDefined();
    expect(img3).toBeDefined();
    expect(alcohol).toBeDefined();
    expect(tag4).toBeDefined();
    expect(tag5).toBeDefined();
  });

  test('Verifica se existem os botões de filtro e sua funcionalidade', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));

    const { history } = renderWithRouter(<App />);
    history.push(PATH_NAME);

    const allButton = screen.getByRole('button', { name: /all/i });
    const foodButton = screen.getByRole('button', { name: /food/i });
    const drinkButton = screen.getByRole('button', { name: /drink/i });

    expect(allButton).toBeDefined();
    expect(foodButton).toBeDefined();
    expect(drinkButton).toBeDefined();

    userEvent.click(foodButton);

    let shareButton = await screen.findAllByRole('button', {
      name: /Botão de compartilhamento/i });

    let date = screen.getAllByText('28/5/2022');

    const food1 = screen.getByText(/kumpir/i);
    const natCat1 = screen.getByText(/Turkish - Side/i);
    const img1 = screen.getByRole('img', { name: /kumpir/i });
    const tag1 = screen.getByText(/SideDish/i);

    const food2 = screen.getByText(/Baked salmon with fennel & tomatoes/i);
    const natCat2 = screen.getByText(/British - Seafood/i);
    const img2 = screen.getByRole('img', {
      name: /Baked salmon with fennel & tomatoes/i });
    const tag2 = screen.getByText(/Paleo/i);
    const tag3 = screen.getByText(/Keto/i);

    expect(shareButton.length).toBe(NUMBER_OF_FOODS);
    expect(date.length).toBe(NUMBER_OF_FOODS);

    expect(food1).toBeDefined();
    expect(img1).toBeDefined();
    expect(natCat1).toBeDefined();
    expect(tag1).toBeDefined();

    expect(food2).toBeDefined();
    expect(img2).toBeDefined();
    expect(natCat2).toBeDefined();
    expect(tag2).toBeDefined();
    expect(tag3).toBeDefined();

    userEvent.click(drinkButton);

    shareButton = await screen.findAllByRole('button', {
      name: /Botão de compartilhamento/i });

    date = screen.getAllByText('28/5/2022');

    const drink1 = screen.getByText(/Adam/i);
    const alcohol = screen.getByTestId('0-horizontal-top-text');
    const img3 = screen.getByRole('img', { name: /adam/i });
    const tag4 = screen.getByTestId('0-Holiday-horizontal-tag');
    const tag5 = screen.getByText(/Holiday/i);

    expect(shareButton.length).toBe(NUMBER_OF_DRINKS);
    expect(date.length).toBe(NUMBER_OF_DRINKS);

    expect(drink1).toBeDefined();
    expect(img3).toBeDefined();
    expect(alcohol).toBeDefined();
    expect(tag4).toBeDefined();
    expect(tag5).toBeDefined();

    userEvent.click(allButton);

    shareButton = await screen.findAllByRole('button', {
      name: /Botão de compartilhamento/i });

    date = screen.getAllByText('28/5/2022');

    expect(shareButton.length).toBe(NUMBER_OF_RECIPES);
    expect(date.length).toBe(NUMBER_OF_RECIPES);
  });

  test('É possivel copiar o link da página de detalhes clicando em compartilhar',
    async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(mockDoneRecipes));

      const { history } = renderWithRouter(<App />);
      history.push(PATH_NAME);
      const copiar = jest.spyOn(navigator.clipboard, 'writeText');

      const shareBTNQuant = await screen.findAllByRole(
        'button',
        { name: 'Botão de compartilhamento' },
      );

      userEvent.click(shareBTNQuant[0]);
      expect(copiar).toBeCalledWith('http://localhost:3000/foods/52978');
      expect(screen.getByText(/link copied!/i)).toBeInTheDocument();

      const WAIT_MSG = 3500;
      setTimeout(() => {
        expect(screen.getByText(/link copied!/i)).not.toBeInTheDocument();
      }, WAIT_MSG);

      userEvent.click(shareBTNQuant[2]);
      expect(copiar).toBeCalledWith('http://localhost:3000/drinks/17837');

      copiar.mockRestore();
      localStorage.clear();
    });
});
