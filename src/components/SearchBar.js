import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Tìm kiếm theo nguyên liệu..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;

