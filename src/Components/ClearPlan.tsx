import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Plan } from "../Interfaces/plans";
import { Semester } from "../Interfaces/semester";

export function ClearPlan({
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
    function saveChanges() {
        plan.semesters = [] as Semester[];
        const planIndex = plans.findIndex(
            (p: Plan): boolean => p.id === plan.id
        );
        plans[planIndex] = plan;
        setPlan(plan);
        setPlans(plans);
        handleClose();
    }
    function cancelChanges() {
        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Warning! You are about to clear this plan!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>
                    <b> Are you sure you want to clear {plan.title}? </b>
                </Form.Label>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={cancelChanges}
                        data-testid="clearPlanCancelButton"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={saveChanges}
                        data-testid="clearPlanConfirmButton"
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
}
