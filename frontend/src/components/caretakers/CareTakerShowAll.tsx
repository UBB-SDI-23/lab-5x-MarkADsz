import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
	Toolbar,
	Button
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation} from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { CareTaker } from "../../models/CareTaker";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
export const AllCareTakers = () => {
	const [loading, setLoading] = useState(false);
	const [caretakers, setCareTakers] = useState<CareTaker[]>([]);
	const location = useLocation();
	const path = location.pathname;
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(10000000 / 10);
	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/caretakers/?p=${currentPage}`)
			.then((response) => response.json())
			.then((data) => {
				setCareTakers(data.results);
				setLoading(false);
			});
	}, []);


	const handleNextPage = () => {
	if (currentPage < totalPages) {
		
		setCurrentPage(currentPage + 1);
		console.log(currentPage);
		setLoading(true);
		fetch(`${BACKEND_API_URL}/caretakers/?p=${currentPage+1}`)
		.then((response) => response.json())
		.then((data) => {
			setCareTakers(data.results);
			setLoading(false);
		});
		
	}
	};

	const handlePrevPage = () => {
	if (currentPage > 1) {
		
		setCurrentPage(currentPage - 1);
		console.log(currentPage);
		setLoading(true);
		fetch(`${BACKEND_API_URL}/caretakers/?p=${currentPage-1}`)
		.then((response) => response.json())
		.then((data) => {
			setCareTakers(data.results);
			setLoading(false);
		});
		
	}
	};


	return (
		<Container sx={{height:"100vh"}}>
			<h1>All Caretakers</h1>

			{loading && <CircularProgress />}
			{!loading && caretakers.length === 0 && <p>No Caretakers found</p>}
			{!loading && (
				<Toolbar>
					<IconButton onClick={handlePrevPage} style={{ marginRight:'370px'}} component={Link} sx={{ mr: 3 }} to={`/caretakers/?p=${currentPage}`} disabled={currentPage === 1}>
						<Tooltip title="Previous">
							<ArrowBackIosIcon sx={{ color: "white" }} />
						</Tooltip>
					</IconButton>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/caretakers/add`}>
						<Tooltip sx={{color:"#EEE5E9"}} title="Add a new Caretaker" arrow>
							<AddIcon color="primary" />
						</Tooltip>
					</IconButton>
					<IconButton style={{ marginLeft:'370px'}} onClick={handleNextPage} component={Link} sx={{ mr: 3 }}  to={`/caretakers/?p=${currentPage }`} disabled={currentPage === totalPages}>
						<Tooltip title="Next">
						<ArrowForwardIosIcon sx={{ color: "white" }} />
						</Tooltip>
					</IconButton>
					
				</Toolbar>
			)}
			{!loading && caretakers.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 ,background:"#EEE5E9" }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">First Name</TableCell>
								<TableCell align="right">Last Name</TableCell>
								<TableCell align="right">Department</TableCell>
								<TableCell align="right">Years of Experience</TableCell>
                        <TableCell align="center">Volunteer</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{caretakers.map((caretaker, index) => (
								<TableRow key={caretaker.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/caretakers/${caretaker.id}/details`} title="View Caretaker details">
											{caretaker.firstName}
										</Link>
									</TableCell>
									<TableCell align="center">{caretaker.lastName}</TableCell>
									<TableCell align="center">
										<Link to={`/departments/${caretaker.department_id}/details`} title="View Department ">
											{caretaker.department_id.toString()}
										</Link>
										</TableCell>
									<TableCell align="center">{caretaker.yearsExperience}</TableCell>
									<TableCell align="center">{caretaker.isVolunteer}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/caretakers/${caretaker.id}/details`}>
											<Tooltip title="View caretaker details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/caretakers/${caretaker.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/caretakers/${caretaker.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};