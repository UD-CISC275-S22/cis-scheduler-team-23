import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
import course_data_json from "../Data/course_data.json";
import { Course } from "../Interfaces/courses";

import "../App.css";

export function AddCourse({
    show,
    handleClose,
    currSemester
}: {
    show: boolean;
    handleClose: () => void;
    currSemester: Semester;
}) {
    const [courseCode, setCourseCode] = useState<string>("");

    type CourseRecord = Record<string, Record<string, Course>>;
    const ALLCOURSES: CourseRecord = course_data_json;

    function saveChanges() {
        const courseInfo = courseCode.split(" ", 1);
        const addedCourse = ALLCOURSES[courseInfo[0]][courseCode];
        currSemester.courseArray.push(addedCourse);
        setCourseCode("");
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title> Add New Course </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formCourseCode" as={Row}>
                    <Form.Label column sm={3}>
                        Course Code: (Ex: CISC 108)
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={courseCode}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setCourseCode(event.target.value)}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
