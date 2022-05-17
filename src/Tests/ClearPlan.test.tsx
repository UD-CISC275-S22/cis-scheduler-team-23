import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Clear Plan Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Test for the cancel button within the clear plan modal", () => {
        const clearPlanButton = screen.getByTestId("clearPlanButton");
        clearPlanButton.click();

        const clearPlanModal = screen.getByText(
            "Warning! You are about to clear this plan!"
        );
        expect(clearPlanModal).toBeInTheDocument();

        const cancelButton = screen.getByTestId("clearPlanCancelButton");
        cancelButton.click();
    });

    test("Test for the confirm button within the clear plan modal", () => {
        const clearPlanButton = screen.getByTestId("clearPlanButton");
        clearPlanButton.click();

        const clearPlanModal = screen.getByText(
            "Warning! You are about to clear this plan!"
        );
        expect(clearPlanModal).toBeInTheDocument();

        const confirmButton = screen.getByTestId("clearPlanConfirmButton");
        confirmButton.click();
    });
});
