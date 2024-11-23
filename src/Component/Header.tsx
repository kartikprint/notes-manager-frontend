import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="mb-8">
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Personal Notes Manager</Link>
      </nav>
    </header>
  );
};

export default Header;

