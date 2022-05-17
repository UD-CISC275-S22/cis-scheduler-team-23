import React, { useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { Plan } from "../Interfaces/plans";

export function EditPlan({
    show,
    handleClose,
    plan,
    plans,
    setPlan,
    setPlans
}: {
    show: boolean;
    handleClose: () => void;
    plan: Plan;
    plans: Plan[];
    setPlan: (t: Plan) => void;
    setPlans: (t: Plan[]) => void;
}): JSX.Element {
    const [title, setTitle] = useState<string>(plan.title);
    function saveChanges() {
        plan.title = title;
        const planIndex = plans.findIndex(
            (p: Plan): boolean => p.id === plan.id
        );
        plans[planIndex] = plan;
        setPlan(plan);
        setPlans(plans);
        handleClose();
    }
    function cancelChanges() {
        setTitle(plan.title);
        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title> Enter a new plan name: </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formPlanTitle" as={Row}>
                    <Form.Label column sm={3}>
                        Plan title:
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={title}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setTitle(event.target.value)}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={cancelChanges}
                    data-testid="editPlanCancelButton"
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={saveChanges}
                    data-testid="editPlanSaveChangesButton"
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
