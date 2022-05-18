import React, { useState } from "react";
import "../App.css";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { Course } from "../Interfaces/courses";
import { Semester } from "../Interfaces/semester";
import { Plan } from "../Interfaces/plans";
import course_data_json from "../Data/course_data.json";
import { AddCourseHelp } from "./AddCourseHelp";

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
        //checks for spaces.
        if (courseCode.search(" ") === -1) {
            const regex = /\d+/g;
            const matches = courseCode.match(regex);
            //seperates #'s and letters.
            if (matches) {
                const firstNum = matches[0].charAt(0);
                const firstNumIndex = courseCode.indexOf(firstNum);
                const codeText = courseCode
                    .substring(0, 0 + firstNumIndex)
                    .toUpperCase();
                const numText = courseCode.substring(firstNumIndex);
                //checks if course is valid then adds.
                if (ALLCOURSES[codeText.toUpperCase()]) {
                    if (
                        ALLCOURSES[codeText.toUpperCase()][
                            (codeText + " " + numText).toUpperCase()
                        ]
                    ) {
                        const addedCourse =
                            ALLCOURSES[codeText][codeText + " " + numText];
                        const courseIndex = currSemester.courseArray.findIndex(
                            (c: Course): boolean => c.code === addedCourse.code
                        );
                        const newSemester = { ...currSemester };
                        if (courseIndex > -1) {
                            newSemester.courseArray.splice(courseIndex, 1);
                        }
                        AddCourseHelp(addedCourse, currSemester, plan, setPlan);
                        setPlan({
                            ...plan,
                            semesters: plan.semesters.map(
                                (semester: Semester): Semester =>
                                    semester.id === newSemester.id
                                        ? newSemester
                                        : semester
                            )
                        });
                        plan.totalCreds += parseInt(addedCourse.credits);
                    }
                }
                setCourseCode("");
                handleClose();
            }
        } else {
            const courseInfo = courseCode.split(" ", 1);
            //checks if course info is valid then adds.
            if (ALLCOURSES[courseInfo[0].toUpperCase()]) {
                if (
                    ALLCOURSES[courseInfo[0].toUpperCase()][
                        courseCode.toUpperCase()
                    ]
                ) {
                    const addedCourse =
                        ALLCOURSES[courseInfo[0].toUpperCase()][
                            courseCode.toUpperCase()
                        ];
                    const courseIndex = currSemester.courseArray.findIndex(
                        (c: Course): boolean => c.code === addedCourse.code
                    );
                    const newSemester = { ...currSemester };
                    if (courseIndex > -1) {
                        newSemester.courseArray.splice(courseIndex, 1);
                    }
                    AddCourseHelp(addedCourse, currSemester, plan, setPlan);
                    setPlan({
                        ...plan,
                        semesters: plan.semesters.map(
                            (semester: Semester): Semester =>
                                semester.id === newSemester.id
                                    ? newSemester
                                    : semester
                        )
                    });
                    plan.totalCreds += parseInt(addedCourse.credits);
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
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    data-testid="addCourseCloseButton"
                >
                    Close
                </Button>
                <Button
                    variant="success"
                    onClick={saveChanges}
                    data-testid="addCourseSaveChangesButton"
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
