import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Course } from "../Interfaces/courses";
import { Semester } from "../Interfaces/semester";
import { CoursePool } from "../Interfaces/coursepool";
import { Plan } from "../Interfaces/plans";
import { AddCourseHelp } from "./AddCourseHelp";

export function DisplayCoursePool({
    show,
    handleClose,
    coursepool,
    plan,
    setPlan
}: {
    show: boolean;
    handleClose: () => void;
    coursepool: CoursePool;
    plan: Plan;
    setPlan: (t: Plan) => void;
}): JSX.Element {
    const [sem, setSem] = useState("");
    const userCourses: Course[][] = plan.semesters.map(
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

    const [courses] = useState<Record<string, Record<string, Course>>>(
        coursepool.courses
    );
    const updatedCourses = [] as Course[];
    Object.entries(courses).map(
        ([, group_record]: [string, Record<string, Course>]) =>
            Object.entries(group_record).map(
                ([, course_value]: [string, Course]) =>
                    !userCodes1d.includes(course_value.code) &&
                    updatedCourses.push(course_value as Course)
            )
    );
    const [course, setCourse] = useState(updatedCourses[0]);

    function updateCourse(event: React.ChangeEvent<HTMLSelectElement>) {
        const courseInfo = event.target.value.split(" ", 1);
        setCourse(coursepool.courses[courseInfo[0]][event.target.value]);
    }
    function updateSem(event: React.ChangeEvent<HTMLSelectElement>) {
        setSem(event.target.value);
    }
    function saveChanges() {
        if (sem === "") {
            setSem(plan.semesters[0].title);
            const courseInfo = course.code.split(" ", 1);
            const newCourse: Course =
                coursepool.courses[courseInfo[0]][course.code];
            AddCourseHelp(newCourse, plan.semesters[0], plan, setPlan);
            setPlan(plan);
        } else {
            const semIndex = plan.semesters.findIndex(
                (s: Semester): boolean => s.title === sem
            );
            const chosenSem = plan.semesters[semIndex];
            const courseInfo = course.code.split(" ", 1);
            const newCourse: Course =
                coursepool.courses[courseInfo[0]][course.code];
            AddCourseHelp(newCourse, chosenSem, plan, setPlan);
            setPlan(plan);
        }
        if (course.code === updatedCourses[0].code)
            setCourse(updatedCourses[1]);
        handleClose();
    }
    function cancelChanges() {
        setSem(plan.semesters[0].title);
        handleClose();
    }
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
                {plan.semesters.length != 0 && (
                    <Modal.Body>
                        <Form.Group controlId="choices">
                            <Form.Label>
                                <b>Add to a semester:</b>
                            </Form.Label>
                            <Form.Select value={sem} onChange={updateSem}>
                                {plan.semesters.map((s: Semester) => (
                                    <option key={s.title} value={s.title}>
                                        {s.title}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={cancelChanges}
                                data-testid="displayCoursePoolCloseButton"
                            >
                                Close
                            </Button>
                            <Button
                                variant="success"
                                onClick={saveChanges}
                                data-testid="displayCoursePoolAddButton"
                            >
                                Add
                            </Button>
                        </Modal.Footer>
                    </Modal.Body>
                )}
            </Modal.Body>
        </Modal>
    );
}
