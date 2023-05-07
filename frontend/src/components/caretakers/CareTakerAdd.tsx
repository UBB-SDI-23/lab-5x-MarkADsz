import { Autocomplete,Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback,useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { CareTaker } from "../../models/CareTaker";
import { Department } from "../../models/Department";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {debounce} from  "lodash";
export const CareTakerAdd = () => {
	const navigate = useNavigate();

	const [caretaker, setCareTakers] = useState<CareTaker>({
		id:1,
		firstName: '',
		lastName: '',
		department_id: 1,
		yearsExperience: 1,
		isVolunteer: ''
	});

	const addCareTaker = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/caretakers/`, caretaker);
			navigate("/caretakers");
		} catch (error) {
			console.log(error);
		}
	};
	//AUTOCOMPLETE
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [departments, setDepartments] = useState<Department[]>([]);

	const fetchSuggestions= async(query: string) => {
		try {
			const response=await axios.get<Department[]>(
			
					`${BACKEND_API_URL}/departments/autocomplete?query=${query}`
			);
			const data= await response.data;
			setDepartments(data);
		} catch (error) {
			console.log("Error fetching suggestions",error);
			
		}

	};

	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions,300),[]);


	const handleInputChange=(event:any,value:any,reason:any)=>
	{
		console.log("input",value,reason);
		if (reason=="input")
		{
			
			debouncedFetchSuggestions(value);
		}
	}

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);

	return (
		<Container>
			<Card sx={{background:"#EEE5E9"}}>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/caretakers`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addCareTaker}>
						<TextField
							id="firstName"
							label="First Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCareTakers({ ...caretaker, firstName: event.target.value })}
						/>
						<TextField
							id="lastName"
							label="Last Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCareTakers({ ...caretaker, lastName: event.target.value })}
						/>

						<Autocomplete
									sx={{ mb: 2 }}
									id="department"
									options={departments}
									
									getOptionLabel={(option)=> `${option.departmentName} `}
									renderInput={(params)=> <TextField {...params} label="Department" />}
									filterOptions={(x)=>x}
									onInputChange={handleInputChange}
									onChange={(event,value)=>
									{

										// console.log("VALUE",value);
										if (value)
										{
											console.log(value);
											setCareTakers({...caretaker, department_id: value.id! })
										}
									}}
                        />


						<TextField
							id="yearsExperience"
							label="Years of Experience"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCareTakers({ ...caretaker, yearsExperience: Number(event.target.value) })}
						/>

						<TextField
							id="isVolunteer"
							label="Volunteer"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCareTakers({ ...caretaker, isVolunteer: event.target.value })}
						/>
						<Button type="submit">Add CareTaker</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};