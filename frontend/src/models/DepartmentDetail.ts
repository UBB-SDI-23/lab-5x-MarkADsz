import { CareTaker } from "./CareTaker";

export interface DepartmentDetail{
   id: number;
   departmentName: string;
   speciality: string;
   nrOfAnimals: number;
   nrOfPersonnel: number;
   availablePlaces: number;
   departmentCareTakers: CareTaker[];
}
