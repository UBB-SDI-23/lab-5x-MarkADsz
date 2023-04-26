import { CssBaseline, Container, Typography } from "@mui/material";
import React from "react";

export const AppHome = () => {
	return (
		<React.Fragment>
			<CssBaseline />

			<Container maxWidth="xl" sx={{height:"100vh"}}>
				<Typography variant="h1" component="h1" gutterBottom sx={{margin:"300px 0 0 0"}}>
					Shelter Management System
				</Typography>
			</Container>
		</React.Fragment>
	);
};