import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { Course } from "../Interfaces/courses";
import { Semester } from "../Interfaces/semester";
import { CoursePool } from "../Interfaces/coursepool";

export function DisplayCoursePool({
    show,
    handleClose,
    coursepool
}: {
    show: boolean;
    handleClose: () => void;
    coursepool: CoursePool;
}): JSX.Element {
    const [course, setCourse] = useState(
        coursepool.courses["CISC"]["CISC 167"]
    );
    const [courses] = useState<Record<string, Record<string, Course>>>(
        coursepool.courses
    );
    function updateCourse(event: React.ChangeEvent<HTMLSelectElement>) {
        const courseInfo = event.target.value.split(" ", 1);
        setCourse(coursepool.courses[courseInfo[0]][event.target.value]);
    }
    const userCourses: Course[][] = coursepool.semesters.map(
        (userSemesters: Semester) =>
            userSemesters.courseArray.map((userCourse: Course) => ({
                ...userCourse
            }))
    );
    const userCodes2d: string[][] = userCourses.map((cArray: Course[]) =>
        cArray.map((userC: Course) => userC.code)
    );
    const testArr = [] as string[];
    const userCodes1d = testArr.concat(...userCodes2d);
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title> Course Pool: </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="choices">
                    <Form.Label>
                        <b>Choose a course</b>
                    </Form.Label>
                    <Form.Select value={course.code} onChange={updateCourse}>
                        {Object.entries(courses).map(
                            ([, group_record]: [
                                string,
                                Record<string, Course>
                            ]) =>
                                Object.entries(group_record).map(
                                    ([, course_value]: [string, Course]) =>
                                        !userCodes1d.includes(
                                            course_value.code
                                        ) && (
                                            <option
                                                key={course_value.code}
                                                value={course_value.code}
                                            >
                                                {course_value.code}
                                            </option>
                                        )
                                )
                        )}
                    </Form.Select>
                    <div>
                        <div>
                            <b>Course Code:</b> {course.code}
                        </div>
                        <div>
                            <b>Course Name:</b> {course.name}
                        </div>
                        <div>
                            <b>Description:</b> {course.descr}
                        </div>
                        <div>
                            <b>Number of Credits:</b> {course.credits}
                        </div>
                        <div>
                            <b>Pre-Requisites:</b> {course.preReq}
                        </div>
                        <div>
                            <b>Restrictions:</b> {course.restrict}
                        </div>
                        <div>
                            <b>Breadth Requirements:</b> {course.breadth}
                        </div>
                        <div>
                            <b>Semesters offered:</b> {course.typ}
                        </div>
                    </div>
                </Form.Group>
            </Modal.Body>
        </Modal>
    );
}
/*
{Object.entries(courses).map(
                            ([, group_record]: [
                                string,
                                Record<string, Course>
                            ]) =>
                                Object.entries(group_record).map(
                                    ([, course_value]: [string, Course]) =>
                                        !userCodes1d.includes(
                                            course_value.code
                                        ) ? (
                                            <option
                                                key={course_value.code}
                                                value={course_value.code}
                                            >
                                                {course_value.code}
                                            </option>
                                        ) : (
                                            console.log("")
                                        )
                                )
                        )}
*/
