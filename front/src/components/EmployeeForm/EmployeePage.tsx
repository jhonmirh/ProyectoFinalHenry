// import { useState, useEffect } from "react";
// import EmployeeForm from "./EmployeeForm";
// import EmployeeList from "./EmployeeList";
// import { IEmployeeProps } from "@/interfaces/TypeEmployee";

// export default function EmployeeManager() {
//   const [employees, setEmployees] = useState<IEmployeeProps[]>([]);

//   useEffect(() => {
//     // Cargar la lista inicial de empleados desde la API
//     const fetchEmployees = async () => {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee`);
//       const data = await response.json();
//       setEmployees(data);
//     };
//     fetchEmployees();
//   }, []);

//   const addEmployee = (newEmployee: IEmployeeProps) => {
//     setEmployees([...employees, newEmployee]);
//   };

//   return (
//     <div>
//       <EmployeeForm addEmployee={addEmployee} />
//       <EmployeeList employees={employees} />
//     </div>
//   );
// }


