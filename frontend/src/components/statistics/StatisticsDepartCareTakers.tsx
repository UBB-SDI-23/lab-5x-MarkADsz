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
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Department } from "../../models/Department";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { DepartmentDetail } from "../../models/DepartmentDetail";
import {DepartmentStatistic} from "../../models/DepartmentStatistic";
export const StatisticDepCareTakers = () => {
	const [loading, setLoading] = useState(false);
	const [departments, setDepartments] = useState<DepartmentStatistic[]>([]);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/departments_ordered_by_caretakers/`)
			.then((response) => response.json())
			.then((data) => {
				setDepartments(data);
				setLoading(false);
			});
	}, []);

	return (
		<Container>
			<h1>Departments Ordered By CareTakers</h1>

			{loading && <CircularProgress />}
			{!loading && departments.length === 0 && <p>No departments found</p>}
			{!loading && departments.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Department Name</TableCell>
								<TableCell align="right">Speciality</TableCell>
                        <TableCell align="right">Care Takers</TableCell>
                        <TableCell align="center">Care Takers Information</TableCell>
								
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
                           <TableCell align="center">
                                 <ol>
                                       {department?.current_caretakers?.map((caretaker) => (
                                       <li key={caretaker.id}>CareTaker#{caretaker.id}: {caretaker.firstName} {caretaker.lastName} with {caretaker.yearsExperience} years experience</li>
                              ))}
					</ol></TableCell>
									
									
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};