import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Add Plan Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Test for the close button within the Add Plan Modal", () => {
        const addNewPlanButton = screen.getByTestId("addNewPlanButton");
        addNewPlanButton.click();

        const addPlanModal = screen.getByText("Please enter a plan name:");
        expect(addPlanModal).toBeInTheDocument();

        const closeButton = screen.getByTestId("addPlanCloseButton");
        closeButton.click();
    });

    test("Test for the save changes button within the Add Plan Modal", () => {
        const addNewPlanButton = screen.getByTestId("addNewPlanButton");
        addNewPlanButton.click();

        const addPlanModal = screen.getByText("Please enter a plan name:");
        expect(addPlanModal).toBeInTheDocument();

        const saveChangesButton = screen.getByTestId(
            "addPlanSaveChangesButton"
        );
        saveChangesButton.click();
    });

    test("Can create and access new plan successfully", () => {
        const addNewPlanButton = screen.getByTestId("addNewPlanButton");
        addNewPlanButton.click();

        const addPlanModal = screen.getByText("Please enter a plan name:");
        expect(addPlanModal).toBeInTheDocument();

        const addPlanEnterBox = screen.getAllByRole("textbox");
        userEvent.clear(addPlanEnterBox[0]);
        userEvent.type(
            addPlanEnterBox[0],
            "Matt, Ocean, and Tommy's Epic Plan"
        );

        const saveChangesButton = screen.getByTestId(
            "addPlanSaveChangesButton"
        );
        saveChangesButton.click();

        const newPlanCreated = screen.queryByText(
            "Matt, Ocean, and Tommy's Epic Plan"
        );
        expect(newPlanCreated).toBeInTheDocument();
    });
});
