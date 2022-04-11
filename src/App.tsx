import React from "react";
import { Col } from "react-bootstrap";

import "./App.css";
import { DisplayCourses } from "./display_courses/DisplayCourses";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                University of Delaware Computer Science Scheduler
            </header>
            <p>
                Hello and welcome to our website to help Computer Science majors
                at the University of Delaware make their schedules. This website
                will allow you to put together your desired schedule for the
                rest of your college career. Add the classes you wish to take to
                their desired semester, add/remove semesters, and even edit the
                class itself if necessary!
            </p>
            <p> Ocean Shen </p>
            <p> Thomas Oves </p>
            <Col>
                <DisplayCourses></DisplayCourses>
            </Col>
            <p> Matthew Holdorf </p>
        </div>
    );
}

export default App;
