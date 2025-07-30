import './SearchBar.css'

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <h3>Search</h3>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search questions, answers, or categories..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <div className="search-icon">🔍</div>
      </div>
      {searchTerm && (
        <div className="search-info">
          Searching for: <strong>"{searchTerm}"</strong>
          <button 
            onClick={() => onSearchChange('')}
            className="clear-search"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchBar