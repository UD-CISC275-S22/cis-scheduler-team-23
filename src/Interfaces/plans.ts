import { Semester } from "./semester";

export interface Plan {
    title: string;
    id: number;
    semesters: Semester[];
    totalCreds: number;
}
