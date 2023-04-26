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
import { ShelteredAnimal } from "../../models/ShelteredAnimals";
export const AllShelteredAnimals = () => {
	const [loading, setLoading] = useState(false);
	const [animals, setAnimals] = useState<ShelteredAnimal[]>([]);
	const location = useLocation();
	const path = location.pathname;
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(10000000 / 10);
	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/shelteredanimals/?p=${currentPage}`)
			.then((response) => response.json())
			.then((data) => {
				setAnimals(data.results);
				setLoading(false);
			});
	}, []);


	const handleNextPage = () => {
	if (currentPage < totalPages) {
		
		setCurrentPage(currentPage + 1);
		console.log(currentPage);
		setLoading(true);
		fetch(`${BACKEND_API_URL}/shelteredanimals/?p=${currentPage+1}`)
		.then((response) => response.json())
		.then((data) => {
			setAnimals(data.results);
			setLoading(false);
		});
		
	}
	};

	const handlePrevPage = () => {
	if (currentPage > 1) {
		
		setCurrentPage(currentPage - 1);
		console.log(currentPage);
		setLoading(true);
		fetch(`${BACKEND_API_URL}/shelteredanimals/?p=${currentPage-1}`)
		.then((response) => response.json())
		.then((data) => {
			setAnimals(data.results);
			setLoading(false);
		});
		
	}
	};


	return (
		<Container sx={{height:"100vh"}}>
			<h1>All Sheltered Animals</h1>

			{loading && <CircularProgress />}
			{!loading && animals.length === 0 && <p>No Animals found</p>}
			{!loading && (
				<Toolbar>
					<IconButton onClick={handlePrevPage} style={{ marginRight:'370px'}} component={Link} sx={{ mr: 3 }} to={`/shelteredanimals/?p=${currentPage}`} disabled={currentPage === 1}>
						<Tooltip title="Previous">
							<ArrowBackIosIcon sx={{ color: "white" }} />
						</Tooltip>
					</IconButton>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/shelteredanimals/add`}>
						<Tooltip  sx={{color:"#EEE5E9"}} title="Add a new Animal" arrow>
							<AddIcon color="primary" />
						</Tooltip>
					</IconButton>
					<IconButton style={{ marginLeft:'370px'}} onClick={handleNextPage} component={Link} sx={{ mr: 3 }}  to={`/shelteredanimals/?p=${currentPage }`} disabled={currentPage === totalPages}>
						<Tooltip title="Next">
						<ArrowForwardIosIcon sx={{ color: "white" }} />
						</Tooltip>
					</IconButton>
					
				</Toolbar>
			)}
			{!loading && animals.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 ,background:"#EEE5E9" }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Given Name</TableCell>
								<TableCell align="right">Common Name</TableCell>
								<TableCell align="right">Weight(Kg)</TableCell>
								<TableCell align="right">Height(Cm)</TableCell>
                        <TableCell align="center">isHealthy</TableCell>
								<TableCell align="center">Description</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{animals.map((animal, index) => (
								<TableRow key={animal.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/shelteredanimals/${animal.id}/details`} title="View Animal Details">
											{animal.givenName}
										</Link>
									</TableCell>
									<TableCell align="center">{animal.commonName}</TableCell>
									<TableCell align="center">{animal.weight.toString() }</TableCell>
									<TableCell align="center">{animal.height.toString() }</TableCell>
									<TableCell align="center">{animal.isHealthy}</TableCell>
									<TableCell align="center">{animal.description}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/shelteredanimals/${animal.id}/details`}>
											<Tooltip title="View animal details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/shelteredanimals/${animal.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/shelteredanimals/${animal.id}/delete`}>
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