import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  department: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    // Ajoutez d'autres reducers si nécessaire
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
