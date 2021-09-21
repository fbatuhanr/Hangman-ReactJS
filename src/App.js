import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Hangman from './Hangman';

function App() {

  return (
    <div className="container">
      <Hangman />
    </div>
  );
}

export default App;
