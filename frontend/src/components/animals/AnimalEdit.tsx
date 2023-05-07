import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { ShelteredAnimal } from "../../models/ShelteredAnimals";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const ShelteredAnimalEdit = () => {
   const navigate = useNavigate();
   const { shelteredAnimalId } = useParams();

   const [shelteredAnimal, setShelteredAnimal] = useState<ShelteredAnimal>({
      commonName: "",
      givenName: "",
      weight: 0,
      height: 0,
      isHealthy: "",
      description: "",
   });

   useEffect(() => {
      const fetchShelteredAnimal = async () => {
         try {
            const response = await fetch(`${BACKEND_API_URL}/shelteredanimals/${shelteredAnimalId}`);
            const shelteredAnimal = await response.json();
            setShelteredAnimal(shelteredAnimal);
            // console.log(shelteredAnimal);
         } catch (error) {
            console.log(error);
         }
      };
      fetchShelteredAnimal();
   }, [shelteredAnimalId]);

   const updateShelteredAnimal = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      try {
         await axios.put(`${BACKEND_API_URL}/shelteredanimals/${shelteredAnimalId}`, shelteredAnimal);
         navigate("/shelteredanimals");
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Container sx={{height:"100vh"}}>
         <Card sx={{background:"#EEE5E9"}}>
            <CardContent>
               <IconButton component={Link} sx={{ mr: 3 }} to={`/shelteredanimals/`}>
                  <ArrowBackIcon />
               </IconButton>{" "}
               <form onSubmit={updateShelteredAnimal}>
                  <TextField
                     id="commonName"
                     label="Common Name"
                     variant="outlined"
                     fullWidth
                     sx={{ mb: 2 }}
                     value={shelteredAnimal.commonName}
                     onChange={(event) => setShelteredAnimal({ ...shelteredAnimal, commonName: event.target.value })}
                  />
                  <TextField
                     id="givenName"
                     label="Given Name"
                     variant="outlined"
                     fullWidth
                     sx={{ mb: 2 }}
                     value={shelteredAnimal.givenName}
                     onChange={(event) => setShelteredAnimal({ ...shelteredAnimal, givenName: event.target.value })}
                  />
                  <TextField
                     id="weight"
                     label="Weight (kg)"
                     variant="outlined"
                     fullWidth
                     sx={{ mb: 2 }}
                     value={shelteredAnimal.weight}
                     onChange={(event) => setShelteredAnimal({ ...shelteredAnimal, weight: Number(event.target.value) })}
                  />
                  <TextField
                     id="height"
                     label="Height (cm)"
                     variant="outlined"
                     fullWidth
                     sx={{ mb: 2 }}
                     value={shelteredAnimal.height}
                     onChange={(event) => setShelteredAnimal({ ...shelteredAnimal, height: Number(event.target.value) })}
                  />
                  <TextField
							id="isHealthy"
							label="Is Healthy?"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
                     value={shelteredAnimal.isHealthy}
							onChange={(event) => setShelteredAnimal({ ...shelteredAnimal, isHealthy: event.target.value })}
						/>

						<TextField
							id="description"
							label="Description"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
                     value={shelteredAnimal.description}
							onChange={(event) => setShelteredAnimal({ ...shelteredAnimal, description: event.target.value })}
						/>
                  <Button type="submit">Update</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};