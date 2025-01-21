import EmployeeForm from "@/components/EmployeeForm/EmployeeForm";
import ProtectedAdmin from "@/components/ProtectedAdmin/page";
import AppEmploye from "@/components/EmployeeForm/EmployeePage";



const employeePage = () => {
  
  return (


    <ProtectedAdmin>
      <div>
        {/* <EmployeeForm /> */}
        <AppEmploye/>
      </div>
    </ProtectedAdmin>

  );
};

export default employeePage;
