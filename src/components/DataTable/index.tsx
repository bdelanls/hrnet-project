import React, { useState, useEffect } from 'react';
import { Employee } from '../../store';
import { formatDate } from '../../utils/dateFormatters';
import Pagination from '../Pagination';
import PaginationInfo from '../PaginationInfo';
import './DataTable.scss';

interface DataTableProps {
  employees: Employee[];
  entriesPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * DataTable component displays a paginated, sortable table of employees.
 *
 * @param {Employee[]} employees - The list of employees to display.
 * @param {number} entriesPerPage - The number of entries to display per page.
 * @param {number} currentPage - The current page number in the pagination.
 * @param {React.Dispatch<React.SetStateAction<number>>} setCurrentPage - Function to update the current page number.
 * @returns {React.ReactElement} The rendered DataTable component.
 */
const DataTable: React.FC<DataTableProps> = ({
  employees,
  entriesPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: 'asc' | 'desc';
  }>({
    key: 'firstName',
    direction: 'asc',
  });

  /**
   * Sorts the employees based on the current sort configuration.
   *
   * @returns {Employee[]} The sorted list of employees.
   */
  const sortedEmployees = [...employees].sort((a, b) => {
    let aValue: string | number = a[sortConfig.key];
    let bValue: string | number = b[sortConfig.key];

    if (sortConfig.key === 'startDate' || sortConfig.key === 'dateOfBirth') {
      // Convert the values to Date objects for comparison
      const dateA = new Date(aValue as string);
      const dateB = new Date(bValue as string);

      if (dateA < dateB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (dateA > dateB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    } else {
      // Compare values as strings or numbers
      aValue = aValue.toString().toLowerCase();
      bValue = bValue.toString().toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    }
  });

  // Pagination logic
  const totalEmployees = sortedEmployees.length;
  const indexOfLastEmployee = currentPage * entriesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - entriesPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Resets the current page to 1 whenever the entriesPerPage changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [entriesPerPage, setCurrentPage]);

  // Handles the sorting of the table by updating the sort configuration.
  const handleSort = (key: keyof Employee) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
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
              {[
                { key: 'firstName', label: 'First Name' },
                { key: 'lastName', label: 'Last Name' },
                { key: 'startDate', label: 'Start Date' },
                { key: 'department', label: 'Department' },
                { key: 'dateOfBirth', label: 'Date of Birth' },
                { key: 'street', label: 'Street' },
                { key: 'city', label: 'City' },
                { key: 'state', label: 'State' },
                { key: 'zipCode', label: 'Zip Code' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  scope="col"
                  onClick={() => handleSort(key as keyof Employee)}
                  className={`${
                    sortConfig.key === key
                      ? 'active ' + sortConfig.direction
                      : ''
                  }`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{formatDate(employee.startDate)}</td>
                  <td>{employee.department}</td>
                  <td>{formatDate(employee.dateOfBirth)}</td>
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
        <PaginationInfo
          currentPage={currentPage}
          itemsPerPage={entriesPerPage}
          totalItems={totalEmployees}
        />
        <Pagination
          totalItems={totalEmployees}
          itemsPerPage={entriesPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </section>
    </>
  );
};

export default DataTable;
