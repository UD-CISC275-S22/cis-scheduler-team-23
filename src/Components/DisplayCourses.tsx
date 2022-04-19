import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export function DisplayCourses(): JSX.Element {
    const [courseName, setName] = useState<string>("CISC 181");
    const [courseDesc, setCourse] = useState<string>(
        "Principles of computer science illustrated and applied through " +
            "programming in an object oriented language. Programming projects illustrate " +
            "computational problems, styles and issues that arise in computer systems " +
            "development and in all application areas of computation."
    );
    const [visible, setVisible] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }
    function updateCourseDesc(event: React.ChangeEvent<HTMLInputElement>) {
        setCourse(event.target.value);
    }
    function updateEditing(event: React.ChangeEvent<HTMLInputElement>) {
        setIsEditing(event.target.checked);
    }
    function flipVisibility(): void {
        setVisible(!visible);
    }
    return (
        <div>
            <div>
                <h3>Edit Course</h3>
                <Form.Check
                    type="switch"
                    id="is-edit-mode"
                    label="Editing?"
                    checked={isEditing}
                    onChange={updateEditing}
                />
                <Button onClick={flipVisibility}> {courseName} </Button>
                {visible && <div>{courseDesc}</div>}
                {isEditing && (
                    <div>
                        <Form.Group controlId="formCourseName">
                            <Form.Label>Course Name:</Form.Label>
                            <Form.Control
                                value={courseName}
                                onChange={updateName}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCourseDescription">
                            <Form.Label>Course Description:</Form.Label>
                            <Form.Control
                                value={courseDesc}
                                onChange={updateCourseDesc}
                            />
                        </Form.Group>
                    </div>
                )}
            </div>
        </div>
    );
}
