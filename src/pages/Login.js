import React, { useContext } from 'react';
import RecipeContext from '../provider/RecipesContext';

function Login() {
  const { loginData, handleChange } = useContext(RecipeContext);
  const { email, password } = loginData;
  return (
    <form>
      <label htmlFor="email">
        <input
          name="email"
          value={ email }
          onChange={ handleChange }
          type="email"
          id="email"
          placeholder="E-mail"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        <input
          name="password"
          value={ password }
          onChange={ handleChange }
          type="password"
          id="password"
          placeholder="Password"
          data-testid="password-input"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
