import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Plan } from "../Interfaces/plans";

export function AddPlan({
    show,
    handleClose,
    plans,
    addPlan
}: {
    show: boolean;
    handleClose: () => void;
    plans: Plan[];
    addPlan: (plans: Plan[]) => void;
}): JSX.Element {
    const [title, setTitle] = useState<string>("Plan X");
    const [inId, setInId] = useState<number>(plans.length);
    // const [alert, setAlert] = useState<string>("");

    /*
    export interface Plan {
        title: string;
        id: number;
        semesters: Semester[];
    }
    */

    function savePlan(): void {
        const newPlan: Plan[] = plans;
        /*
        if (plans.filter((plan) => plan.id === inId).length > 0) {
            setAlert("Plan with this ID already exists.");
        } else {
            newPlan.push({ title: title, id: inId, semesters: [] });
            newPlan.sort(comparePlans);
            addPlan(newPlan);
            // setAlert("");
            handleClose();
        }
        */
        newPlan.push({ title: title, id: inId, semesters: [] });
        newPlan.sort(comparePlans);
        addPlan(newPlan);
        // setAlert("");
        handleClose();
    }

    function comparePlans(a: Plan, b: Plan) {
        if (a.id < b.id) {
            return -1;
        } else if (a.id > b.id) {
            return 1;
        } else {
            return 0;
        }
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title> Add New Plan </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Title */}
                <Form.Group controlId="formPlanTitle" as={Row}>
                    <Form.Label column sm={3}>
                        Title:
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={title}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setTitle(event.target.value);
                                // setAlert("");
                            }}
                        />
                    </Col>
                </Form.Group>
                {/* ID */}
                <Form.Group controlId="formPlanID" as={Row}>
                    <Form.Label column sm={3}>
                        ID:
                    </Form.Label>
                    <Col>
                        <Form.Control
                            type="number"
                            value={inId}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setInId(parseInt(event.target.value));
                                // setAlert("");
                            }}
                        />
                    </Col>
                </Form.Group>
                {/*
                {alert && <Alert severity="error">{alert}</Alert>}
                */}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outlined"
                    className="m-2"
                    onClick={handleClose}
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    className="m-2"
                    onClick={savePlan}
                    color="primary"
                >
                    Add Plan
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
