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

export const DepartmentEdit = () => {
const navigate = useNavigate();
const { departmentId } = useParams();

const [department, setDepartment] = useState<Department>({
   departmentName: "",
   speciality: "",
   nrOfAnimals: 0,
   nrOfPersonnel: 0,
   availablePlaces: 0,
});

useEffect(() => {
   const fetchDepartment = async () => {
      try {
         // const response = await axios.get(`${BACKEND_API_URL}/departments/${departmentId}`);
         // setDepartment(response.data);
         const response = await fetch(`${BACKEND_API_URL}/departments/${departmentId}`);
         const department = await response.json();
         setDepartment(department);
         console.log(department);
      } catch (error) {
         console.log(error);
      }
   };
   fetchDepartment();
}, [departmentId]);

const updateDepartment = async (event: { preventDefault: () => void }) => {
   event.preventDefault();
   try {
   console.log(department);
   await axios.put(`${BACKEND_API_URL}/departments/${departmentId}`, department);
   navigate("/departments");
   } catch (error) {
   console.log(error);
   }
};

   return (
      <Container>
         <Card>
         <CardContent>
            <IconButton component={Link} sx={{ mr: 3 }} to={`/departments/${departmentId}`}>
               <ArrowBackIcon />
            </IconButton>{" "}
            <form onSubmit={updateDepartment}>
            <TextField
               id="departmentName"
               label="Department Name"
               variant="outlined"
               fullWidth
               sx={{ mb: 2 }}
               value={department.departmentName}
               onChange={(event) => setDepartment({ ...department, departmentName: event.target.value })}
            />
            <TextField
               id="speciality"
               label="Speciality"
               variant="outlined"
               fullWidth
               sx={{ mb: 2 }}
               value={department.speciality}
               onChange={(event) => setDepartment({ ...department, speciality: event.target.value })}
            />
            <TextField
               id="nrOfAnimals"
               label="Number of Animals"
               variant="outlined"
               fullWidth
               sx={{ mb: 2 }}
               value={department.nrOfAnimals}
               onChange={(event) => setDepartment({ ...department, nrOfAnimals: Number(event.target.value) })}
            />
            <TextField
               id="nrOfPersonnel"
               label="Number of Personnel"
               variant="outlined"
               fullWidth
               sx={{ mb: 2 }}
               value={department.nrOfPersonnel}
               onChange={(event) => setDepartment({ ...department, nrOfPersonnel: Number(event.target.value) })}
            />
            <TextField
               id="availablePlaces"
               label="Available Places"
               variant="outlined"
               fullWidth
               sx={{ mb: 2 }}
               value={department.availablePlaces}
               onChange={(event) => setDepartment({ ...department, availablePlaces: Number(event.target.value) })}
            />
            <Button type="submit">Update</Button>
            </form>
   </CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};