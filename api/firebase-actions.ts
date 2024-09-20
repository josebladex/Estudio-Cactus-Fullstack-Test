"use server"
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Point {
  id: string;
  x: number;
  y: number;
}

export interface Material {
  points: string[];
  materialPreview: string;
  layers: { [key: string]: string };
  name: string;
}

export const fetchPoints = async (): Promise<Point[]> => {
  const querySnapshot = await getDocs(collection(db, "points"));
  const pointsArray: Point[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    pointsArray.push({
      id: doc.id,
      x: data.coordX,
      y: data.coordY,
    });
  });

  return pointsArray;
};

export const fetchMaterials = async (): Promise<Material[]> => {
  const querySnapshot = await getDocs(collection(db, "materials"));
  const materialsArray: Material[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    materialsArray.push({
      layers: data.layers,
      materialPreview: data.materialPreview,
      name: data.name,
      points: data.points,
    });
  });

  return materialsArray;
};
