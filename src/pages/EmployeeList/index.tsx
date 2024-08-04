import React, { useState } from 'react';
import useStore from '../../store';
import DataTable from '../../components/DataTable';
import Dropdown from '../../components/Dropdown';
import SearchBar from '../../components/SearchBar';
import './EmployeeList.scss';

const EmployeeList: React.FC = () => {
  const employees = useStore((state) => state.employees);
  const [entriesPerPage, setEntriesPerPage] = useState<string>('10');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(event.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredEmployees = employees.filter((employee) =>
    Object.entries(employee).some(([key, value]) => {
      let searchValue = value.toString().toLowerCase();
      let searchTermLower = searchTerm.toLowerCase();

      // Formater la date dans le format affiché
      if (key === 'startDate' || key === 'dateOfBirth') {
        // Obtenir le format de la langue du navigateur
        const userLang = navigator.language || 'en-US';
        searchValue = new Date(value as string).toLocaleDateString(userLang);
        searchTermLower = searchTerm.toLowerCase(); // Conserver la casse et la comparaison en minuscules
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
            <Dropdown
              label="Show"
              id="entries"
              options={entriesOptions}
              value={entriesPerPage}
              onChange={handleEntriesChange}
            />
            <label htmlFor="entries">entries</label>
          </div>
          <SearchBar onSearch={handleSearch} minCharacters={1} />
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
