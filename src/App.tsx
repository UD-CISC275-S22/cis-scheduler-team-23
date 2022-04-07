import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";

import "./App.css";
import { DisplayCourses } from "./display_courses/DisplayCourses";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload.
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
