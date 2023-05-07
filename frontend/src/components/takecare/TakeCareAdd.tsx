   import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
   import { Container } from "@mui/system";
   import { useCallback, useEffect, useState } from "react";
   import { Link, useNavigate } from "react-router-dom";
   import { BACKEND_API_URL } from "../../constants";
   import { CareTaker } from "../../models/CareTaker";
   import { TakeCare } from "../../models/TakeCare";
   import { ShelteredAnimal } from "../../models/ShelteredAnimals";
   import { debounce } from "lodash";
   import axios from "axios";
   import EditIcon from "@mui/icons-material/Edit";
   import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
   import ArrowBackIcon from "@mui/icons-material/ArrowBack";

   export const TakeCareAdd = () => {
   const navigate = useNavigate();

   const [takeCare, setTakeCare] = useState<TakeCare>({
      id: 1,
      animal_id: 0,
      caretaker_id: 0,
      caringMonths: 0,
      shift: "",
   });

   const [caretakers, setCaretakers] = useState<CareTaker[]>([]);
   const [animals, setAnimals] = useState([]);

   const addTakeCare = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      try {
         await axios.post(`${BACKEND_API_URL}/takecare/`, takeCare);
         navigate("/takecare");
      } catch (error) {
         console.log(error);
      }
   };

   //AUTOCOMPLETE
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);

   const [animalOptions, setAnimalOptions] = useState<ShelteredAnimal[]>([]);
   const [caretakerOptions, setCaretakerOptions] = useState<CareTaker[]>([]);

   const fetchAnimalSuggestions = async (query: string) => {
      try {
         const response = await axios.get(`${BACKEND_API_URL}/shelteredanimals/autocomplete?query=${query}`);
         const data = await response.data;
         setAnimalOptions(data);
      } catch (error) {
         console.log("Error fetching animal suggestions", error);
      }
   };

   const fetchCaretakerSuggestions = async (query: string) => {
      try {
         const response = await axios.get(`${BACKEND_API_URL}/caretakers/autocomplete?query=${query}`);
         const data = await response.data;
         setCaretakerOptions(data);
      } catch (error) {
         console.log("Error fetching caretaker suggestions", error);
      }
   };

   const debouncedFetchAnimalSuggestions = useCallback(debounce(fetchAnimalSuggestions, 300), []);
   const debouncedFetchCaretakerSuggestions = useCallback(debounce(fetchCaretakerSuggestions, 300), []);

   const handleAnimalInputChange = (event: any, value: any, reason: any) => {
      console.log("input", value, reason);
      if (reason === "input") {
         debouncedFetchAnimalSuggestions(value);
      }
   };

   const handleCaretakerInputChange = (event: any, value: any, reason: any) => {
      console.log("input", value, reason);
      if (reason === "input") {
         debouncedFetchCaretakerSuggestions(value);
      }
   };

   useEffect(() => {
      return () => {
         debouncedFetchAnimalSuggestions.cancel();
         debouncedFetchCaretakerSuggestions.cancel();
      };
   }, [debouncedFetchAnimalSuggestions, debouncedFetchCaretakerSuggestions]);
   return (
   <Container>
      <Card sx={{ background: "#EEE5E9" }}>
         <CardContent>
         <IconButton component={Link} sx={{ mr: 3 }} to={`/takecare`}>
            <ArrowBackIcon />
         </IconButton>{" "}
         <form onSubmit={addTakeCare}>
            <Autocomplete
               sx={{ mb: 2 }}
               id="animal"
               options={animalOptions}
               
               getOptionLabel={(option)=> `${option.commonName} - ${option.givenName} `}
               renderInput={(params)=> <TextField {...params} label="Animal" />}
               filterOptions={(x)=>x}
               onInputChange={handleAnimalInputChange}
               onChange={(event,value)=>
               {

                  // console.log("VALUE",value);
                  if (value)
                  {
                     // console.log(value);
                     setTakeCare({...takeCare, animal_id: value.id! })
                  }
               }}
            />
            <Autocomplete
               sx={{ mb: 2 }}
               id="caretaker"
               options={caretakerOptions}
               
               getOptionLabel={(option)=> `${option.firstName} - ${option.lastName}`}
               renderInput={(params)=> <TextField {...params} label="Caretaker" />}
               filterOptions={(x)=>x}
               onInputChange={handleCaretakerInputChange}
               onChange={(event,value)=>
               {

                  // console.log("VALUE",value);
                  if (value)
                  {
                     // console.log(value);
                     setTakeCare({...takeCare, caretaker_id: value.id! })
                  }
               }}
            />

            <TextField
               id="caringMonths"
               label="Caring Months"
               variant="outlined"
               fullWidth
               sx={{ mb: 2 }}
               onChange={(event) =>
               setTakeCare({
                  ...takeCare,
                  caringMonths: Number(event.target.value),
               })
               }
            />

            <TextField
               id="shift"
               label="Shift"
               variant="outlined"
               fullWidth
               sx={{ mb: 2 }}
               onChange={(event) =>
               setTakeCare({ ...takeCare, shift: event.target.value })
               }
            />

            <Button type="submit">Add TakeCare</Button>
         </form>
         </CardContent>
         <CardActions></CardActions>
      </Card>
   </Container>
   );}