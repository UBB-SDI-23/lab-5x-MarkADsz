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
   Toolbar
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link , useLocation} from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Department } from "../../models/Department";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { DepartmentDetail } from "../../models/DepartmentDetail";
import {DepartmentStatistic} from "../../models/DepartmentStatistic";
import { CareTakerStatistic } from "../../models/CareTakerStatistic";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export const StatisticCareTakersYears = () => {
	const [loading, setLoading] = useState(false);
	const [caretakers, setCaretakers] = useState<CareTakerStatistic[]>([]);
   const location = useLocation();
	const path = location.pathname;
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(10000000 / 10);
	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/caretakers_ordered_years_experience/?p=${currentPage}`)
			.then((response) => response.json())
			.then((data) => {
				setCaretakers(data.results);
				setLoading(false);
			});
	}, []);
	const handleNextPage = () => {
	if (currentPage < totalPages) {
		
		setCurrentPage(currentPage + 1);
		console.log(currentPage);
		setLoading(true);
		fetch(`${BACKEND_API_URL}/caretakers_ordered_years_experience/?p=${currentPage+1}`)
		.then((response) => response.json())
		.then((data) => {
			setCaretakers(data.results);
			setLoading(false);
		});
		
	}
	};

	const handlePrevPage = () => {
	if (currentPage > 1) {
		
		setCurrentPage(currentPage - 1);
		console.log(currentPage);
		setLoading(true);
		fetch(`${BACKEND_API_URL}/departments_ordered_by_caretakers/?p=${currentPage-1}`)
		.then((response) => response.json())
		.then((data) => {
			setCaretakers(data.results);
			setLoading(false);
		});
		
	}
	};
	return (
		<Container>
			<h1>Caretakers ordered by years of experience</h1>

			{loading && <CircularProgress />}
			{!loading && caretakers.length === 0 && <p>No caretakers found</p>}
			{!loading && caretakers.length > 0 && (
            <Toolbar>
					<IconButton onClick={handlePrevPage} style={{ marginRight:'370px'}} component={Link} sx={{ mr: 3 }} to={`/departments_ordered_by_caretakers/?p=${currentPage}`} disabled={currentPage === 1}>
						<Tooltip title="Previous">
							<ArrowBackIosIcon sx={{ color: "white" }} />
						</Tooltip>
					</IconButton>
					
					<IconButton style={{ marginLeft:'370px'}} onClick={handleNextPage} component={Link} sx={{ mr: 3 }}  to={`/departments_ordered_by_caretakers/?p=${currentPage }`} disabled={currentPage === totalPages}>
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
								<TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Years of experience</TableCell>
                        <TableCell align="center">Volunteer</TableCell>
                        <TableCell align="center">Average years of experience</TableCell>
								
							</TableRow>
						</TableHead>
						<TableBody>
							{caretakers.map((caretaker, index) => (
								<TableRow key={caretaker.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
											{caretaker.firstName}
									</TableCell>
									<TableCell align="center">{caretaker.lastName}</TableCell>
                           <TableCell align="center">{caretaker.yearsExperience}</TableCell>
                           <TableCell align="center">{caretaker.isVolunteer}</TableCell>
									<TableCell align="center">{caretaker.avg_years_experience}</TableCell>
									
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};