import { IEmployeeProps } from "@/interfaces/TypeEmployee";

export default async function employee(newEmployee: IEmployeeProps) {
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
