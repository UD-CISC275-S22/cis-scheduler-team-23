import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Change Plan Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Tests the ability to cancel changes when inside the change plan modal", () => {
        const changePlanButton = screen.getByTestId("changePlanButton");
        changePlanButton.click();

        const changePlanModal = screen.getByText("Plans:");
        expect(changePlanModal).toBeInTheDocument();

        const cancelButton = screen.getByTestId("changePlanCancelButton");
        cancelButton.click();
    });

    test("Tests the ability to confirm changes when inside the change plan modal", () => {
        const changePlanButton = screen.getByTestId("changePlanButton");
        changePlanButton.click();

        const changePlanModal = screen.getByText("Plans:");
        expect(changePlanModal).toBeInTheDocument();

        const confirmButton = screen.getByTestId("changePlanConfirmButton");
        confirmButton.click();
    });
});
