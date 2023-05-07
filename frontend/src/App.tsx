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
import { DepartmentAdd } from './components/departments/DepartmentAdd'
import { DepartmentDelete } from './components/departments/DepartmentDelete';
import { DepartmentEdit } from './components/departments/DepartmentEdit';

import { AllShelteredAnimals } from './components/animals/AnimalsShowAll';
import { ShelteredAnimalAdd } from './components/animals/AnimalAdd';
import { ShelteredAnimalDelete } from './components/animals/AnimalDelete';
import { ShelteredAnimalDetail } from './components/animals/AnimalDetail';
import { ShelteredAnimalEdit } from './components/animals/AnimalEdit';

import { StatisticsShow } from './components/statistics/StatisticsChoose';
import { StatisticDepCareTakers } from './components/statistics/StatisticsDepartCareTakers';
import { StatisticCareTakersYears } from './components/statistics/StatisticsCareTakersYears';


import { CareTakerDetails } from './components/caretakers/CareTakerDetail';
import { CareTakerDelete } from './components/caretakers/CareTakerDelete';
import { AllCareTakers } from './components/caretakers/CareTakerShowAll';
import {CareTakerAdd} from './components/caretakers/CareTakerAdd';
import { CareTakerEdit } from './components/caretakers/CareTakerEdit';

import { AllTakeCare } from './components/takecare/TakeCareShowAll'; 
import { TakeCareDetail } from './components/takecare/TakeCareDetail';
import { TakeCareAdd } from './components/takecare/TakeCareAdd';
import { TakeCareEdit } from './components/takecare/TakeCareEdit';
import { TakeCareDelete } from './components/takecare/TakeCareDelete';
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
					<Route path="/caretakers/:caretakerId/details" element={<CareTakerDetails />} />
					<Route path="/caretakers/:caretakerId/edit" element={<CareTakerEdit />} />
					<Route path="/caretakers/:caretakerId/delete" element={<CareTakerDelete />} />
					<Route path="/caretakers/add" element={<CareTakerAdd />} />

					<Route path="/shelteredanimals/" element={<AllShelteredAnimals />} />
					<Route path="/shelteredanimals/:shelteredAnimalId/details" element={<ShelteredAnimalDetail />} />
					<Route path="/shelteredanimals/:shelteredAnimalId/edit" element={<ShelteredAnimalEdit />} />
					<Route path="/shelteredanimals/:shelteredAnimalId/delete" element={<ShelteredAnimalDelete />} />
					<Route path="/shelteredanimals/add" element={<ShelteredAnimalAdd />} />

					<Route path="/takecare/" element={<AllTakeCare />} />
					<Route path="/takecare/:takeCareId/details" element={<TakeCareDetail />} />
					<Route path="/takecare/:takeCareId/edit" element={<TakeCareEdit />} />
					<Route path="/takecare/:takeCareId/delete" element={<TakeCareDelete />} />
					<Route path="/takecare/add" element={<TakeCareAdd />} /> 

					<Route path="/statistics" element={<StatisticsShow />} />
					<Route path="/statistics/department_ordered_caretakers" element={<StatisticDepCareTakers />}/>
					<Route path="/statistics/caretakers_ordered_years_experience" element={<StatisticCareTakersYears />}/>
					
				</Routes>
			</Router>
		</React.Fragment>
	);
}

export default App
