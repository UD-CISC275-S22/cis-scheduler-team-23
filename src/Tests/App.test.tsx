import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

// Our app.tsx is our ViewPlan component
describe("Plan view tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("The website displays correctly", () => {
        const plan_title = screen.queryByText(/Team 23 Auto Generated Plan/gi);
        expect(plan_title).toBeInTheDocument();
        const bannerImage = screen.getByTestId("header-image");
        expect(bannerImage).toBeInTheDocument();
    });

    test("Add New Plan button works", () => {
        const addPlanButton = screen.getByTestId("addNewPlanButton");
        addPlanButton.click();
    });

    test("Change Plan button works", () => {
        const addPlanButton = screen.getByTestId("changePlanButton");
        addPlanButton.click();
    });

    test("Display Course Pool button works", () => {
        const addPlanButton = screen.getByTestId("displayCoursePoolButton");
        addPlanButton.click();
    });

    test("Add Semester button works", () => {
        const addPlanButton = screen.getByTestId("addSemesterButton");
        addPlanButton.click();
    });

    test("Edit Plan button works", () => {
        const addPlanButton = screen.getByTestId("editPlanButton");
        addPlanButton.click();
    });

    test("Clear Plan button works", () => {
        const addPlanButton = screen.getByTestId("clearPlanButton");
        addPlanButton.click();
    });

    test("Change Plan button works", () => {
        const addPlanButton = screen.getByTestId("deletePlanButton");
        addPlanButton.click();
    });
});
