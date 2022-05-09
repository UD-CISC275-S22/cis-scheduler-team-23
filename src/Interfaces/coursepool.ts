import { Course } from "./courses";
import { Semester } from "./semester";

export interface CoursePool {
    courses: Record<string, Record<string, Course>>;
    semesters: Semester[];
}
