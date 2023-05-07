import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { ShelteredAnimal } from "../../models/ShelteredAnimals";

export const ShelteredAnimalDetail = () => {
const {shelteredAnimalId } = useParams();
const [shelteredAnimal, setShelteredAnimal] = useState<ShelteredAnimal>();

useEffect(() => {
   const fetchShelteredAnimal = async () => {
   try {
      const response = await fetch(`${BACKEND_API_URL}/shelteredanimals/${shelteredAnimalId}`);
      const shelteredAnimal = await response.json();
      setShelteredAnimal(shelteredAnimal);
   } catch (error) {
      console.log(error);
   }
   };
   fetchShelteredAnimal();
}, [shelteredAnimalId]);

return (
   <div>
   {shelteredAnimal && (
      <>
         <h2>{shelteredAnimal.commonName}</h2>
         <p><strong>Given Name:</strong> {shelteredAnimal.givenName}</p>
         <p><strong>Weight:</strong> {shelteredAnimal.weight}</p>
         <p><strong>Height:</strong> {shelteredAnimal.height}</p>
         <p><strong>Is Healthy:</strong> {shelteredAnimal.isHealthy}</p>
         <p><strong>Description:</strong> {shelteredAnimal.description}</p>
      </>
   )}
   </div>
);
};