import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Reviews from './components/Reviews';
import Review from './components/Review';
import ReviewsByCategory from './components/ReviewsByCategory.jsx';

function App() {
  return (
    <div className="app">
      <Header />
      <Nav />
      <Routes>
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/:category" element={<ReviewsByCategory />} />
        <Route path="/review/:review_id" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
