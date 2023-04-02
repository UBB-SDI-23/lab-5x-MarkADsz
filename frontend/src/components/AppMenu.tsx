import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ArticleIcon from '@mui/icons-material/Article';
import PetsIcon from '@mui/icons-material/Pets';
export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: "20px" }}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="pets"
						sx={{ mr: 2 }}>
						<PetsIcon />
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
						startIcon={<LocalLibraryIcon />}>
						Departments
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