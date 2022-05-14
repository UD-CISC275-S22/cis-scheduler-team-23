import React from "react";
import { render, screen } from "@testing-library/react";
import { WelcomeModal } from "../Components/WelcomeModal";

describe("WelcomeModal Test", () => {
    beforeEach(() => {
        render(<WelcomeModal />);
    });

    test("There is a click help button", () => {
        expect(
            screen.getByRole("button", {
                name: /Click here for how to begin!/i
            })
        ).toBeInTheDocument();
    });
    test("Clicking the button shows welcome message.", () => {
        const changeTypeButton = screen.getByRole("button", {
            name: /Click here for how to begin!/i
        });
        changeTypeButton.click();
        // Should be Multiple Choice
        const typeTextMC = screen.getByText(/Welcome to our Website!/i);
        expect(typeTextMC).toBeInTheDocument();
    });
});
