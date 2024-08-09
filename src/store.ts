import { create } from 'zustand';
import mockEmployees from './data/mockEmployees.json'; // Importer les données générées

/**
 * Interface representing an employee.
 */
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
}

/**
 * Interface representing the global state of the application.
 */
interface EmployeeState {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
}

// Detect whether to use mock data
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';

/**
 * Saves the state to localStorage.
 *
 * @param {Employee[]} employees - The list of employees to save.
 */
const saveToLocalStorage = (employees: Employee[]) => {
  if (!useMockData) return; // Don't use localStorage if mock data is disabled
  try {
    const serializedState = JSON.stringify(employees);
    localStorage.setItem('zustandState', serializedState);
  } catch (e) {
    console.warn(e);
  }
};

/**
 * Loads the state from localStorage.
 *
 * @returns {Employee[]} The list of employees loaded from localStorage.
 */
const loadFromLocalStorage = (): Employee[] => {
  if (useMockData) return mockEmployees; // Use generated mock data if mock data is enabled
  try {
    const serializedState = localStorage.getItem('zustandState');
    if (serializedState === null) {
      return []; // Use an empty array if localStorage is empty
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return [];
  }
};

// Initialize the store with Zustand and persistence
const useStore = create<EmployeeState>((set) => ({
  employees: loadFromLocalStorage(),
  addEmployee: (employee: Employee) =>
    set((state) => {
      const newEmployees = [...state.employees, employee];
      saveToLocalStorage(newEmployees);
      return { employees: newEmployees, addEmployee: state.addEmployee };
    }),
}));

export default useStore;
