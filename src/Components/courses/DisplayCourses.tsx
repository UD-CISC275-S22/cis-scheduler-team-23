import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

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
    const [courseCredits, setCredits] = useState<number>(3);

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
                <Form.Check
                    type="switch"
                    id="is-edit-mode"
                    label="Edit Course"
                    checked={isEditing}
                    onChange={updateEditing}
                />
                <Button onClick={flipVisibility}> {courseName} </Button>
                {visible && (
                    <div>
                        <h5>Course Description:</h5>
                        {courseDesc}
                        <h5>Course Credits:</h5>
                        {courseCredits}
                    </div>
                )}
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
                        <Form.Group controlId="formCourseCredits">
                            <Form.Label>Course Credits:</Form.Label>
                            <Form.Control
                                value={courseCredits}
                                type="number"
                                onChange={(event: ChangeEvent) =>
                                    setCredits(
                                        parseInt(event.target.value) || 0
                                    )
                                }
                            />
                        </Form.Group>
                    </div>
                )}
            </div>
        </div>
    );
}
