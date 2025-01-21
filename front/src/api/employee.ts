import { IEmployee } from "@/interfaces/TypeEmployee";

async function createEmployee(newEmployee: IEmployee) {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${APIURL}/employee`, {
      method: "POST",
    headers: {    
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });

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
}

async function updateEmployeeById(employeeId: string) {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${APIURL}/employee/${employeeId}`, {
      method: "PUT", // O puedes usar "PATCH" si solo actualizas algunos campos
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeId),
    });

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
}

async function disableEmployeeById(employeeId: string, disableEmployee: IEmployeeProps) {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${APIURL}/employee/${employeeId}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(disableEmployee),
    });

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
}

// ENDPOINT 
const APIURL = process.env.NEXT_PUBLIC_API_URL;
 const getEmployee = async () => {
  const response = await fetch(`${APIURL}/employee`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};


export {
  createEmployee,
  updateEmployeeById, getEmployee
};