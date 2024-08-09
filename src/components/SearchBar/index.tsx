import React, { useState } from 'react';
import './SearchBar.scss';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  minCharacters?: number; // Minimum de caractères avant de commencer la recherche
}

/**
 * SearchBar component provides a text input for users to search through a list of items.
 * It includes a clear button to reset the search term.
 *
 * @param {function} onSearch - Callback function triggered when the search term changes.
 * @param {string} [placeholder='Type to search...'] - Placeholder text for the search input field.
 * @param {number} [minCharacters=1] - Minimum number of characters required to trigger the search.
 * @returns {React.ReactElement} The rendered SearchBar component.
 */
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Type to search...',
  minCharacters = 1,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length >= minCharacters) {
      onSearch(value);
    } else {
      onSearch('');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="table-controls--search">
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        aria-label="Search in table"
      />
      {searchTerm && (
        <button
          type="button"
          className="clear-button"
          aria-label="Clear search"
          onClick={clearSearch}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default SearchBar;
