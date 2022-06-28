import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Subreddits from './features/Subreddits/Subreddits';

function App() {
  return (
    <>
      <Header />
      <Subreddits />
      <Main />
    </>
  );
}

export default App;