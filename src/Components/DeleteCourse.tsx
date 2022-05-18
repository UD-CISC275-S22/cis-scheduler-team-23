import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
import { Course } from "../Interfaces/courses";

import "../App.css";
import { Plan } from "../Interfaces/plans";

export function DeleteCourse({
    show,
    handleClose,
    currCourse,
    currSemester,
    plan,
    setPlan
}: {
    show: boolean;
    handleClose: () => void;
    currCourse: Course;
    currSemester: Semester;
    plan: Plan;
    setPlan: (t: Plan) => void;
}) {
    function saveChanges() {
        const courseIndex = currSemester.courseArray.findIndex(
            (c: Course): boolean => c.code === currCourse.code
        );
        const newSemester = { ...currSemester };
        if (courseIndex > -1) {
            newSemester.courseArray.splice(courseIndex, 1);
        }
        setPlan({
            ...plan,
            semesters: plan.semesters.map(
                (semester: Semester): Semester =>
                    semester.id === newSemester.id ? newSemester : semester
            )
        });
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {" "}
                    Are you sure you want to delete this course?{" "}
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    data-testid="deleteCourseCancelButton"
                >
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={saveChanges}
                    data-testid="deleteCourseDeleteButton"
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
