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
	
} from "@mui/material";
import React from "react";
import { useEffect ,useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Department } from "../../models/Department";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { DepartmentDetail } from "../../models/DepartmentDetail";
import {DepartmentStatistic} from "../../models/DepartmentStatistic";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export const StatisticDepCareTakers = () => {
	const [loading, setLoading] = useState(false);
	const [departments, setDepartments] = useState<DepartmentStatistic[]>([]);
	const location = useLocation();
	const path = location.pathname;
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(10000000 / 10);
	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/departments_ordered_by_caretakers/?p=${currentPage}`)
			.then((response) => response.json())
			.then((data) => {
				setDepartments(data.results);
				setLoading(false);
			});
	}, []);
	const handleNextPage = () => {
	if (currentPage < totalPages) {
		
		setCurrentPage(currentPage + 1);
		console.log(currentPage);
		setLoading(true);
		fetch(`${BACKEND_API_URL}/departments/?p=${currentPage+1}`)
		.then((response) => response.json())
		.then((data) => {
			setDepartments(data.results);
			setLoading(false);
		});
		
	}
	};

	const handlePrevPage = () => {
	if (currentPage > 1) {
		
		setCurrentPage(currentPage - 1);
		console.log(currentPage);
		setLoading(true);
		fetch(`${BACKEND_API_URL}/departments/?p=${currentPage-1}`)
		.then((response) => response.json())
		.then((data) => {
			setDepartments(data.results);
			setLoading(false);
		});
		
	}
	};
	return (
		<Container>
			<h1>Departments Ordered By CareTakers</h1>

			{loading && <CircularProgress />}
			{!loading && departments.length === 0 && <p>No departments found</p>}
			{!loading && departments.length > 0 && (
				<Toolbar>
					<IconButton onClick={handlePrevPage} style={{ marginRight:'370px'}} component={Link} sx={{ mr: 3 }} to={`/departments/?p=${currentPage}`} disabled={currentPage === 1}>
						<Tooltip title="Previous">
							<ArrowBackIosIcon sx={{ color: "white" }} />
						</Tooltip>
					</IconButton>
					
					<IconButton style={{ marginLeft:'370px'}} onClick={handleNextPage} component={Link} sx={{ mr: 3 }}  to={`/departments/?p=${currentPage }`} disabled={currentPage === totalPages}>
						<Tooltip title="Next">
						<ArrowForwardIosIcon sx={{ color: "white" }} />
						</Tooltip>
					</IconButton>
					
					
				</Toolbar>
			)}
			{!loading && departments.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 ,background:"#EEE5E9" }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Department Name</TableCell>
								<TableCell align="center">Speciality</TableCell>
                        <TableCell align="center">Number of Care Takers</TableCell>
                        <TableCell align="center">Average number of Care Takers</TableCell>
                        {/* <TableCell align="center">Care Takers Information</TableCell> */}
								
							</TableRow>
						</TableHead>
						<TableBody>
							{departments.map((department, index) => (
								<TableRow key={department.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
											{department.departmentName}
									</TableCell>
									<TableCell align="center">{department.speciality}</TableCell>
                           <TableCell align="center">{department.nr_caretakers}</TableCell>
                           <TableCell align="center">{department.avg_caretakers}</TableCell>
                           {/* <TableCell align="center">
                                 <ol>
                                       {department?.current_caretakers?.map((caretaker) => (
                                       <li key={caretaker.id}>CareTaker#{caretaker.id}: {caretaker.firstName} {caretaker.lastName} with {caretaker.yearsExperience} years experience</li>
                              ))}
					</ol></TableCell> */}
									
									
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};