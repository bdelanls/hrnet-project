import { create } from 'zustand';

// Interface pour l'état des employés
interface Employee {
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

// Interface pour l'état global de l'application
interface EmployeeState {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
}

// Initialisation du store avec Zustand
const useStore = create<EmployeeState>((set) => ({
  employees: [],
  addEmployee: (employee: Employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),
}));

export default useStore;
