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
                    <Form.Label>Choose a course</Form.Label>
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
                        <div>Course Code: {course.code}</div>
                        <div>Course Name: {course.name}</div>
                        <div>Description: {course.descr}</div>
                        <div>Number of Credits: {course.credits}</div>
                        <div>Pre-Requisites: {course.preReq}</div>
                        <div>Restrictions: {course.restrict}</div>
                        <div>Breadth Requirements: {course.breadth}</div>
                        <div>Semesters offered: {course.typ}</div>
                    </div>
                </Form.Group>
            </Modal.Body>
        </Modal>
    );
}
