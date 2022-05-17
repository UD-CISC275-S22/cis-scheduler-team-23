import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Plan } from "../Interfaces/plans";
import { Semester } from "../Interfaces/semester";

export function DeletePlan({
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
        if (planIndex > -1) {
            plans.splice(planIndex, 1);
        }
        if (plans.length === 0) {
            const emptyPlan: Plan = {
                title: "Blank Plan",
                id: 0,
                semesters: [] as Semester[],
                totalCreds: 0
            };
            plans.push(emptyPlan);
        }
        setPlan(plans[0]);
        setPlans(plans);
        handleClose();
    }
    function cancelChanges() {
        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>
                    <b> Are you sure you want to delete {plan.title}? </b>
                </Form.Label>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={cancelChanges}
                        data-testid="deletePlanCancelButton"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={saveChanges}
                        data-testid="deletePlanConfirmButton"
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
}
