import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="content">
        <div className="not-found">
            <h1>404</h1>
            <h2>PAGE NOT FOUND</h2>
            <p>THe page you are looking for might have been remove had its name changed or it temporarily unavailable</p>
            <Link className="button" to="/">
                Homepage
            </Link>
        </div>
    </div>
  );
};

export default NotFound;
