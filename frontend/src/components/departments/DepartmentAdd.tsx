import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Department } from "../../models/Department";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const DepartmentAdd = () => {
	const navigate = useNavigate();

	const [department, setDepartment] = useState<Department>({
		id:1,
		departmentName: "",
		speciality: "", 
		nrOfAnimals: 0, 
		nrOfPersonnel: 0, 
		availablePlaces:0,
	});

	const addDepartment = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/departments/`, department);
			navigate("/departments");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container sx={{height:"100vh"}}>
			<Card  sx={{background:"#EEE5E9"}}>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/departments`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addDepartment}>
						<TextField
							id="departmentName"
							label="Departament Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDepartment({ ...department, departmentName: event.target.value })}
						/>
						<TextField
							id="speciality"
							label="Speciality"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDepartment({ ...department, speciality: event.target.value })}
						/>

						<TextField
							id="nrOfAnnimals"
							label="Number of Animals"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDepartment({ ...department, nrOfAnimals: Number(event.target.value) })}
						/>

						<TextField
							id="nrOfPersonnel"
							label="Number of Personnel"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDepartment({ ...department, nrOfPersonnel: Number(event.target.value) })}
						/>

						<TextField
							id="availablePlaces"
							label="Available Places"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDepartment({ ...department, availablePlaces: Number(event.target.value) })}
						/>
						<Button type="submit">Add Department</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};