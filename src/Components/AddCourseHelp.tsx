import { Semester } from "../Interfaces/semester";
import { Course } from "../Interfaces/courses";

import "../App.css";

export function AddCourseHelp(course: Course, currSemester: Semester) {
    currSemester.courseArray.push(course);
}
