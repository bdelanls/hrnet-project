import React, { useState } from 'react';
import './SearchBar.scss';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  minCharacters?: number; // Minimum de caractères avant de commencer la recherche
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Type to search...',
  minCharacters = 1, // Valeur par défaut
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length >= minCharacters) {
      onSearch(value);
    } else {
      onSearch(''); // Réinitialiser la recherche si trop peu de caractères
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
