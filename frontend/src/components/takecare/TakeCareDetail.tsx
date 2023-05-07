import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { TakeCare } from "../../models/TakeCare";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const TakeCareDetail = () => {
	const { takeCareId } = useParams();
	const [takecare, setTakeCare] = useState<TakeCare>();

	useEffect(() => {
		const fetchCaretaker = async () => {
			try {
				const response = await axios.get(`${BACKEND_API_URL}/takecare/${takeCareId}`);
				const takecare = response.data;
				setTakeCare(takecare);
			} catch (error) {
				console.log(error);
			}
		};
		fetchCaretaker();
	}, [takeCareId]);

	return (
		<Container sx={{height:"100vh"}}>
			<Card sx={{background:"#EEE5E9"}}>
				<CardContent >
					<IconButton component={Link} sx={{ mr: 3 }} to={`/takecare/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>TakeCare Details</h1>
					<p>ID: {takecare?.id}</p>
					<p>CareTaker: {takecare?.caretaker_id.toString()}</p>
					<p>Animal: {takecare?.animal_id.toString()}</p>
					<p>Months: {takecare?.caringMonths}</p>
					<p>Shift type: {takecare?.shift}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/takecare/${takeCareId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/takecare/${takeCareId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};