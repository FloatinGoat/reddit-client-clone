import React from 'react';
import { FaReddit } from 'react-icons/fa'
import Search from '../features/Search/Search'
import './Header.css';


const Header = () => {
  return (
    <header>
        <div className='logo-container'>
          <FaReddit className='logo' />
          <h1>Reddit</h1>
        </div>
        <Search />
    </header>
  )
}

export default Header