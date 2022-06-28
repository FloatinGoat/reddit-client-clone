import React, {useState, useEffect} from "react";
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../store/subredditsSlice';

const Search = () => {
  
  const dispatch = useDispatch();
  const [searchTermLocal, setSearchTermLocal] = useState('');
  const searchTerm = useSelector((state) => state.subreddits.searchTerm);

  /* Any time user writes, it'll update the local search term state */
  const onSearchTermChange = (e) => {
    setSearchTermLocal(e.target.value);
  };
  
  /* Any time user submits, set the local searchTerm as the global searchTerm. */
  const onSearchTermSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTermLocal));
  };
  
  /* Any time the global searchTerm state changes, set it as the new seaerchTerm. */
  useEffect(() => {
    setSearchTerm(searchTerm);
  }, [searchTerm]);


  return (
    <>
      <div className='search-container'>
        <form className="search" onSubmit={onSearchTermSubmit}>
          <button type="submit" aria-label="search" onClick={onSearchTermSubmit}>
            <FaSearch className='icon' />
          </button>
          <input
            type="text"
            placeholder="Search your favorite subreddits"
            value={searchTermLocal}
            onChange={onSearchTermChange}
            aria-label="Search subreddits"
          />     
        </form>
      </div>
    </>
  )
}

export default Search