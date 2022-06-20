import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const EMAIL = 'teste@teste.teste';

describe('Testa a página de Login', () => {
  test('Verifica se existem os inputs de email e senha e o botão Enter', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeDefined();

    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeDefined();

    const enterButton = screen.getByRole('button', {
      name: /enter/i,
    });
    expect(enterButton).toBeDefined();
  });

  test('Verifica se o campo de email funciona', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toHaveValue('');

    userEvent.type(emailInput, EMAIL);
    expect(emailInput).toHaveValue(EMAIL);
  });

  test('Verifica se o campo de password funciona', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveValue('');

    userEvent.type(passwordInput, '102030405060');
    expect(passwordInput).toHaveValue('102030405060');
  });
  test('verifica se é validado email e senha', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterButton = screen.getByRole('button', {
      name: /enter/i,
    });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(enterButton).toBeDisabled();

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '123456');

    expect(emailInput).toHaveValue(EMAIL);
    expect(passwordInput).toHaveValue('123456');
    expect(enterButton).not.toBeDisabled();
  });
});
