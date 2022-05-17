import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
import { Course } from "../Interfaces/courses";

import "../App.css";

export function ClearSemester({
    show,
    handleClose,
    currSemester
}: {
    show: boolean;
    handleClose: () => void;
    currSemester: Semester;
}) {
    function saveChanges() {
        currSemester.courseArray = [] as Course[];
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Are you sure you want to remove all courses from this
                    semester?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    data-testid="clearSemesterCancelButton"
                >
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={saveChanges}
                    data-testid="clearSemesterDeleteButton"
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
