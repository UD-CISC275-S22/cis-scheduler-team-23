import { Course } from "../Interfaces/courses";
import React from "react";
import { Semester } from "../Interfaces/semester";
import { Button } from "react-bootstrap";

export function ExportCsv({
    semesters
}: {
    semesters: Semester[];
}): JSX.Element {
    // Get course data
    const content = semesters.map((semester: Semester) => semester.courseArray);

    //Need to make a nested semester and plan!
    function arrayToCsv(data: Course[]) {
        const tempData = data.map(
            (row) => `${row.name},${row.code}, ${row.credits}`
        );
        console.log(tempData);
        return data
            .map(
                (row) => `${row.name},${row.code}, ${row.credits}`
                //row
                //   .map(String) // convert every value to String
                //   .map((v: string) => v.replaceAll("", """")) // escape double colons
                //   .map((v: string) => `"${v}"`) // quote it
                //   .join(",") // comma-separated
            )
            .join("\r\n"); // rows starting on new lines
    }
    function downloadBlob(content: Course[], filename: string) {
        // Create a blob
        const blob = new Blob([arrayToCsv(content.flat())]);
        const url = URL.createObjectURL(blob);

        // Create a link to download it
        const pom = document.createElement("a");
        pom.href = url;
        pom.setAttribute("download", filename);
        console.log(url);
        pom.click();
    }
    return (
        <div>
            <Button
                variant="info"
                onClick={() => downloadBlob(content.flat(), "CsvExport.CSV")}
            >
                Export Your Plan
            </Button>
        </div>
    );
}
