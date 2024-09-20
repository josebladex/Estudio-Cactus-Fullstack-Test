"use client"
import { useState } from "react";
import Image from "next/image";
import { IoFingerPrint } from "react-icons/io5";
import { Point, Material } from "@/api/firebase-actions";

interface Sidebar {
  point: string;
  materialPreviews: string[];
  layers: string[];
  names: string[];
}

interface Layer {
  layer: string;
  name: string;
}

interface RoomConfiguratorProps {
  points: Point[];
  materials: Material[];
}

const RoomConfigurator: React.FC<RoomConfiguratorProps> = ({ points, materials }) => {
  const [sidebar, setSidebar] = useState<Sidebar | null>(null);
  const [layer, setLayer] = useState<Layer | null>(null);

  const handlePointClick = (pointId: string) => {
    const selectedMaterials = materials.filter((material) =>
      material.points.includes(pointId)
    );

    if (selectedMaterials.length > 0) {
      setSidebar({
        point: pointId,
        materialPreviews: selectedMaterials.map(
          (material) => material.materialPreview
        ),
        names: selectedMaterials.map((material) => material.name),
        layers: selectedMaterials.map(
          (material) => material.layers[pointId] || "Sin capa"
        ),
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/base.jpeg?alt=media&token=358ccdea-3cf9-4751-ae48-4631e4700554"
        alt="Room"
        className="w-full h-auto z-10"
        width={1240}
        height={873}
      />
      {layer && (
        <Image
          src={layer.layer}
          alt={layer.name}
          className="absolute top-0 left-0 w-full h-full z-20"
          width={1240}
          height={873}
        />
      )}
      {points.map((point) => (
        <div
          key={point.id}
          className="cursor-pointer absolute rotate-12 z-30 rounded-full bg-slate-500/50 p-2 border hover:scale-110 duration-200 ease-in-out border-white"
          style={{
            top: `${point.y}%`,
            left: `${point.x}%`,
          }}
          onClick={() => handlePointClick(point.id)}
        >
          <IoFingerPrint className="w-5 h-5" />
        </div>
      ))}
      
      {sidebar && (
        <div className="flex absolute top-1/4 right-4 z-30 w-auto h-auto bg-transparent shadow-lg flex-col md:flex-row">
          <div className="p-4 text-black italic">
            {sidebar.names.map((name, index) => (
              <div key={index} className="flex items-center justify-center mb-2">
                {layer && (
                  <p className="text-xs md:text-sm w-20 md:w-28 h-20 md:h-28 flex items-center justify-center">
                    {name}
                  </p>
                )}
                <Image
                  key={index}
                  src={sidebar.materialPreviews[index]}
                  alt={sidebar.names[index]}
                  className="p-2 w-20 md:w-28 h-20 md:h-28 cursor-pointer hover:scale-110 duration-300 ease-in-out"
                  width={112}
                  height={112}
                  onClick={() => {
                    setLayer({
                      layer: sidebar.layers[index],
                      name: sidebar.names[index],
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomConfigurator;
