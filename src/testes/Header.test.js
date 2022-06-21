import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Foods from '../pages/Foods';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Header', () => {
  test('Verifica se o Header tem o icone de profile, search e o page title', () => {
    renderWithRouter(<Foods />);
    const profileIcon = screen.getByRole('button', {
      name: /profile/i,
    });
    expect(profileIcon).toBeDefined();
    const searchIcon = screen.getByRole('img', {
      name: /search/i,
    });
    expect(searchIcon).toBeDefined();
    const pageTitle = screen.getByRole('heading', { level: 1, name: /foods/i });
    expect(pageTitle).toBeDefined();
  });

  test('Verifica se ao clicar na imagem de perfil vai para a page profile', () => {
    const { history } = renderWithRouter(<Foods />);
    const profileIcon = screen.getByRole('button', {
      name: /profile/i,
    });
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });
});
