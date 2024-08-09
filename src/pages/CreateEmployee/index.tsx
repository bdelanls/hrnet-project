import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/Dropdown';
import DatePicker from '../../components/DatePicker';
import useStore, { Employee } from '../../store';
import states from '../../data/states.json';
import departments from '../../data/departments.json';
import Modal from '../../components/Modal';
import './CreateEmployee.scss';

/**
 * The CreateEmployee component is a form for creating a new employee record.
 * It includes fields for personal information, address, and department,
 * and uses Zustand for state management.
 */
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Employee | null>(null);

  const navigate = useNavigate();

  const stateOptions = states.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  const departmentOptions = departments.map((department) => ({
    value: department.name,
    label: department.name,
  }));

  /**
   * Handles the change event for the date of birth input field.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleDateOfBirthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDateOfBirth = event.target.value;
    setDateOfBirth(newDateOfBirth);
  };

  /**
   * Handles the change event for the start date input field.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
  };

  /**
   * Validates the form inputs and sets error messages if necessary.
   * @returns {boolean} True if the form is valid, false otherwise.
   */
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

  /**
   * Handles the form submission, validates the form, and adds a new employee if valid.
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      const newEmployeeData: Employee = {
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
      addEmployee(newEmployeeData);
      setNewEmployee(newEmployeeData);
      setIsModalOpen(true);

      // Reset the form
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

  // Reference for the first button in the modal
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  // Set focus to the first button when the modal is opened
  useEffect(() => {
    if (isModalOpen && firstButtonRef.current) {
      firstButtonRef.current.focus();
    }
  }, [isModalOpen]);

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
              firstOption={{ value: '', label: 'Your choice' }}
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
              firstOption={{ value: '', label: 'Your choice' }}
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Employee Created"
        size="medium"
        backdropOpacity={0.5}
        showCloseButton={true}
      >
        <div id="employee-created-description">
          {newEmployee && (
            <>
              <p>{`${newEmployee.firstName} ${newEmployee.lastName} has been successfully created.`}</p>
              <div className="modal-buttons">
                <button
                  ref={firstButtonRef}
                  className="btn btn-primary"
                  onClick={() => {
                    setIsModalOpen(false);
                    navigate('/create-employee');
                  }}
                >
                  Create another employee
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    navigate('/current-employees');
                  }}
                >
                  View current employees
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </main>
  );
};

export default CreateEmployee;
