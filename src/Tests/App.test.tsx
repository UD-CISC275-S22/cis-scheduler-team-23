import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

// Our app.tsx is our ViewPlan component
describe("Plan view tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("The website is displaying", () => {
        const title = screen.queryByText(/Team 23 Auto Generated Plan/gi);
        expect(title).toBeInTheDocument();
    });
});
