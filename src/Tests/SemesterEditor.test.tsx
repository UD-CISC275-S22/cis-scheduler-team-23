import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Semester Editor Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Can save a semester after editing", () => {
        const editSemesterDetailsButton = screen.getAllByTestId(
            "editSemesterDetailsButton"
        );
        editSemesterDetailsButton[0].click();

        const semesterSeason = screen.getByText("Semester Season:");
        expect(semesterSeason).toBeInTheDocument();

        const saveSemesterButton = screen.getByTestId("saveSemesterButton");
        saveSemesterButton.click();
    });

    test("Can delete a semester when entering edit mode", () => {
        const editSemesterDetailsButton = screen.getAllByTestId(
            "editSemesterDetailsButton"
        );
        editSemesterDetailsButton[0].click();

        const semesterSeason = screen.getByText("Semester Season:");
        expect(semesterSeason).toBeInTheDocument();

        const saveSemesterButton = screen.getByTestId("deleteSemesterButton");
        saveSemesterButton.click();
    });
});
