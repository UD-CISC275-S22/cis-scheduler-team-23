import { Semester } from "../Interfaces/semester";
import { Course } from "../Interfaces/courses";

import "../App.css";
import { Plan } from "../Interfaces/plans";

export function AddCourseHelp(
    course: Course,
    currSemester: Semester,
    plan: Plan,
    setPlan: (t: Plan) => void
) {
    console.log(course);
    console.log(currSemester);
    console.log(currSemester.courseArray);
    currSemester.courseArray.push(course);
    const semIndex = plan.semesters.findIndex(
        (s: Semester): boolean => currSemester.id === s.id
    );
    plan.semesters[semIndex] = currSemester;
    setPlan(plan);
}
