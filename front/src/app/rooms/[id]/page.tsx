import RoomDetail from "@/components/Rooms/RoomDetail";
import { getRoomById } from "@/api/getRooms";
import NotFound from "@/app/not-found";
import ProtectedClient from "@/components/ProtectedClient/page";

interface Params {
  id: string;
  price: number;
}

const Page = async ({ params }: { params: { id: string } }) => {
  try {
    const { id } = await params;
    const room = await getRoomById(id);

    if (!room) {
      return <NotFound />;
    }

    return (
      <ProtectedClient>
        <div className="min-h-[75vh] pt-40 pb-20 px-16">
          <RoomDetail {...room} />
        </div>
      </ProtectedClient>
    );
  } catch (error) {
    console.error("Error fetching room:", error);
    return <NotFound />;
  }
};

export default Page;
