import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyle from './styles/global';

import Header from './components/Header';
import Board from './components/Board';
import Provider from './context';

function App() {
  return (
    <Provider>
      <ToastContainer autoClose={3000} position='top-right' />
      <Header />
      <Board />
      <GlobalStyle />
    </Provider>
  );
}

export default App;
