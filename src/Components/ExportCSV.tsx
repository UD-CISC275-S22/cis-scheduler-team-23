import React, { useState } from "react";
import { Course } from "../Interfaces/courses";
import { Semester } from "../Interfaces/semester";
import { Plan } from "../Interfaces/plans";
import { Button, Modal } from "react-bootstrap";

export function ExportCSV({
    semesters
}: {
    semesters: Semester[];
    plan: Plan;
}): JSX.Element {
    const content = semesters.map((semester: Semester) => semester.courseArray);
    const [showCSVModal, setShowCSVModal] = useState(false);
    const handleShowCSVModal = () => setShowCSVModal(true);
    const handleCloseCSVModal = () => setShowCSVModal(false);

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
            <Button variant="info" onClick={handleShowCSVModal}>
                Export CSV
            </Button>

            <Modal show={showCSVModal} onHide={handleCloseCSVModal}>
                <Modal.Header closeButton>
                    Click the button below to export your plan as a CSV file!
                </Modal.Header>
                <Modal.Body>
                    <Button
                        variant="info"
                        onClick={() =>
                            downloadBlob(content.flat(), "CsvExport.CSV")
                        }
                    >
                        Export Your Plan
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}
