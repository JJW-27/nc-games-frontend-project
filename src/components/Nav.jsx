import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategories } from '../api';

const Nav = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(fetchedCategories => {
      setCategories(fetchedCategories);
    });
  }, []);

  return (
    <nav>
      <Link to="/reviews/all-reviews">
        <button>All reviews</button>
      </Link>
      {categories.map(category => {
        return (
          <Link key={category.slug} to={`/reviews/${category.slug}`}>
            <button>{category.slug}</button>
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
