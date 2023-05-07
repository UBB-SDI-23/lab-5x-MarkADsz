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
import { TakeCare } from "../../models/TakeCare";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
const PAGE_SIZE = 10;
export const AllTakeCare = () => {
	const [loading, setLoading] = useState(false);
	const [takecare, setTakeCare] = useState<TakeCare[]>([]);
	const location = useLocation();
	const path = location.pathname;
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	
	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/takecare/?p=${currentPage}&page_size=${PAGE_SIZE}`)
			.then((response) => response.json())
			.then((data) => {
				setTakeCare(data.results);
				setTotalPages(Math.ceil(data.count / PAGE_SIZE));
				setLoading(false);
			});
	}, [currentPage]);


	const handleNextPage = () => {
	if (currentPage < totalPages) {
		
		setCurrentPage(currentPage + 1);
		// console.log(currentPage);
		// setLoading(true);
		// fetch(`${BACKEND_API_URL}/takecare/?p=${currentPage+1}`)
		// .then((response) => response.json())
		// .then((data) => {
		// 	setTakeCare(data.results);
		// 	setLoading(false);
		// });
		
	}
	};

	const handlePrevPage = () => {
	if (currentPage > 1) {
		
		setCurrentPage(currentPage - 1);
		// console.log(currentPage);
		// setLoading(true);
		// fetch(`${BACKEND_API_URL}/takecare/?p=${currentPage-1}`)
		// .then((response) => response.json())
		// .then((data) => {
		// 	setTakeCare(data.results);
		// 	setLoading(false);
		// });
		
	}
	};


	return (
		<Container sx={{height:"100vh"}}>
			<h1>All Shifts</h1>

			{loading && <CircularProgress />}
			{!loading && takecare.length === 0 && <p>No shift found</p>}
			{!loading && (
				<Toolbar>
					<IconButton onClick={handlePrevPage} style={{ marginRight:'370px'}} component={Link} sx={{ mr: 3 }} to={`/takecare/?p=${currentPage}`} disabled={currentPage === 1}>
						<Tooltip title="Previous">
							<ArrowBackIosIcon sx={{ color: "white" }} />
						</Tooltip>
					</IconButton>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/takecare/add`}>
						<Tooltip sx={{color:"#EEE5E9"}} title="Add a new shift" arrow>
							<AddIcon color="primary" />
						</Tooltip>
					</IconButton>
					<IconButton style={{ marginLeft:'370px'}} onClick={handleNextPage} component={Link} sx={{ mr: 3 }}  to={`/takecare/?p=${currentPage }`} disabled={currentPage === totalPages}>
						<Tooltip title="Next">
						<ArrowForwardIosIcon sx={{ color: "white" }} />
						</Tooltip>
					</IconButton>
					
				</Toolbar>
			)}
			{!loading && takecare.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 ,background:"#EEE5E9" }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Animal Id</TableCell>
								<TableCell align="right">Caretaker Id</TableCell>
								<TableCell align="right">Months</TableCell>
                        <TableCell align="center">Shift type</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{takecare.map((takec, index) => (
								<TableRow key={takec.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									{/* <TableCell component="th" scope="row">
										<Link to={`/caretakers/${takec.id}/details`} title="View Workshift details">
											{takec.id}
										</Link>
									</TableCell> */}
									<TableCell align="center">
                              <Link to={`/caretakers/${takec.caretaker_id}/details`} title="View caretaker ">
											{takec.caretaker_id.toString()}
										</Link>
                           </TableCell>
									<TableCell align="center">
                              <Link to={`/shelteredanimals/${takec.animal_id}/details`} title="View animal ">
											{takec.animal_id.toString()}
										</Link>
                           </TableCell>
									<TableCell align="center">{takec.caringMonths}</TableCell>
									<TableCell align="center">{takec.shift}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/takecare/${takec.id}/details`}>
											<Tooltip title="View shift details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/takecare/${takec.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/takecare/${takec.id}/delete`}>
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