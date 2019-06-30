import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Header from './components/Header';
import Navbar from './components/Navbar';
import GlobalStyle from './styles/global';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Navbar />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
