import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Add Course Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Test for the cancel button within the Add Plan Modal", () => {
        const editThisPlanButton = screen.getByTestId("editThisPlanButton");
        editThisPlanButton.click();

        const editPlanModal = screen.getByText("Enter a new plan name:");
        expect(editPlanModal).toBeInTheDocument();

        const cancelButton = screen.getByTestId("editPlanCancelButton");
        cancelButton.click();
    });

    test("Test for the save changes button within the Add Plan Modal", () => {
        const editThisPlanButton = screen.getByTestId("editThisPlanButton");
        editThisPlanButton.click();

        const editPlanModal = screen.getByText("Enter a new plan name:");
        expect(editPlanModal).toBeInTheDocument();

        const saveChangesButton = screen.getByTestId(
            "editPlanSaveChangesButton"
        );
        saveChangesButton.click();
    });
});
