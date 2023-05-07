import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { ShelteredAnimal } from "../../models/ShelteredAnimals";

export const ShelteredAnimalDelete = () => {
   const { shelteredAnimalId } = useParams();
   const navigate = useNavigate();
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

   const deleteShelteredAnimal = async () => {
      try {
      await fetch(`${BACKEND_API_URL}/shelteredanimals/${shelteredAnimalId}`, {
         method: "DELETE",
      });
      navigate("/shelteredanimals");
      } catch (error) {
      console.log(error);
      }
   };

   return (
      <div>
      <h2>Delete Sheltered Animal</h2>
      {shelteredAnimal && (
         <>
            <p>Are you sure you want to delete {shelteredAnimal.commonName}?</p>
            <button onClick={deleteShelteredAnimal}>Delete</button>
         </>
      )}
      </div>
   );
};