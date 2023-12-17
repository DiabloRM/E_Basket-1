import { useLocation } from 'react-router-dom';
import { all_product } from '../Components/Assets/all_product';
import './CSS/SearchResults.css';
import Item from "../Components/Item/Item";

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');
  const results = all_product.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="search-results-container">
      <h2 className="search-results-subheader">Search Results for "{searchQuery}"</h2>
      <div></div>
      <div></div>
      <div></div>
      {results.map((item, idx) => (
        <div className="search-result-item" key={idx}>
          {item.category && (
            <Item
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
