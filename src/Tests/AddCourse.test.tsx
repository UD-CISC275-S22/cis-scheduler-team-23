import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Add Course Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Test for 'SAVE CHANGES' within Add Course Modal", () => {
        const addCourseButton = screen.getAllByTestId("addCourseButton");
        addCourseButton[0].click();

        const addNewCourseModal = screen.getByText("Add New Course");
        expect(addNewCourseModal).toBeInTheDocument();

        const saveChangesButton = screen.getByTestId(
            "addCourseSaveChangesButton"
        );
        saveChangesButton.click();
    });

    test("Test for 'CLOSE' within Add Course Modal", () => {
        const addCourseButton = screen.getAllByTestId("addCourseButton");
        addCourseButton[0].click();

        const addNewCourseModal = screen.getByText("Add New Course");
        expect(addNewCourseModal).toBeInTheDocument();

        const closeButton = screen.getByTestId("addCourseCloseButton");
        closeButton.click();
    });

    test("Can create and access new plan successfully", () => {
        const addCourseButton = screen.getAllByTestId("addCourseButton");
        addCourseButton[0].click();

        const addNewCourseModal = screen.getByText("Add New Course");
        expect(addNewCourseModal).toBeInTheDocument();

        const addCourseEnterBox = screen.getAllByRole("textbox");
        userEvent.clear(addCourseEnterBox[0]);
        userEvent.type(addCourseEnterBox[0], "EGGG 101");
    });
});

/*
test("Can create and access new plan successfully", () => {
    const addNewPlanButton = screen.getByTestId("addNewPlanButton");
    addNewPlanButton.click();

    const addPlanModal = screen.getByText("Please enter a plan name:");
    expect(addPlanModal).toBeInTheDocument();

    const addPlanEnterBox = screen.getAllByRole("textbox");
    userEvent.clear(addPlanEnterBox[0]);
    userEvent.type(addPlanEnterBox[0], "Matt, Ocean, and Tommy's Epic Plan");

    const saveChangesButton = screen.getByTestId("addPlanSaveChangesButton");
    saveChangesButton.click();
});
*/
