import React from "react";
import { render, screen } from "@testing-library/react";
import { WelcomeModal } from "../Components/WelcomeModal";

describe("Welcome Modal Tests", () => {
    beforeEach(() => {
        render(<WelcomeModal />);
    });

    test("Click for how to begin button works", () => {
        expect(
            screen.getByRole("button", {
                name: /Click here instructions!/i
            })
        ).toBeInTheDocument();
    });

    test("Clicking the 'click here to begin button' shows a welcome message", () => {
        const changeTypeButton = screen.getByRole("button", {
            name: /Click here instructions!/i
        });
        changeTypeButton.click();
        const beginHereText = screen.getByText(/Welcome to our Website!/i);
        expect(beginHereText).toBeInTheDocument();
    });
});
