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

"use client";
import { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import { IEmployeeProps } from "@/interfaces/TypeEmployee";

const App = () => {
  const [employees, setEmployees] = useState<IEmployeeProps[]>([]);
  // const [selectedEmployee, setSelectedEmployee] = useState<IEmployeeProps | null>(null);
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const fetchEmployees = async () => {

    try {
    const response = await fetch(`${APIURL}/employee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setEmployees(data);

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al comunicarse con el servidor",
      error,
    };
  }
  };


  useEffect(() => {
    fetchEmployees();
  }, []);


  const addEmployee = (newEmployee: IEmployeeProps) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };


  return (
    <div>
<EmployeeForm
        addEmployee={addEmployee}

      />
      <EmployeeList employees={employees} />
    </div>
  );
};

export default App;


