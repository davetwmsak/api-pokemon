import React from 'react';
import Pokemon from './Pokemon';
import sass from'../mi-proyecto/css/AppDesign.module.scss';

const App = () => {
  return (
    <div className={sass.App}>
      <h1>Pokémon API</h1>
      <Pokemon />
    </div>
  );
};

export default App;
