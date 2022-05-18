import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
import { Course } from "../Interfaces/courses";
import { Plan } from "../Interfaces/plans";

import "../App.css";
import { AddCourseHelp } from "./AddCourseHelp";

export function ChangeSemester({
    show,
    handleClose,
    course,
    courseSemester,
    activePlan,
    setPlan
}: {
    show: boolean;
    handleClose: () => void;
    course: Course;
    courseSemester: Semester;
    activePlan: Plan;
    setPlan: (t: Plan) => void;
}) {
    const [currSemester, setCurrSemester] = useState(courseSemester.title);
    function updateSemester(event: React.ChangeEvent<HTMLSelectElement>) {
        setCurrSemester(event.target.value);
    }
    function saveChanges() {
        if (currSemester != courseSemester.title) {
            if (currSemester === "Move To Course Pool") {
                //deletes course from semester and updates plan.
                const courseIndex = courseSemester.courseArray.findIndex(
                    (c: Course): boolean => c.code === course.code
                );
                const newSemester = { ...courseSemester };
                if (courseIndex > -1) {
                    newSemester.courseArray.splice(courseIndex, 1);
                }
                setPlan({
                    ...activePlan,
                    semesters: activePlan.semesters.map(
                        (semester: Semester): Semester =>
                            semester.id === newSemester.id
                                ? newSemester
                                : semester
                    )
                });
                setCurrSemester("");
            } else {
                //Finds new semester, deletes course from its index, adds it to new.
                const courseIndex = courseSemester.courseArray.findIndex(
                    (c: Course): boolean => c.code === course.code
                );
                const newSemester = { ...courseSemester };
                if (courseIndex > -1) {
                    newSemester.courseArray.splice(courseIndex, 1);
                }
                const semesterIndex = activePlan.semesters.findIndex(
                    (s: Semester): boolean => s.title === currSemester
                );
                if (semesterIndex > -1) {
                    AddCourseHelp(
                        course,
                        activePlan.semesters[semesterIndex],
                        activePlan,
                        setPlan
                    );
                    setCurrSemester(activePlan.semesters[semesterIndex].title);
                    setPlan({
                        ...activePlan,
                        semesters: activePlan.semesters.map(
                            (semester: Semester): Semester =>
                                semester.id === newSemester.id
                                    ? newSemester
                                    : semester
                        )
                    });
                }
            }
        }
        handleClose();
    }
    function cancelChanges() {
        setCurrSemester(courseSemester.title);
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title> Choose the course location. </Modal.Title>
            </Modal.Header>
            <Form.Group controlId="choices">
                <Form.Select value={currSemester} onChange={updateSemester}>
                    {activePlan.semesters.map((sem: Semester) => (
                        <option key={sem.title} value={sem.title}>
                            {sem.title}
                        </option>
                    ))}
                    <option
                        key={"Move To Course Pool"}
                        value={"Move To Course Pool"}
                    >
                        {"Move To Course Pool"}
                    </option>
                </Form.Select>
            </Form.Group>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancelChanges}>
                    Cancel
                </Button>
                <Button variant="success" onClick={saveChanges}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
