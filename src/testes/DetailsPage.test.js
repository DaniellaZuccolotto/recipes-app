import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FOOD_URL = '/foods/52977';

describe('testa a pagina de detalhes', () => {
  it('testa se ao clicar em uma comida vai para a pagina de detalhes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const recipieImg = await screen.findAllByRole('img');
    userEvent.click(recipieImg[0]);
    expect(history.location.pathname).toBe(FOOD_URL);
  });
  it('testa se ao clicar em uma bebida vai para a pagina de detalhes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const recipieImg = await screen.findAllByRole('img');
    userEvent.click(recipieImg[0]);
    expect(history.location.pathname).toBe('/drinks/15997');
  });
  it('testa os detalhes da pag', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(FOOD_URL);
    const img = await screen.findByRole('img', {
      src: 'www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    });
    expect(img).toBeInTheDocument();
    const title = await screen.findByRole('heading', {
      name: /corba/i,
    });
    expect(title).toBeInTheDocument();
    const category = await screen.findByRole('heading', {
      name: /side/i,
    });
    expect(category).toBeInTheDocument();
    const shareButton = await screen.findByRole('button', {
      name: /botão de compartilhamento/i,
    });
    expect(shareButton).toBeInTheDocument();
  });
  it('testa se a funcionalidade do coração', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(FOOD_URL);
    const heartButton = screen.getByRole('button', {
      name: /botão de favorito/i,
    });
    expect(heartButton).toBeInTheDocument();
    expect(heartButton).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(heartButton);
    expect(heartButton).toHaveAttribute('src', blackHeartIcon);
  });
  it('Testa a lista de ingrediente', async () => {
    const { history } = renderWithRouter(<App />);
    // const LIST_LENGTH = 13;
    history.push(FOOD_URL);
    const ingredientList = await screen.findByRole('list');
    expect(ingredientList).toBeInTheDocument();
    /*  const ingredientName = ingredientList.map((item) => item.textContent);
    console.log(ingredientName); */
  });
  it('testa se as instruções aparecem na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(FOOD_URL);
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });
  it('testa se o titulo do video aparece na tela', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(FOOD_URL);
    const videoTitle = await screen.findByTitle(/corba/i);
    expect(videoTitle).toBeInTheDocument();
  });
  it('testa se há somente 2 card recomendados aparecendo', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(FOOD_URL);
    const recomendedCard1 = await screen.findByTestId('1-recomendation-card');
    expect(recomendedCard1).toBeInTheDocument();
    const recomendedCard2 = await screen.findByTestId('2-recomendation-card');
    expect(recomendedCard2).toBeInTheDocument();
  });
});
