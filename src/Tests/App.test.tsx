import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

// Our app.tsx is our ViewPlan component
describe("Plan view tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("The website displays correctly", () => {
        const planTitle = screen.queryByText(/Team 23 Auto Generated Plan/gi);
        expect(planTitle).toBeInTheDocument();

        const websiteBanner = screen.getByTestId("header-image");
        expect(websiteBanner).toBeInTheDocument();
    });

    test("Add New Plan button works", () => {
        const addNewPlanButton = screen.getByTestId("addNewPlanButton");
        addNewPlanButton.click();
    });

    test("Change Plan button works", () => {
        const changePlanButton = screen.getByTestId("changePlanButton");
        changePlanButton.click();
    });

    // Export CSV component

    // Semester list

    test("Add New Semester button works", () => {
        const addNewSemesterButton = screen.getByTestId("addNewSemesterButton");
        addNewSemesterButton.click();
    });

    test("Edit This Plan button works", () => {
        const editThisPlanButton = screen.getByTestId("editThisPlanButton");
        editThisPlanButton.click();
    });

    test("Clear This Plan button works", () => {
        const clearThisPlanButton = screen.getByTestId("clearThisPlanButton");
        clearThisPlanButton.click();
    });

    test("Delete This Plan button works", () => {
        const deleteThisPlanButton = screen.getByTestId("deleteThisPlanButton");
        deleteThisPlanButton.click();
    });
});
