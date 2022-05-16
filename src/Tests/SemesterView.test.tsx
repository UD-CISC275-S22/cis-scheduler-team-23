import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Semester View Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Add Course button and subsequent actions work", () => {
        expect(screen.queryByText("Add New Course")).not.toBeInTheDocument();
        const addCourseButton = screen.getAllByTestId("addCourseButton");
        addCourseButton[0].click();
        expect(screen.getByText("Add New Course")).toBeInTheDocument();
    });

    test("Clear All Courses button and subsequent actions work", () => {
        expect(
            screen.queryByText(
                "Are you sure you want to remove all courses from this semester?"
            )
        ).not.toBeInTheDocument();

        const clearAllCoursesButton = screen.getAllByTestId(
            "clearAllCoursesButton"
        );
        clearAllCoursesButton[0].click();

        const removeAllCourses = screen.getByText(
            "Are you sure you want to remove all courses from this semester?"
        );
        expect(removeAllCourses).toBeInTheDocument();
    });

    test("Edit Semester Details button and subsequent actions work", () => {
        expect(screen.queryByText("Semester Season:")).not.toBeInTheDocument();

        const editSemesterDetailsButton = screen.getAllByTestId(
            "editSemesterDetailsButton"
        );
        editSemesterDetailsButton[0].click();

        const semesterSeason = screen.getByText("Semester Season:");
        expect(semesterSeason).toBeInTheDocument();
    });
});
