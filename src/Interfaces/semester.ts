import { Course } from "./courses";

export interface Semester {
    title: string;
    description: string;
    id: string;
    courseArray: Course[];
}
