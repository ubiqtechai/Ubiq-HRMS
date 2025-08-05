// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsnEgU8Ywp8-dnK3eMZ32Wf_J13pIhnKI",
  authDomain: "ubiq-hrms.firebaseapp.com",
  projectId: "ubiq-hrms",
  storageBucket: "ubiq-hrms.firebasestorage.app",
  messagingSenderId: "264254479807",
  appId: "1:264254479807:web:122e5620d6e2524261d50a",
  measurementId: "G-JNXZJPM5ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Employee interface
export interface Employee {
  id?: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  location: string;
  joiningDate: string;
  avatar: string;
  employeeId: string;
  dateOfBirth: string;
  bloodGroup: string;
}

// Employee CRUD operations
export const employeesCollection = collection(db, 'employee');

export const addEmployee = async (employee: Omit<Employee, 'id'>) => {
  try {
    const docRef = await addDoc(employeesCollection, employee);
    return docRef.id;
  } catch (error) {
    console.error("Error adding employee: ", error);
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    const querySnapshot = await getDocs(employeesCollection);
    const employees: Employee[] = [];
    querySnapshot.forEach((doc) => {
      employees.push({ id: doc.id, ...doc.data() } as Employee);
    });
    return employees;
  } catch (error) {
    console.error("Error getting employees: ", error);
    throw error;
  }
};

export const updateEmployee = async (id: string, employee: Partial<Employee>) => {
  try {
    const employeeRef = doc(db, 'employee', id);
    await updateDoc(employeeRef, employee);
  } catch (error) {
    console.error("Error updating employee: ", error);
    throw error;
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'employee', id));
  } catch (error) {
    console.error("Error deleting employee: ", error);
    throw error;
  }
};

export const subscribeToEmployees = (callback: (employees: Employee[]) => void) => {
  return onSnapshot(employeesCollection, (querySnapshot) => {
    const employees: Employee[] = [];
    querySnapshot.forEach((doc) => {
      employees.push({ id: doc.id, ...doc.data() } as Employee);
    });
    callback(employees);
  });
};

export { app, analytics, db };