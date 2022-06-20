import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import RecipeContextProvider from './provider/RecipeContextProvider';

function App() {
  return (
    <RecipeContextProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route><h1>Pagina não encontrada</h1></Route>
      </Switch>
    </RecipeContextProvider>
    // <div className="meals">
    //   <span className="logo">TRYBE</span>
    //   <object
    //     className="rocksGlass"
    //     type="image/svg+xml"
    //     data={ rockGlass }
    //   >
    //     Glass
    //   </object>
    // </div>
  );
}

export default App;
