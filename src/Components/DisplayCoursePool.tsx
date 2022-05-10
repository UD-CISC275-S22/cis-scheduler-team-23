import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { Course } from "../Interfaces/courses";
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
        coursepool.courses["CISC"]["CISC 101"]
    );
    const [courses] = useState<Record<string, Record<string, Course>>>(
        coursepool.courses
    );

    function updateCourse(event: React.ChangeEvent<HTMLSelectElement>) {
        const courseInfo = event.target.value.split(" ", 1);
        setCourse(coursepool.courses[courseInfo[0]][event.target.value]);
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
                                    ([, course_value]: [string, Course]) => (
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
