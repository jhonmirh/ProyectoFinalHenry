import RoomDetail from "@/components/Rooms/RoomDetail";
import { getRoomById } from "@/api/getRooms";
import NotFound from "@/app/not-found";

interface Params {
  id: string;
  price:number;
}

const Page = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params; 
  const { id,price } = resolvedParams;

console.log('====================================');
console.log(price);
console.log('====================================');


  try {
    const room = await getRoomById(id);

    if (!room) {
      return <NotFound />;
    }

    return (
      <div className="min-h-[75vh] pt-40 pb-20 px-16">
        <RoomDetail {...room} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching room:", error);

    return <NotFound />;
  }
};

export default Page;
