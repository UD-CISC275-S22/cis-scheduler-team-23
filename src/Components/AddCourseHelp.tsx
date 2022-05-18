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
    //sets Plan satate w/ new semester
    const newSem = { ...currSemester };
    newSem.courseArray.push(course);
    setPlan({
        ...plan,
        semesters: plan.semesters.map(
            (semester: Semester): Semester =>
                semester.id === newSem.id ? newSem : semester
        )
    });
}
