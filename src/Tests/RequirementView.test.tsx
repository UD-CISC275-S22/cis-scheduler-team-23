import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Requirement View Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Test for the Course Pool Button WHEN a semester(s) exist", () => {
        const userCurrentPlan = screen.queryByText(
            "Team 23 Auto Generated Plan"
        );
        expect(userCurrentPlan).toBeInTheDocument();

        const chooseConcentrationButton = screen.getByTestId(
            "displayCoursePoolButton"
        );
        chooseConcentrationButton.click();

        const coursePoolModal = screen.getByText("Course Pool:");
        expect(coursePoolModal).toBeInTheDocument();

        const courseFromPool = screen.getByTestId("coursePoolCourseList");
        userEvent.selectOptions(courseFromPool, "ACCT 166");

        const courseAppearsInCoursePoolModal =
            screen.getByText("SPECIAL PROBLEM");
        expect(courseAppearsInCoursePoolModal).toBeInTheDocument();

        const semestersAvailableInModal = screen.getByTestId(
            "availableSemestersCPModal"
        );
        userEvent.selectOptions(semestersAvailableInModal, "Spring 2022");

        const addButton = screen.getByTestId("displayCoursePoolAddButton");
        addButton.click();

        const isInSpr2022Sem = screen.getByRole("button", {
            name: /acct 166/i
        });
        expect(isInSpr2022Sem).toBeInTheDocument();
    });

    test("Test for the Choose Your Concentration Button", () => {
        const chooseConcentrationButton = screen.getByTestId(
            "chooseConcentrationButton"
        );
        chooseConcentrationButton.click();
    });

    test("Test for AI concentration", () => {
        const chosenConcentrationDisplaysBefore = screen.getAllByText(
            "Aritificial Intelligence and Robotics"
        );
        const chooseConcentrationButton = screen.getByTestId(
            "chooseConcentrationButton"
        );
        chooseConcentrationButton.click();

        const chooseConcentrationFromList =
            screen.getByTestId("concentrationList");
        userEvent.selectOptions(
            chooseConcentrationFromList,
            "Aritificial Intelligence and Robotics"
        );

        const chosenConcentrationDisplaysAfter = screen.getAllByText(
            "Aritificial Intelligence and Robotics"
        );
        expect(
            chosenConcentrationDisplaysAfter.length >
                chosenConcentrationDisplaysBefore.length
        );
    });

    test("Test for BioInfo concentration", () => {
        const chosenConcentrationDisplaysBefore =
            screen.queryAllByText("Bioinformatics");
        expect(chosenConcentrationDisplaysBefore.length !== 2);

        const chooseConcentrationButton = screen.getByTestId(
            "chooseConcentrationButton"
        );
        chooseConcentrationButton.click();

        const chooseConcentrationFromList =
            screen.getByTestId("concentrationList");
        userEvent.selectOptions(chooseConcentrationFromList, "Bioinformatics");

        const chosenConcentrationDisplays =
            screen.getAllByText("Bioinformatics");
        expect(chosenConcentrationDisplays.length === 2);
    });
});
