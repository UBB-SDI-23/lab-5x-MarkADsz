import { CareTaker } from "./CareTaker";

export interface DepartmentStatistic{
   id?: number;
   departmentName: string;
   speciality: string;
   nrOfAnimals: number;
   nrOfPersonnel: number;
   availablePlaces: number;
   avg_caretakers: number;
   nr_caretakers: number;
   current_caretakers: CareTaker[];
   
}