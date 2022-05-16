import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Delete Plan Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    // TESTS CANNOT COMPILE YET DUE TO ERROR IN REQUIREMENTVIEW.TSX
    test("Tests for the cancel button within the delete plan modal", () => {
        const deletePlanButton = screen.getByTestId("deletePlanButton");
        deletePlanButton.click();

        const deletePlanModal = screen.getByText(
            "Are you sure you want to delete"
        );
        expect(deletePlanModal).toBeInTheDocument();

        const cancelButton = screen.getByTestId("deletePlanCancelButton");
        cancelButton.click();
    });

    test("Tests for the confirm button within the delete plan modal", () => {
        const deletePlanButton = screen.getByTestId("deletePlanButton");
        deletePlanButton.click();

        const deletePlanModal = screen.getByText("Delete Plan");
        expect(deletePlanModal).toBeInTheDocument();

        const confirmButton = screen.getByTestId("deletePlanConfirmButton");
        confirmButton.click();
    });
});
