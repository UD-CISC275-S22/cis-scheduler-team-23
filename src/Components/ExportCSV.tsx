import { Course } from "../Interfaces/courses";
import React from "react";
import { Semester } from "../Interfaces/semester";
import { Button } from "react-bootstrap";

export function ExportCSV({
    semesters
}: {
    semesters: Semester[];
}): JSX.Element {
    const content = semesters.map((semester: Semester) => semester.courseArray);

    function arrayToCsv(data: Course[]) {
        const tempData = data.map(
            (row) => `${row.name},${row.code}, ${row.credits}`
        );
        console.log(tempData);
        return data
            .map((row) => `${row.name},${row.code}, ${row.credits}`)
            .join("\r\n");
    }

    function downloadBlob(content: Course[], filename: string) {
        const blob = new Blob([arrayToCsv(content.flat())]);
        const url = URL.createObjectURL(blob);
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
