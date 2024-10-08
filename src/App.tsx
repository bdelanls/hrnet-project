import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';
import NotFound from './pages/NotFound';
import './styles/app.scss';

/**
 * Main application component.
 * Sets up the routing for the application using React Router.
 * Includes the Header and defines routes for different pages.
 *
 * @returns {JSX.Element} The rendered App component.
 */
const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/current-employees" element={<EmployeeList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
