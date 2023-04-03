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
	Button,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation} from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Department } from "../../models/Department";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
export const AllDepartments = () => {
	const [loading, setLoading] = useState(false);
	const [departments, setDepartments] = useState<Department[]>([]);
	const location = useLocation();
	const path = location.pathname;
	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/departments/`)
			.then((response) => response.json())
			.then((data) => {
				setDepartments(data);
				setLoading(false);
			});
	}, []);


	const orderByAvailablePlaces=()=>{
		const sorted = [...departments].sort((a, b) => a.availablePlaces - b.availablePlaces);
		setDepartments(sorted);
	}

	return (
		<Container>
			<h1>All Departments</h1>

			{loading && <CircularProgress />}
			{!loading && departments.length === 0 && <p>No departments found</p>}
			{!loading && (
				<Toolbar>
				<IconButton component={Link} sx={{ mr: 3 }} to={`/departments/add`}>
					<Tooltip title="Add a new Department" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
				
				<Button
						onClick={orderByAvailablePlaces}
						// component={Link}
						// color="inherit"
						// sx={{ mr: 5 }}
						// startIcon={<LocalLibraryIcon />}
						>Order By Abailable Places
					</Button>
				</Toolbar>
			)}
			{!loading && departments.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Department Name</TableCell>
								<TableCell align="right">Speciality</TableCell>
								<TableCell align="right">Number of Animals</TableCell>
								<TableCell align="right">Number of Personnel</TableCell>
                        <TableCell align="center">Available Places</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{departments.map((department, index) => (
								<TableRow key={department.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/departments/${department.id}/details`} title="View department details">
											{department.departmentName}
										</Link>
									</TableCell>
									<TableCell align="center">{department.speciality}</TableCell>
									<TableCell align="center">{department.nrOfAnimals}</TableCell>
									<TableCell align="center">{department.nrOfPersonnel}</TableCell>
									<TableCell align="center">{department.availablePlaces}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/departments/${department.id}/details`}>
											<Tooltip title="View department details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/departments/${department.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/departments/${department.id}/delete`}>
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