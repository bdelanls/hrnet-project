import React, { useState } from 'react';
import Dropdown from '../../components/Dropdown';
import DatePicker from '../../components/DatePicker';
import useStore from '../../store';
import states from '../../data/states.json';
import departments from '../../data/departments.json';
import './CreateEmployee.scss';

const CreateEmployee: React.FC = () => {
  const addEmployee = useStore((state) => state.addEmployee);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [startDate, setStartDate] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [department, setDepartment] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const stateOptions = states.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  const departmentOptions = departments.map((department) => ({
    value: department.name,
    label: department.name,
  }));

  const handleDateOfBirthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDateOfBirth = event.target.value;
    setDateOfBirth(newDateOfBirth);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      today.setFullYear(today.getFullYear() - 16);
      if (birthDate > today)
        newErrors.dateOfBirth = 'A bit too young to be an employee';
    }
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    } else if (dateOfBirth && new Date(startDate) < new Date(dateOfBirth)) {
      newErrors.startDate = 'Not before birth!';
    } else if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const minStartDate = new Date(birthDate);
      minStartDate.setFullYear(birthDate.getFullYear() + 16);
      if (new Date(startDate) < minStartDate) {
        newErrors.startDate = 'Too young to start';
      }
    }
    if (!street) newErrors.street = 'Street is required';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';
    if (!zipCode) newErrors.zipCode = 'Zip code is required';
    if (!department) newErrors.department = 'Department is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      const newEmployee = {
        id: Date.now(),
        firstName,
        lastName,
        dateOfBirth,
        startDate,
        street,
        city,
        state,
        zipCode,
        department,
      };
      addEmployee(newEmployee);
      // Réinitialiser le formulaire
      setFirstName('');
      setLastName('');
      setDateOfBirth('');
      setStartDate('');
      setStreet('');
      setCity('');
      setState('');
      setZipCode('');
      setDepartment('');
    } else {
      console.log('Form is invalid.');
    }
  };

  return (
    <main className="main create">
      <h1>Create employee</h1>
      <form
        onSubmit={handleSubmit}
        className="form-employee"
        aria-labelledby="form-title"
      >
        <div className="form-col">
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              aria-required="true"
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              aria-required="true"
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
          <div className="form-group">
            <DatePicker
              label="Date of Birth"
              id="date-of-birth"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.dateOfBirth && (
              <p className="error">{errors.dateOfBirth}</p>
            )}
          </div>
          <div className="form-group">
            <DatePicker
              label="Start Date"
              id="start-date"
              value={startDate}
              onChange={handleStartDateChange}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.startDate && <p className="error">{errors.startDate}</p>}
          </div>
        </div>

        <fieldset className="form-address">
          <legend>Address</legend>

          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              aria-required="true"
            />
            {errors.street && <p className="error">{errors.street}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-required="true"
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div className="form-group">
            <Dropdown
              label="State"
              id="state"
              options={stateOptions}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              min="0"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              aria-required="true"
            />
            {errors.zipCode && <p className="error">{errors.zipCode}</p>}
          </div>
        </fieldset>

        <div className="form-col">
          <div className="form-group">
            <Dropdown
              label="Department"
              id="department"
              options={departmentOptions}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            {errors.department && <p className="error">{errors.department}</p>}
          </div>
          <div className="form-group">
            <button type="submit" className="btn" aria-label="Save employee">
              Save
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateEmployee;
