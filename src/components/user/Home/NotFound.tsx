// src/components/NotFound.js

import { useNavigate } from 'react-router-dom';
import './NotFound.css'; // Create a CSS file for additional styles

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button className="not-found-button" onClick={handleGoHome}>
          Go back to the homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;