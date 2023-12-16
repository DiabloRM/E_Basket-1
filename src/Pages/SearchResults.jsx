// SearchResults.js

import { useLocation } from 'react-router-dom';
import { searchProducts } from '../Components/Assets/all_product';
import './CSS/SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const results = searchProducts(searchQuery);

  return (
    <div className="search-results-container">
      <h2 className="search-results-subheader">Search Results for "{searchQuery}"</h2>
      <h3> </h3> 
      <br /> 
      <h3> </h3> 
      {results.map((product) => (
        <div key={product.id}>
          <a
            href={`#product/${product.id}`} // Add your product link or route here
            className="search-result-item">
            <img className="product-image" src={product.image} alt={product.name} />
            <p className="product-name">{product.name}</p>
            <p className="product-category">{product.category}</p>
            <div className="product-prices">
            <p className="old-price">${product.old_price}</p>
            <p>${product.new_price}</p>
            </div>
            {/* Add more details as needed */}
          </a>
          <br />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
