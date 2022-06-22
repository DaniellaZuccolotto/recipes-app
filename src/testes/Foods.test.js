import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página Foods', () => {
  afterEach(() => jest.clearAllMocks());

  test('Se as comidas são exibidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
  });

  test('Se os botões de categoria são rederizados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const beefButton = screen.findByRole('button', {
      name: /beef/i,
    });
    expect(beefButton).toBeDefined();
  });
});
