import { useState } from 'react'
import './App.css'
// import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import { AllDepartments } from './components/departments/DepartmentShowAll';
import { DepartmentDetails } from './components/departments/DepartmentDetails';
import {DepartmentAdd} from './components/departments/DepartmentAdd'
import { DepartmentDelete } from './components/departments/DepartmentDelete';
import { DepartmentEdit } from './components/departments/DepartmentEdit';
import { StatisticsShow } from './components/statistics/StatisticsChoose';
import { StatisticDepCareTakers } from './components/statistics/StatisticsDepartCareTakers';
import {AllCareTakers} from './components/caretakers/CareTakerShowAll';
import {CareTakerAdd} from './components/caretakers/CareTakerAdd';
import { CareTakerEdit } from './components/caretakers/CareTakerEdit';
import { AllShelteredAnimals } from './components/animals/AnimalsShowAll';
// import { CourseDetails } from "./components/courses/CourseDetails";
// import { CourseDelete } from "./components/courses/CourseDelete";
// import { CourseAdd } from "./components/courses/CourseAdd";

function App() {
  return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/departments/" element={<AllDepartments />} />
					<Route path="/departments/:departmentId/details" element={<DepartmentDetails />} />
					<Route path="/departments/:departmentId/edit" element={<DepartmentEdit />} />
					<Route path="/departments/:departmentId/delete" element={<DepartmentDelete />} />
					<Route path="/departments/add" element={<DepartmentAdd />} />

					<Route path="/caretakers/" element={<AllCareTakers />} />
					{/* <Route path="/caretakers/:caretakerId/details" element={<DepartmentDetails />} /> */}
					<Route path="/caretakers/:caretakerId/edit" element={<CareTakerEdit />} />
					{/* <Route path="/caretakers/:caretakerId/delete" element={<DepartmentDelete />} /> */}
					<Route path="/caretakers/add" element={<CareTakerAdd />} />

					<Route path="/shelteredanimals/" element={<AllShelteredAnimals />} />

					<Route path="/statistics" element={<StatisticsShow />} />
					<Route path="/statistics/department_ordered_caretakers" element={<StatisticDepCareTakers />}/>
				</Routes>
			</Router>
		</React.Fragment>
	);
}

export default App
