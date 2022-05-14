import React from "react";
import { render, screen } from "@testing-library/react";
import { ExportCSV } from "../Components/ExportCSV";
import { Plan } from "../Interfaces/plans";
import { Semester } from "../Interfaces/semester";

const blankPlan: Plan = { title: "", id: 0, semesters: [] as Semester[] };

describe("ImportCsv Test", () => {
    beforeEach(() => {
        render(<ExportCSV semesters={blankPlan.semesters} plan={blankPlan} />);
    });

    test("There is an export button", () => {
        expect(
            screen.getByRole("button", {
                name: /Export CSV/i
            })
        ).toBeInTheDocument();
    });
    test("Clicking the button shows where you can upload file.", () => {
        const changeTypeButton = screen.getByRole("button", {
            name: /Export CSV/i
        });
        changeTypeButton.click();
        const typeTextMC = screen.getByText(
            /Click the button below to export your plan as a CSV file!/i
        );
        expect(typeTextMC).toBeInTheDocument();
    });
});
