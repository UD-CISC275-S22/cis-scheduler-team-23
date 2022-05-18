import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Add Course Component Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Test for 'SAVE CHANGES' within Add Course Modal", () => {
        const addCourseButton = screen.getAllByTestId("addCourseButton");
        addCourseButton[0].click();

        const addNewCourseModal = screen.getByText("Add New Course");
        expect(addNewCourseModal).toBeInTheDocument();

        const saveChangesButton = screen.getByTestId(
            "addCourseSaveChangesButton"
        );
        saveChangesButton.click();
    });

    test("Test for 'CLOSE' within Add Course Modal", () => {
        const addCourseButton = screen.getAllByTestId("addCourseButton");
        addCourseButton[0].click();

        const addNewCourseModal = screen.getByText("Add New Course");
        expect(addNewCourseModal).toBeInTheDocument();

        const closeButton = screen.getByTestId("addCourseCloseButton");
        closeButton.click();
    });

    test("Test for making sure course DOES get added to semester", () => {
        const addCourseButton = screen.getAllByTestId("addCourseButton");
        addCourseButton[0].click();

        const addNewCourseModal = screen.getByText("Add New Course");
        expect(addNewCourseModal).toBeInTheDocument();

        const addCourseEnterBox = screen.getAllByRole("textbox");
        userEvent.clear(addCourseEnterBox[0]);
        userEvent.type(addCourseEnterBox[0], "MATH 241");

        const saveChangesButton = screen.getByTestId(
            "addCourseSaveChangesButton"
        );
        saveChangesButton.click();

        const isInSpr2022Sem = screen.getByRole("button", {
            name: /math 241/i
        });
        expect(isInSpr2022Sem).toBeInTheDocument();
    });

    test("Test for making sure course DOES NOT get added to semester", () => {
        const addCourseButton = screen.getAllByTestId("addCourseButton");
        addCourseButton[0].click();

        const addNewCourseModal = screen.getByText("Add New Course");
        expect(addNewCourseModal).toBeInTheDocument();

        const addCourseEnterBox = screen.getAllByRole("textbox");
        userEvent.clear(addCourseEnterBox[0]);
        userEvent.type(addCourseEnterBox[0], "AAAA 111");

        const saveChangesButton = screen.getByTestId(
            "addCourseSaveChangesButton"
        );
        saveChangesButton.click();

        const isInSpr2022Sem = screen.queryByRole("button", {
            name: /aaaa 111/i
        });
        expect(isInSpr2022Sem).not.toBeInTheDocument();
    });
});
