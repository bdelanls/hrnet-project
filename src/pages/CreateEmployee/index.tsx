import React, { useState } from 'react';
import Dropdown from '../../components/Dropdown';
import states from '../../data/states.json';
import departments from '../../data/departments.json';
import './CreateEmployee.scss';

const CreateEmployee: React.FC = () => {
  const [state, setState] = useState('');
  const [department, setDepartment] = useState('');

  const stateOptions = states.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  const departmentOptions = departments.map((department) => ({
    value: department.name,
    label: department.name,
  }));

  return (
    <main className="main create">
      <h1>Create employee</h1>
      <form action="#" className="form-employee" aria-labelledby="form-title">
        <div className="form-col">
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" aria-required="true" />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" aria-required="true" />
          </div>
          <div className="form-group">
            <label htmlFor="date-of-birth">Date of Birth</label>
            <input id="date-of-birth" type="date" aria-required="true" />
          </div>
          <div className="form-group">
            <label htmlFor="start-date">Start Date</label>
            <input id="start-date" type="date" aria-required="true" />
          </div>
        </div>

        <fieldset className="form-address">
          <legend>Address</legend>

          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input id="street" type="text" aria-required="true" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input id="city" type="text" aria-required="true" />
          </div>
          <Dropdown
            label="State"
            id="state"
            options={stateOptions}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <div className="form-group">
            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" aria-required="true" />
          </div>
        </fieldset>

        <div className="form-col">
          <Dropdown
            label="Department"
            id="department"
            options={departmentOptions}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <div className="form-group">
            <button className="btn" aria-label="Save employee">
              Save
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateEmployee;
