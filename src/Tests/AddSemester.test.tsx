import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Add Semester Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Add New Semester Close button works", () => {
        const addNewSemesterButton = screen.getByTestId("addNewSemesterButton");
        addNewSemesterButton.click();

        const addNewSemesterModal = screen.getByText(
            "Please enter semester details:"
        );
        expect(addNewSemesterModal).toBeInTheDocument();

        const closeButton = screen.getByTestId("addSemesterCloseButton");
        closeButton.click();
    });

    test("Add New Semester Save Changes button works", () => {
        const addNewSemesterButton = screen.getByTestId("addNewSemesterButton");
        addNewSemesterButton.click();

        const addNewSemesterModal = screen.getByText(
            "Please enter semester details:"
        );
        expect(addNewSemesterModal).toBeInTheDocument();

        const saveChangesButton = screen.getByTestId(
            "addSemesterSaveChangesButton"
        );
        saveChangesButton.click();
    });

    test("Can create and access new semester successfully (Winter 2023)", () => {
        const addNewSemesterButton = screen.getByTestId("addNewSemesterButton");
        addNewSemesterButton.click();

        const addNewSemesterModal = screen.getByText(
            "Please enter semester details:"
        );
        expect(addNewSemesterModal).toBeInTheDocument();

        const semesterSeasonEnterBox = screen.getByTestId(
            "semesterSeasonEnterBox"
        );
        userEvent.selectOptions(semesterSeasonEnterBox, "Winter");

        const semesterYearEnterBox = screen.getByTestId("semesterYearEnterBox");
        userEvent.type(semesterYearEnterBox, "2023");

        const saveChangesButton = screen.getByTestId(
            "addSemesterSaveChangesButton"
        );
        saveChangesButton.click();

        const newSemesterCreated = screen.queryByText("Winter 20222023");
        expect(newSemesterCreated).toBeInTheDocument();
    });

    test("Can create and access new semester successfully (Fall 2023)", () => {
        const addNewSemesterButton = screen.getByTestId("addNewSemesterButton");
        addNewSemesterButton.click();

        const addNewSemesterModal = screen.getByText(
            "Please enter semester details:"
        );
        expect(addNewSemesterModal).toBeInTheDocument();

        const semesterSeasonEnterBox = screen.getByTestId(
            "semesterSeasonEnterBox"
        );
        userEvent.selectOptions(semesterSeasonEnterBox, "Fall");

        const semesterYearEnterBox = screen.getByTestId("semesterYearEnterBox");
        userEvent.type(semesterYearEnterBox, "2023");

        const saveChangesButton = screen.getByTestId(
            "addSemesterSaveChangesButton"
        );
        saveChangesButton.click();

        const newSemesterCreated = screen.queryByText("Fall 20222023");
        expect(newSemesterCreated).toBeInTheDocument();
    });

    test("Can create and access new semester successfully (Spring 2023)", () => {
        const addNewSemesterButton = screen.getByTestId("addNewSemesterButton");
        addNewSemesterButton.click();

        const addNewSemesterModal = screen.getByText(
            "Please enter semester details:"
        );
        expect(addNewSemesterModal).toBeInTheDocument();

        const semesterSeasonEnterBox = screen.getByTestId(
            "semesterSeasonEnterBox"
        );
        userEvent.selectOptions(semesterSeasonEnterBox, "Spring");

        const semesterYearEnterBox = screen.getByTestId("semesterYearEnterBox");
        userEvent.type(semesterYearEnterBox, "2023");

        const saveChangesButton = screen.getByTestId(
            "addSemesterSaveChangesButton"
        );
        saveChangesButton.click();

        const newSemesterCreated = screen.queryByText("Spring 20222023");
        expect(newSemesterCreated).toBeInTheDocument();
    });

    test("Can create and access new semester successfully (Summer 2023)", () => {
        const addNewSemesterButton = screen.getByTestId("addNewSemesterButton");
        addNewSemesterButton.click();

        const addNewSemesterModal = screen.getByText(
            "Please enter semester details:"
        );
        expect(addNewSemesterModal).toBeInTheDocument();

        const semesterSeasonEnterBox = screen.getByTestId(
            "semesterSeasonEnterBox"
        );
        userEvent.selectOptions(semesterSeasonEnterBox, "Summer");

        const semesterYearEnterBox = screen.getByTestId("semesterYearEnterBox");
        userEvent.type(semesterYearEnterBox, "2023");

        const saveChangesButton = screen.getByTestId(
            "addSemesterSaveChangesButton"
        );
        saveChangesButton.click();

        const newSemesterCreated = screen.queryByText("Summer 20222023");
        expect(newSemesterCreated).toBeInTheDocument();
    });
});
