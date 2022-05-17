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
    const newSem = { ...currSemester };
    newSem.courseArray.push(course);
    setPlan({
        ...plan,
        semesters: plan.semesters.map(
            (semester: Semester): Semester =>
                semester.id === newSem.id ? newSem : semester
        )
    });
    /*
    currSemester.courseArray.push(course);
    const semIndex = plan.semesters.findIndex(
        (s: Semester): boolean => currSemester.id === s.id
    );
    plan.semesters[semIndex] = currSemester;
    setPlan(plan);
    */
}
