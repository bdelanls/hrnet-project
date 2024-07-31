import React, { useState } from 'react';
import { Employee } from '../../store';
import { formatDate } from '../../utils/dateFormatters';
import Pagination from '../Pagination';
import PaginationInfo from '../PaginationInfo';
import './DataTable.scss';

interface DataTableProps {
  employees: Employee[];
  entriesPerPage: number;
}

const DataTable: React.FC<DataTableProps> = ({ employees, entriesPerPage }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: 'asc' | 'desc';
  }>({
    key: 'firstName',
    direction: 'asc',
  });

  const sortedEmployees = [...employees].sort((a, b) => {
    const aValue = a[sortConfig.key].toString().toLowerCase();
    const bValue = b[sortConfig.key].toString().toLowerCase();

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const totalEmployees = sortedEmployees.length;
  const indexOfLastEmployee = currentPage * entriesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - entriesPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

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
