export type User = {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
}

// Define a type for the attributes of the model
export type OurReport = {
  id?: number;
  name: string;
  description: string;
}

export enum PollutionType {
  Plastic = 'Plastic',
  OilSpill = 'Oil Spill',
  Chemical = 'Chemical'
}

// Define a type for the attributes of the model
export type Reports = {
  id?: number;
  user: string;
  shortDescription: string;
  description: string;
  location: string;
  pollutionType: PollutionType;
  date: Date;
}