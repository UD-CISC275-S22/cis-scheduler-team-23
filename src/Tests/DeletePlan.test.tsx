import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Delete Plan Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Tests for the cancel button within the delete plan modal", () => {
        const deleteThisPlanButton = screen.getByTestId("deleteThisPlanButton");
        deleteThisPlanButton.click();

        const deletePlanModal = screen.getByText(
            "Warning! You are about to delete this plan!"
        );
        expect(deletePlanModal).toBeInTheDocument();

        const cancelButton = screen.getByTestId("deletePlanCancelButton");
        cancelButton.click();
    });

    test("Tests for the confirm button within the delete plan modal", () => {
        const deleteThisPlanButton = screen.getByTestId("deleteThisPlanButton");
        deleteThisPlanButton.click();

        const deletePlanModal = screen.getByText(
            "Warning! You are about to delete this plan!"
        );
        expect(deletePlanModal).toBeInTheDocument();

        const confirmButton = screen.getByTestId("deletePlanConfirmButton");
        confirmButton.click();
    });

    test("Test to make sure upon delete, the plan is gone from the website", () => {
        const userCurrentPlan = screen.queryByText(
            "Team 23 Auto Generated Plan"
        );
        expect(userCurrentPlan).toBeInTheDocument();

        const deleteThisPlanButton = screen.getByTestId("deleteThisPlanButton");
        deleteThisPlanButton.click();

        const deletePlanModal = screen.getByText(
            "Warning! You are about to delete this plan!"
        );
        expect(deletePlanModal).toBeInTheDocument();

        const confirmButton = screen.getByTestId("deletePlanConfirmButton");
        confirmButton.click();

        const currentPlanDeleted = screen.queryByText(
            "Team 23 Auto Generated Plan Version 2"
        );
        expect(currentPlanDeleted).toBeInTheDocument();
    });
});
