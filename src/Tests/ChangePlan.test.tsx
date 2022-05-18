import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    test("Tests the ability to change between plans", () => {
        const changePlanButton = screen.getByTestId("changePlanButton");
        changePlanButton.click();

        const changePlanModal = screen.getByText("Plans:");
        expect(changePlanModal).toBeInTheDocument();

        const choosePlanSelectBox = screen.getByTestId("choosePlanDropdown");
        userEvent.selectOptions(
            choosePlanSelectBox,
            "Team 23 Auto Generated Plan Version 2"
        );

        const confirmButton = screen.getByTestId("changePlanConfirmButton");
        confirmButton.click();

        const newPlanCreated = screen.queryByText(
            "Team 23 Auto Generated Plan Version 2"
        );
        expect(newPlanCreated).toBeInTheDocument();
    });
});
