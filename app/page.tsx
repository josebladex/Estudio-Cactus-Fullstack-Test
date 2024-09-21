import RoomConfigurator from "./_components/room-configurator";
import { fetchPoints, fetchMaterials } from "@/api/firebase-actions";

const Home = async () => {
  const points = await fetchPoints();
  const materials = await fetchMaterials();

  return (

      <main className="max-w-7xl mx-auto relative">
        <RoomConfigurator points={points} materials={materials} />
      </main>

  );
};

export default Home;
