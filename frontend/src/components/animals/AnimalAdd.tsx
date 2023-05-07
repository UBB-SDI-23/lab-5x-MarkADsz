import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { ShelteredAnimal } from "../../models/ShelteredAnimals";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const ShelteredAnimalAdd = () => {
	const navigate = useNavigate();

	const [shelteredAnimal, setShelteredAnimal] = useState<ShelteredAnimal>({
		commonName: "",
		givenName: "",
		weight: 0,
		height: 0,
		isHealthy: "",
		description: "",
	});

	const addShelteredAnimal = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/shelteredanimals/`, shelteredAnimal);
			navigate("/shelteredanimals");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container sx={{height:"100vh"}}>
			<Card  sx={{background:"#EEE5E9"}}>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/shelteredanimals`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addShelteredAnimal}>
						<TextField
							id="commonName"
							label="Common Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setShelteredAnimal({ ...shelteredAnimal, commonName: event.target.value })}
						/>
						<TextField
							id="givenName"
							label="Given Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setShelteredAnimal({ ...shelteredAnimal, givenName: event.target.value })}
						/>

						<TextField
							id="weight"
							label="Weight (in kg)"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setShelteredAnimal({ ...shelteredAnimal, weight: Number(event.target.value) })}
						/>

						<TextField
							id="height"
							label="Height (in cm)"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setShelteredAnimal({ ...shelteredAnimal, height: Number(event.target.value) })}
						/>

						<TextField
							id="isHealthy"
							label="Is Healthy?"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setShelteredAnimal({ ...shelteredAnimal, isHealthy: event.target.value })}
						/>

						<TextField
							id="description"
							label="Description"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setShelteredAnimal({ ...shelteredAnimal, description: event.target.value })}
						/>
						<Button type="submit">Add Sheltered Animal</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};