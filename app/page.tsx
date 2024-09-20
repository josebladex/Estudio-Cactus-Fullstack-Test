import RoomConfigurator from "./_components/room-configurator";
import { fetchPoints, fetchMaterials } from "@/api/firebase-actions";


const Home = async () => {
  const points = await fetchPoints();
  const materials = await fetchMaterials();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <RoomConfigurator points={points} materials={materials} />
    </div>
  );
};

export default Home;
