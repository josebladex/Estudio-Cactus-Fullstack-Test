"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { IoFingerPrint } from "react-icons/io5";
import { Point, Material } from "@/api/firebase-actions";
import { cn } from "@/utils/classNames";

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

const LayerImage = React.memo(function LayerImage({ layer }: { layer: Layer }) {
  return (
    <Image
      src={layer.layer}
      alt={layer.name}
      className="absolute top-0 left-0 w-full h-full z-20"
      width={1240}
      height={873}
    />
  );
});

const RoomConfigurator: React.FC<RoomConfiguratorProps> = ({
  points,
  materials,
}) => {
  const [sidebar, setSidebar] = useState<Sidebar | null>(null);
  const [layers, setLayers] = useState<Layer[]>([]);

  const handlePointClick = useCallback(
    (pointId: string) => {
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
            (material) => material.layers[pointId] || "Not Layer"
          ),
        });
      }
    },
    [materials]
  );

  return (
    <div className="relative w-full">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/base.jpeg?alt=media&token=358ccdea-3cf9-4751-ae48-4631e4700554"
        alt="Room"
        priority
        className="w-full h-auto z-10 object-cover"
        width={1240}
        height={873}
      />

      {layers.map((layer, idx) => (
        <LayerImage key={idx} layer={layer} />
      ))}

      {points.map((point) => (
        <div
          key={point.id}
          className="cursor-pointer absolute rotate-12 z-50 rounded-full p-2 sm:p-1 bg-slate-500/50 border hover:scale-110 duration-200 ease-in-out border-white"
          style={{
            top: `${point.y}%`,
            left: `${point.x}%`,
          }}
          onClick={() => handlePointClick(point.id)}
        >
          <IoFingerPrint className="w-3 h-3 md:w-5 md:h-5 lg:w-7 lg:h-7" />
        </div>
      ))}

      {sidebar && (
        <div
          className={cn(
            "flex absolute  max_md:-bottom-1/2 right-4 z-30 h-auto bg-transparent shadow-lg ",
            "md:top-1/4 max_md:w-full md:flex-col max_md:flex-row"
          )}
        >
          <div className={"p-4 text-black italic items-center justify-center"}>
            {sidebar.names.map((name, index) => (
              <div
                key={index}
                className="flex flex-row items-center w-full justify-center"
              >
                <div className={`flex items-center justify-center`}>
                  <p
                    className={`text-xs md:text-sm 
                      w-1/2 h-1/2 flex items-center justify-center`}
                  >
                    {name}
                  </p>
                  <Image
                    key={index}
                    src={sidebar.materialPreviews[index]}
                    alt={sidebar.names[index]}
                    className="p-2 w-1/2 h-1/2 cursor-pointer hover:scale-110 duration-300 ease-in-out"
                    width={112}
                    height={112}
                    onClick={() => {
                      const newLayer = {
                        layer: sidebar.layers[index],
                        name: sidebar.names[index],
                      };
                      setLayers((prevLayers) => [...prevLayers, newLayer]);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomConfigurator;
