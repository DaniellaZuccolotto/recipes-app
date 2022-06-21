import React from 'react';
import App from './App';
import renderWithRouter from './testes/helpers/renderWithRouter'

test('Farewell, front-end', () => {
  const { getByText } = renderWithRouter(<App />);
  // const linkElement = getByText(/TRYBE/i);
  // expect(linkElement).toBeInTheDocument();
});
