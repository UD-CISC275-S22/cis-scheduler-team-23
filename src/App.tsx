import React from "react";
import { Col } from "react-bootstrap";

import "./App.css";
import { DisplayCourses } from "./Components/courses/DisplayCourses";

function App(): JSX.Element {
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
                <DisplayCourses></DisplayCourses>
            </Col>
        </div>
    );
}

export default App;
