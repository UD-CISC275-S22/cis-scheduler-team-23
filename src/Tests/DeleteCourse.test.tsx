import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Delete Course Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Test for ability to deleting courses from a semester", () => {
        const userCurrentPlan = screen.queryByText(
            "Team 23 Auto Generated Plan"
        );
        expect(userCurrentPlan).toBeInTheDocument();

        const isInSpr2022Sem = screen.getByRole("button", {
            name: /cisc 108/i
        });
        isInSpr2022Sem.click();

        const deleteCourseButton = screen.getByTestId("deleteCourseButton");
        deleteCourseButton.click();

        const deleteCourseModal = screen.getByText(
            "Are you sure you want to delete this course?"
        );
        expect(deleteCourseModal).toBeInTheDocument();

        const deleteButton = screen.getByTestId("deleteCourseDeleteButton");
        deleteButton.click();
    });
});
