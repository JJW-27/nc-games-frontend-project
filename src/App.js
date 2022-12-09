import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserContext from './contexts/User';
import Header from './components/Header';
import Nav from './components/Nav';
import Login from './components/Login';
import Reviews from './components/Reviews';
import Review from './components/Review';

function App() {
  const [user, setUser] = useState('guest');
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="app">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reviews/:category" element={<Reviews />} />
          <Route path="/review/:review_id" element={<Review />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
