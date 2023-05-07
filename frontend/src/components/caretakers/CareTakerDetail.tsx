import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { CareTaker } from "../../models/CareTaker";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const CareTakerDetails = () => {
	const { caretakerId } = useParams();
	const [caretaker, setCaretaker] = useState<CareTaker>();

	useEffect(() => {
		const fetchCaretaker = async () => {
			try {
				const response = await axios.get(`${BACKEND_API_URL}/caretakers/${caretakerId}`);
				const caretaker = response.data;
				setCaretaker(caretaker);
			} catch (error) {
				console.log(error);
			}
		};
		fetchCaretaker();
	}, [caretakerId]);

	return (
		<Container sx={{height:"100vh"}}>
			<Card sx={{background:"#EEE5E9"}}>
				<CardContent >
					<IconButton component={Link} sx={{ mr: 3 }} to={`/caretakers/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>CareTaker Details</h1>
					<p>ID: {caretaker?.id}</p>
					<p>First Name: {caretaker?.firstName}</p>
					<p>Last Name: {caretaker?.lastName}</p>
					<p>Department ID: {caretaker?.department_id}</p>
					<p>Years of Experience: {caretaker?.yearsExperience}</p>
					<p>Is Volunteer?: {caretaker?.isVolunteer}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/caretakers/${caretakerId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/caretakers/${caretakerId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};