import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Clear Semester Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Test for 'DELETE' button within Clear All Courses Modal", () => {
        const clearAllCoursesButton = screen.getAllByTestId(
            "clearAllCoursesButton"
        );
        clearAllCoursesButton[0].click();

        const removeAllCoursesModal = screen.getByText(
            "Are you sure you want to remove all courses from this semester?"
        );
        expect(removeAllCoursesModal).toBeInTheDocument();

        const deleteButton = screen.getByTestId("clearSemesterDeleteButton");
        deleteButton.click();
    });

    test("Test for 'CANCEL' button within Clear All Courses Modal", () => {
        const clearAllCoursesButton = screen.getAllByTestId(
            "clearAllCoursesButton"
        );
        clearAllCoursesButton[0].click();

        const removeAllCoursesModal = screen.getByText(
            "Are you sure you want to remove all courses from this semester?"
        );
        expect(removeAllCoursesModal).toBeInTheDocument();

        const cancelButton = screen.getByTestId("clearSemesterCancelButton");
        cancelButton.click();
    });
});
