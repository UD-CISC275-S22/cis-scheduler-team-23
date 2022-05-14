import React from "react";
import { render, screen } from "@testing-library/react";
import { ExportCSV } from "../Components/ExportCSV";
// import userEvent from "@testing-library/user-event";

describe("Export CSV Test", () => {
    beforeEach(() => {
        render(<ExportCSV semesters={[]} />);
    });

    test("There is an Export Button", () => {
        expect(
            screen.getByRole("button", {
                name: /Export CSV/i
            })
        ).toBeInTheDocument();
    });
    test("Clicking the button shows exporting plan button", () => {
        const changeTypeButton = screen.getByRole("button", {
            name: /Export Your Plan/i
        });
        changeTypeButton.click();
        // Should be Multiple Choice
        const typeTextMC = screen.getByText(/Export Your Plan/i);
        expect(typeTextMC).toBeInTheDocument();
    });
});
