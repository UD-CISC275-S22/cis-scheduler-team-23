import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
import "../App.css";
import { Plan } from "../Interfaces/plans";

export function AddPlan({
    show,
    handleClose,
    plans,
    setPlans
}: {
    show: boolean;
    handleClose: () => void;
    plans: Plan[];
    setPlans: (t: Plan[]) => void;
}) {
    const [planTitle, setPlanTitle] = useState<string>("");

    function saveChanges() {
        const newPlan: Plan = {
            title: planTitle,
            id: plans.length + 1,
            semesters: [] as Semester[],
            totalCreds: 0
        };
        plans.push(newPlan);
        setPlans(plans);
        setPlanTitle("");
        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title> Please enter a plan name: </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formCourseCode" as={Row}>
                    <Form.Label column sm={3}>
                        Plan Title:
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={planTitle}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setPlanTitle(event.target.value)}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    data-testid="addPlanCloseButton"
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={saveChanges}
                    data-testid="addPlanSaveChangesButton"
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
