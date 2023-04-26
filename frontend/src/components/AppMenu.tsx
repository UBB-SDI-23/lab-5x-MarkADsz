import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ArticleIcon from '@mui/icons-material/Article';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import PetsIcon from '@mui/icons-material/Pets';
import DomainIcon from '@mui/icons-material/Domain';
import PeopleIcon from '@mui/icons-material/People';
import { red } from "@mui/material/colors";
export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1, height:"100%" }}>
			<AppBar position="static" sx={{ marginBottom: "20px", width:"100%", backgroundColor:"#EEE5E9;", color:"#2b2d42", height:"100%"}}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="pets"
						sx={{ mr: 2 }}>
						<NightShelterIcon />
						{/* <PetsIcon /> */}
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Shelter Management
					</Typography>
					<Button
						variant={path.startsWith("/departments/") ? "outlined" : "text"}
						to="/departments/"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<DomainIcon />}>
						Departments
					</Button>
					<Button
						variant={path.startsWith("/caretakers/") ? "outlined" : "text"}
						to="/caretakers/"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<PeopleIcon />}>
						CareTakers
					</Button>
					<Button
						variant={path.startsWith("/shelteredanimals/") ? "outlined" : "text"}
						to="/shelteredanimals/"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<PetsIcon />}>
						Animals
					</Button>
					<Button
						variant={path.startsWith("/statistics") ? "outlined" : "text"}
						to="/statistics"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<ArticleIcon />}>
						Statistics
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};