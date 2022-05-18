import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Plan } from "../Interfaces/plans";

export function ChangePlan({
    show,
    handleClose,
    plan,
    plans,
    setPlan
}: {
    show: boolean;
    handleClose: () => void;
    plan: Plan;
    plans: Plan[];
    setPlan: (t: Plan) => void;
}): JSX.Element {
    const [currPlan, setCurrPlan] = useState(plan);
    function updatePlan(event: React.ChangeEvent<HTMLSelectElement>) {
        //Finds new plan, sets plan to it.
        const planIndex = plans.findIndex(
            (p: Plan): boolean => p.title === event.target.value
        );
        setCurrPlan(plans[planIndex]);
    }
    function saveChanges() {
        setPlan(currPlan);
        handleClose();
    }
    function cancelChanges() {
        setCurrPlan(plan);
        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title> Plans: </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="choices">
                    <Form.Label>
                        <b>Choose a plan:</b>
                    </Form.Label>
                    <Form.Select
                        value={currPlan.title}
                        onChange={updatePlan}
                        data-testid="choosePlanDropdown"
                    >
                        {plans.map((p: Plan) => (
                            <option key={p.id} value={p.title}>
                                {p.title}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={cancelChanges}
                        data-testid="changePlanCancelButton"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={saveChanges}
                        data-testid="changePlanConfirmButton"
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
}
