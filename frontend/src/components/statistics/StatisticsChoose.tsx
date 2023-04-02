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

export const StatisticsShow = () => {

	return (
            <Container>
               <h1>Statistics</h1>
               <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Statistic Name</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                     <TableRow>
                        <TableCell component="th" scope="row">1</TableCell>
                        <TableCell component="th" scope="row"> <Link to={`/statistics/department_ordered_caretakers`}>Departments ordered by number of caretakers </Link></TableCell>
                     </TableRow>
                  </TableBody>
                  </Table>
            </TableContainer>
         </Container>
	);
};