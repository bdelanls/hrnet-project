import { create } from 'zustand';
import mockEmployees from './data/mockEmployees.json'; // Importer les données générées

// Interface pour l'état des employés
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

// Interface pour l'état global de l'application
interface EmployeeState {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
}

// Détecter si nous devons utiliser les données de mock
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// Fonction pour sauvegarder l'état dans localStorage
const saveToLocalStorage = (employees: Employee[]) => {
  if (!useMockData) return; // Ne pas utiliser localStorage si les données de mock sont désactivées
  try {
    const serializedState = JSON.stringify(employees);
    localStorage.setItem('zustandState', serializedState);
  } catch (e) {
    console.warn(e);
  }
};

// Fonction pour charger l'état depuis localStorage
const loadFromLocalStorage = (): Employee[] => {
  if (useMockData) return mockEmployees; // Utiliser les données générées si les données de mock sont activées
  try {
    const serializedState = localStorage.getItem('zustandState');
    if (serializedState === null) {
      return []; // Utiliser un tableau vide si localStorage est vide
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return []; // Utiliser un tableau vide en cas d'erreur
  }
};

// Initialisation du store avec Zustand et persistance
const useStore = create<EmployeeState>((set) => ({
  employees: loadFromLocalStorage(),
  addEmployee: (employee: Employee) =>
    set((state) => {
      const newEmployees = [...state.employees, employee];
      saveToLocalStorage(newEmployees); // Sauvegarder uniquement les employés si mock data est activé
      return { employees: newEmployees, addEmployee: state.addEmployee };
    }),
}));

export default useStore;
