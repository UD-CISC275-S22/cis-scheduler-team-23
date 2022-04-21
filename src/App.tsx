import React, { useState } from "react";
import { Col, Button } from "react-bootstrap";
import "./App.css";

import { DisplayCourses } from "./Components/DisplayCourses";
import { AddSemester } from "./Components/AddSemester";
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

    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);

    return (
        <div className="App">
            <header className="App-header">
                <p> University of Delaware Computer Science Scheduler </p>
                <p> Matt Holdorf, Ocean Shen, Tommy Oves </p>
            </header>
            <p>
                Hello and welcome to our website to help Computer Science majors
                at the University of Delaware make their schedules. This website
                will allow you to put together your desired schedule for the
                rest of your college career. Add the classes you wish to take to
                their desired semester, add/remove semesters, and even edit the
                class itself if necessary!
            </p>
            <Col>
                {/*
                <DisplayCourses></DisplayCourses>
                */}
            </Col>

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
