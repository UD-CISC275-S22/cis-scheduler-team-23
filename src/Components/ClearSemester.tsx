import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
import "../App.css";
import { Plan } from "../Interfaces/plans";
import { Course } from "../Interfaces/courses";

export function ClearSemester({
    show,
    handleClose,
    currSemester,
    editSemester,
    plan,
    setPlan
}: {
    show: boolean;
    handleClose: () => void;
    currSemester: Semester;
    editSemester: (plan: Plan) => void;
    plan: Plan;
    setPlan: (t: Plan) => void;
}) {
    function saveChanges() {
        //new semester with no courses to be swapped in plan.
        const newSemester: Semester = {
            ...currSemester,
            courseArray: [] as Course[]
        };
        const newPlan: Plan = {
            ...plan,
            semesters: plan.semesters.map(
                (s: Semester): Semester =>
                    s.id === currSemester.id ? newSemester : s
            )
        };
        setPlan(newPlan);
        editSemester(newPlan);
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
