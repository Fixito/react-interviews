import { useState, useEffect, useCallback, useRef } from 'react';

const SearchForm = ({ people, setPeople }) => {
  const [input, setInput] = useState('');
  const searchInput = useRef(null);

  const searchPeople = () => {
    setInput(searchInput.current.value);
  };

  return (
    <form>
      <input
        type='text'
        placeholder='Rechercher...'
        ref={searchInput}
        onChange={searchPeople}
      />
    </form>
  );
};

export default SearchForm;
