import { useState, useEffect } from 'react';
import { getUsers } from '../api';
import { useContext } from 'react';
import userContext from '../contexts/User';

const Login = () => {
  const [users, setUsers] = useState([]);

  const { setUser } = useContext(userContext);

  useEffect(() => {
    getUsers().then(fetchedUsers => {
      setUsers(fetchedUsers);
    });
  }, []);

  const handleClick = event => {
    event.preventDefault();
    console.log(event);
    setUser(event.target.id);
  };

  return (
    <div className="users">
      {users.map(user => {
        return (
          <button id={user.username} onClick={handleClick} key={user.username}>
            {user.username}
            <img src={user.avatar_url} id={user.username} alt={user.username} />
          </button>
        );
      })}
    </div>
  );
};

export default Login;
