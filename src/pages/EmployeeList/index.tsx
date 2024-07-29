import React from 'react';
import useStore from '../../store';
import './EmployeeList.scss';

const EmployeeList: React.FC = () => {
  const employees = useStore((state) => state.employees);

  return (
    <main className="main">
      <h1>Current employees</h1>
      <div className="employees-content">
        <section className="table-controls">
          <div className="table-controls--show">
            <label htmlFor="entries">Show</label>
            <select id="entries" aria-label="Number of entries to show">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <label htmlFor="entries">entries</label>
          </div>
          <div className="table-controls--search">
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" aria-label="Search in table" />
          </div>
        </section>
        <section className="table-content">
          <table
            id="employee-table"
            className="table-display"
            aria-labelledby="table-caption"
          >
            <caption id="table-caption" className="visually-hidden">
              List of current employees
            </caption>
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">Department</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Street</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Zip Code</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.startDate}</td>
                    <td>{employee.department}</td>
                    <td>{employee.dateOfBirth}</td>
                    <td>{employee.street}</td>
                    <td>{employee.city}</td>
                    <td>{employee.state}</td>
                    <td>{employee.zipCode}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
        <section className="table-pagination" aria-label="Pagination controls">
          <p className="table-pagination--info">Showing 1 to 4 of 4 entries</p>
          <nav aria-label="Table pagination" className="table-pagination--nav">
            <ul className="table-pagination--list">
              <li>
                {/* <a href="#" aria-label="Previous page">
                  &laquo; Previous
                </a>
              </li>
              <li>
                <a href="#" aria-label="Page 1">
                  1
                </a>
              </li>
              <li>
                <a href="#" aria-label="Next page">
                  Next &raquo;
                </a> */}
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </main>
  );
};

export default EmployeeList;
