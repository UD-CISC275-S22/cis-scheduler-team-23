// import React from "react";
import { screen } from "@testing-library/react";
// mport App from "../App";
// import userEvent from "@testing-library/user-event";

test("Delete Semester button works", () => {
    const deleteSemesterButton = screen.getByTestId("deleteSemesterButton");
    deleteSemesterButton.click();
    /*
    const semester1View = screen.queryByTestId("semesterView");
    expect(semester1View).not.toBeInTheDocument();
    */
});
