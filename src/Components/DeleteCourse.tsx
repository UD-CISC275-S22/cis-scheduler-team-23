import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
import { Course } from "../Interfaces/courses";

import "../App.css";

export function DeleteCourse({
    show,
    handleClose,
    currCourse,
    currSemester
}: {
    show: boolean;
    handleClose: () => void;
    currCourse: Course;
    currSemester: Semester;
}) {
    function saveChanges() {
        console.log(currSemester.courseArray);
        const courseIndex = currSemester.courseArray.findIndex(
            (c: Course): boolean => c.code === currCourse.code
        );
        if (courseIndex > -1) {
            currSemester.courseArray.splice(courseIndex, 1);
        }
        console.log(currSemester.courseArray);
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
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={saveChanges}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
