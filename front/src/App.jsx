import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyle from './styles/global';

import Header from './components/Header';
import Board from './components/Board';
import TaskProvider from './context/task';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TaskProvider>
        <ToastContainer autoClose={3000} position='top-right' />
        <Header />
        <Board />
        <GlobalStyle />
      </TaskProvider>
    </DndProvider>
  );
}

export default App;
