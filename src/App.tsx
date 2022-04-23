import React, { useState } from "react";
import { Col, Button } from "react-bootstrap";
import "./App.css";

// import { DisplayCourses } from "./Components/DisplayCourses";
import { AddSemester } from "./Components/AddSemester";
import { SemesterList } from "./Components/SemesterList";
import semester from "./Data/semester_data.json";
import { Semester } from "./Interfaces/semester";

const SEMESTER = semester.map((semester: Semester) => ({
    ...semester
}));

function App(): JSX.Element {
    const [sem, setSem] = useState<Semester[]>(SEMESTER);
    const [showAddModal, setShowAddModal] = useState(false);

    function addSemester(newSem: Semester) {
        const existing = sem.find(
            (semester: Semester): boolean => semester.id === newSem.id
        );
        if (existing === undefined) {
            setSem([...sem, newSem]);
        }
    }

    function editSemester(id: string, newSem: Semester) {
        setSem(
            sem.map(
                (semester: Semester): Semester =>
                    semester.id === id ? newSem : semester
            )
        );
    }

    function deleteSemester(id: string) {
        setSem(sem.filter((semester: Semester): boolean => semester.id !== id));
    }

    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);

    return (
        <div className="App">
            <header className="App-header">
                <p> University of Delaware Computer Science Scheduler </p>
                <p> Matt Holdorf, Ocean Shen, Tommy Oves </p>
            </header>
            <Col>
                {/*
                <DisplayCourses></DisplayCourses>
                */}
            </Col>

            <SemesterList
                semester={sem}
                editSemester={editSemester}
                deleteSemester={deleteSemester}
            ></SemesterList>

            {/* Add Semester Button */}
            <Button
                variant="success"
                className="m-4"
                onClick={handleShowAddModal}
            >
                Add New Semester
            </Button>

            {/* Add Semester */}
            <AddSemester
                show={showAddModal}
                handleClose={handleCloseAddModal}
                addSemester={addSemester}
            ></AddSemester>
        </div>
    );
}

export default App;
