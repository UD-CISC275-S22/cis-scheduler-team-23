import React from "react";
import { Col, Button, Modal } from "react-bootstrap";

import "./App.css";
import { DisplayCourses } from "./Components/DisplayCourses";

function App(): JSX.Element {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className="App">
            <header className="App-header">
                <p> University of Delaware Computer Science Scheduler </p>
                <p> Matt Holdorf, Ocean Shen, Tommy Oves </p>
            </header>
            <div>
                <Button color="black" onClick={handleOpen}>
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
            </div>
            <Col>
                <DisplayCourses></DisplayCourses>
            </Col>
        </div>
    );
}

export default App;
