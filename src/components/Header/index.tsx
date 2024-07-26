import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/hrnet.png';

const Header: React.FC = () => {
  const location = useLocation();
  const isCreateEmployeePage =
    location.pathname === '/' || location.pathname === '/create-employee';

  return (
    <header className="header" role="banner">
      <div className="header-content">
        <Link to="/">
          <img src={Logo} width="216" height="62" alt="HRnet Wealth Health" />
        </Link>
        {isCreateEmployeePage ? (
          <Link
            to="/current-employees"
            className="btn"
            role="button"
            aria-label="View Current Employees"
          >
            View Current Employees
          </Link>
        ) : (
          <Link
            to="/create-employee"
            className="btn"
            role="button"
            aria-label="Create Employee"
          >
            Create Employee
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
