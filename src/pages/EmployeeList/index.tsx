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

  const handleEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(event.target.value);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
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
        />
      </div>
    </main>
  );
};

export default EmployeeList;
