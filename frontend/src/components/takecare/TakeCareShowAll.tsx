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
import { Paginator } from "../pagination/paginator";
export const AllTakeCare = () => {
	const [loading, setLoading] = useState(false);
	const [takecare, setTakeCare] = useState<TakeCare[]>([]);
	const location = useLocation();
	const path = location.pathname;
	const [totalPages, setTotalPages] = useState(0);
	// const [currentPage, setCurrentPage] = useState(1);
	
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalRows, setTotalRows] = useState(0);
	const crt = (page - 1) * pageSize + 1;

	const [isLastPage, setIsLastPage] = useState(false);

	const setCurrentPage = (newPage: number) => {
		setPage(newPage);
	}

	const goToNextPage = () => {
		if (isLastPage) {
			return;
		}

		setPage(page + 1);
	}

	const goToPrevPage = () => {
		if (page === 1) {
			return;
		}

		setPage(page - 1);
	}


		const fetchTakeCare = async () => {
		setLoading(true);
		const response = await fetch(
			`${BACKEND_API_URL}/takecare/?page=${page}&page_size=${pageSize}`
		);
		const { count, next, previous, results } = await response.json();
		setTakeCare(results);
		setTotalRows(count);
		setIsLastPage(!next);
		setLoading(false);
	};

	useEffect(() => {
		fetchTakeCare();
		console.log(page)
      }, [page]);

	return (
		<Container sx={{height:"100vh"}}>
			<h1>All Shifts</h1>

			{loading && <CircularProgress />}
			{!loading && takecare.length === 0 && <p>No shift found</p>}
			{!loading && (
				<Toolbar>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/takecare/add`}>
						<Tooltip sx={{color:"#EEE5E9"}} title="Add a new shift" arrow>
							<AddIcon color="primary" />
						</Tooltip>
					</IconButton>
				</Toolbar>
			)}
			{!loading && takecare.length > 0 && (
				<>
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
				<Paginator
					rowsPerPage={pageSize}
					totalRows={totalRows}
					currentPage={page}
					isFirstPage={page === 1}
					isLastPage={isLastPage}
					setPage={setCurrentPage}
					goToNextPage={goToNextPage}
					goToPrevPage={goToPrevPage}
						/>
			</>
			)}
		</Container>
	);
};