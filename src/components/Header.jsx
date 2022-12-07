import { useContext } from 'react';
import userContext from '../contexts/User';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useContext(userContext);
  return (
    <header>
      <h1>Roundtable</h1>
      <p>
        Logged in as: <Link to="/">{`${user}`}</Link>
      </p>
    </header>
  );
};

export default Header;
