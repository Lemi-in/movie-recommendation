import React, { useState } from 'react';

function SearchForm({ handleSearch }) {
  const [searchValue, setSearchValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    handleSearch(searchValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie or TV show..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;