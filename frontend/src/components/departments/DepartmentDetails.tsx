import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { DepartmentDetail } from "../../models/DepartmentDetail";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const DepartmentDetails = () => {
	const { departmentId } = useParams();
	const [department, setDepartment] = useState<DepartmentDetail>();

	useEffect(() => {
      const fetchDepartment = async () => {
         try {
            const response = await axios.get(`${BACKEND_API_URL}/departments/${departmentId}`);
            const department = response.data;
            setDepartment(department);
         } catch (error) {
            console.log(error);
         }
      };
   fetchDepartment();
	}, [departmentId]);

		// const fetchDepartment = async () => {
		// 	const response = await fetch(`${BACKEND_API_URL}/departments/${departmentId}`);
		// 	const department = await response.json();
		// 	setDepartment(department);
		// };
		

	return (
		<Container sx={{height:"100vh"}}>
			<Card sx={{background:"#EEE5E9"}}>
				<CardContent >
					<IconButton component={Link} sx={{ mr: 3 }} to={`/departments/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Department Details</h1>
					<p>Department Name: {department?.departmentName}</p>
					<p>Speciality: {department?.speciality}</p>
					<p>Number of Animals: {department?.nrOfAnimals}</p>
               <p>Number of Personnel: {department?.nrOfPersonnel}</p>
               <p>Available places: {department?.availablePlaces}</p>
					<p>Care Takers in Department:</p>
					<ol>
						{department?.departmentCareTakers?.map((caretaker) => (
							<li key={caretaker.id}>CareTaker#{caretaker.id}: {caretaker.firstName} {caretaker.lastName} with {caretaker.yearsExperience} years experience</li>
						))}
					</ol>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/departments/${departmentId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/courses/${departmentId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};