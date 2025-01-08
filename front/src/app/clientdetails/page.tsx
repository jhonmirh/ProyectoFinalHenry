import ClientList from "@/components/ClientList/ClientList";
import ProtectedAdmin from "@/components/ProtectedAdmin/page";

const clientDetails = () => {
  return (
    <ProtectedAdmin>
      <div>
        <ClientList />
      </div>
    </ProtectedAdmin>
  );
};

export default clientDetails;
