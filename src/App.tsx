import React, { useState } from "react";
import { Col, Button, Modal } from "react-bootstrap";
import headerbackground from "./Pictures/headerbackground.jpeg";
import "./App.css";

// import { DisplayCourses } from "./Components/DisplayCourses";
import { AddSemester } from "./Components/AddSemester";
import { SemesterList } from "./Components/SemesterList";
import semester_json from "./Data/semester_data.json";
import { Semester } from "./Interfaces/semester";
import { Course } from "./Interfaces/courses";

const SEMESTER = semester_json.map(
    (semester): Semester => ({
        ...semester,
        courseArray: semester.courseArray.map(
            (course): Course => ({
                courseCode: course.code,
                courseName: course.name,
                courseDesc: course.descr,
                courseCredits: course.credits,
                coursePrereq: course.preReq,
                courseRestrict: course.restrict,
                courseBreadth: course.breadth,
                courseTyp: course.typ
            })
        )
    })
);

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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="App">
            <img src={headerbackground} width="100%" height="230" />
            <div>
                <p></p>
                <Button className="App-helpbutton" onClick={handleOpen}>
                    Click here for how to begin!
                </Button>
                <Modal show={open} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Welcome to our Website!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Hello and welcome to our website to help Computer
                        Science majors at the University of Delaware make
                        schedules. This website will allow you to put together
                        your desired schedule for the rest of your career. Add
                        the classes you wish to take to their their semester,
                        add/remove semesters, add one or more plans, and even
                        edit the class itself if necessary!
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
                <p></p>
            </div>
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
