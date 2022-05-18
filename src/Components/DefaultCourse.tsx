import course_data_json from "../Data/course_data.json";
import { Course } from "../Interfaces/courses";
import "../App.css";

export function DefaultCourse(currCourse: Course, origCode: string[]) {
    //origCode's first element is its first code->used to get orig course.
    type CourseRecord = Record<string, Record<string, Course>>;
    const ALLCOURSES: CourseRecord = course_data_json;

    const courseInfo = origCode[0].split(" ", 1);
    const default_c = ALLCOURSES[courseInfo[0]][origCode[0]];
    currCourse.code = default_c.code;
    currCourse.name = default_c.name;
    currCourse.descr = default_c.descr;
    currCourse.credits = default_c.credits;
    currCourse.preReq = default_c.preReq;
    currCourse.restrict = default_c.restrict;
    currCourse.breadth = default_c.breadth;
    currCourse.typ = default_c.typ;
}
