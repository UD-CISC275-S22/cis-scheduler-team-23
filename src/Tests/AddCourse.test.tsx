import React from "react";
import { render, screen } from "@testing-library/react";
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
});
