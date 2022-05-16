import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
import course_data_json from "../Data/course_data.json";
import { Course } from "../Interfaces/courses";

import "../App.css";
import { AddCourseHelp } from "./AddCourseHelp";
import { Plan } from "../Interfaces/plans";

export function AddCourse({
    show,
    handleClose,
    currSemester,
    plan,
    setPlan
}: {
    show: boolean;
    handleClose: () => void;
    currSemester: Semester;
    plan: Plan;
    setPlan: (t: Plan) => void;
}) {
    const [courseCode, setCourseCode] = useState<string>("");

    type CourseRecord = Record<string, Record<string, Course>>;
    const ALLCOURSES: CourseRecord = course_data_json;

    function saveChanges() {
        if (courseCode.search(" ") === -1) {
            const regex = /\d+/g;
            const matches = courseCode.match(regex);
            if (matches) {
                const firstNum = matches[0].charAt(0);
                const firstNumIndex = courseCode.indexOf(firstNum);
                const codeText = courseCode
                    .substring(0, 0 + firstNumIndex)
                    .toUpperCase();
                const numText = courseCode.substring(firstNumIndex);
                if (ALLCOURSES[codeText]) {
                    if (ALLCOURSES[codeText][codeText + " " + numText]) {
                        const addedCourse =
                            ALLCOURSES[codeText][codeText + " " + numText];
                        const cIndex = currSemester.courseArray.findIndex(
                            (c: Course): boolean => c.code === addedCourse.code
                        );
                        if (cIndex === -1)
                            AddCourseHelp(
                                addedCourse,
                                currSemester,
                                plan,
                                setPlan
                            );
                    }
                }
                setCourseCode("");
                handleClose();
            }
        } else {
            const courseInfo = courseCode.split(" ", 1);
            if (ALLCOURSES[courseInfo[0]]) {
                if (
                    ALLCOURSES[courseInfo[0].toUpperCase()][
                        courseCode.toUpperCase()
                    ]
                ) {
                    const addedCourse =
                        ALLCOURSES[courseInfo[0].toUpperCase()][
                            courseCode.toUpperCase()
                        ];
                    const cIndex = currSemester.courseArray.findIndex(
                        (c: Course): boolean => c.code === addedCourse.code
                    );
                    if (cIndex === -1)
                        AddCourseHelp(addedCourse, currSemester, plan, setPlan);
                }
            }
            setCourseCode("");
            handleClose();
        }
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
