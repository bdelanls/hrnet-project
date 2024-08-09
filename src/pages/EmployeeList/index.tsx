import React, { useState } from 'react';
import useStore from '../../store';
import DataTable from '../../components/DataTable';
import Dropdown from '../../components/Dropdown';
import SearchBar from '../../components/SearchBar';
import './EmployeeList.scss';

/**
 * EmployeeList component displays the current list of employees with features like pagination,
 * search functionality and the ability to change the number of entries shown per page.
 *
 * @returns {React.ReactElement} The rendered EmployeeList component.
 */
const EmployeeList: React.FC = () => {
  const employees = useStore((state) => state.employees);
  const [entriesPerPage, setEntriesPerPage] = useState<string>('10');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Handles the change in the number of entries per page
   * and resets the pagination to the first page.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event triggered when the dropdown value changes.
   */
  const handleEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(event.target.value);
    setCurrentPage(1);
  };

  /**
   * Handles the search input by the user
   * and resets the pagination to the first page.
   *
   * @param {string} term - The search term entered by the user.
   */
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  /**
   * Filters the employees list based on the search term.
   * It also formats the date fields (startDate, dateOfBirth) according to the user's locale.
   *
   * @returns {Employee[]} The filtered list of employees.
   */
  const filteredEmployees = employees.filter((employee) =>
    Object.entries(employee).some(([key, value]) => {
      let searchValue = value.toString().toLowerCase();
      let searchTermLower = searchTerm.toLowerCase();

      // Format date fields to match the user's locale
      if (key === 'startDate' || key === 'dateOfBirth') {
        const userLang = navigator.language || 'en-US';
        searchValue = new Date(value as string).toLocaleDateString(userLang);
        searchTermLower = searchTerm.toLowerCase();
      }

      return searchValue.includes(searchTermLower);
    })
  );

  const entriesOptions = [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ];

  return (
    <main className="main">
      <h1>Current employees</h1>
      <div className="employees-content">
        <section className="table-controls">
          <div className="table-controls--show">
            <label htmlFor="entries">Show</label>
            <Dropdown
              label="Number of entries to show"
              id="entries"
              options={entriesOptions}
              value={entriesPerPage}
              onChange={handleEntriesChange}
              aria-labelledby="entries-label"
            />
            <label id="entries-label" htmlFor="entries">
              entries
            </label>
          </div>
          <SearchBar
            onSearch={handleSearch}
            minCharacters={1}
            aria-label="Search in employee table"
          />
        </section>
        <DataTable
          employees={filteredEmployees}
          entriesPerPage={parseInt(entriesPerPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
};

export default EmployeeList;
