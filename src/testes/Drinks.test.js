import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página Foods', () => {
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
});
