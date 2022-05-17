import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Display Course Pool Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Test for the close button within the Display Course Pool Modal", () => {
        const coursePoolButton = screen.getByTestId("coursePoolButton");
        coursePoolButton.click();

        const displayCoursePoolModal = screen.getByText("Course Pool:");
        expect(displayCoursePoolModal).toBeInTheDocument();

        const closeButton = screen.getByTestId("displayCoursePoolCloseButton");
        closeButton.click();
    });

    test("Test for the add button within the Display Course Pool Modal", () => {
        const coursePoolButton = screen.getByTestId("coursePoolButton");
        coursePoolButton.click();

        const displayCoursePoolModal = screen.getByText("Course Pool:");
        expect(displayCoursePoolModal).toBeInTheDocument();

        const addButton = screen.getByTestId("displayCoursePoolAddButton");
        addButton.click();
    });
});
