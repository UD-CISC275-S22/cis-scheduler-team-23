import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "../App.css";
import { Semester } from "../Interfaces/semester";

export function SemesterEditor({
    semester,
    changeEditing,
    editSemester,
    deleteSemester
}: {
    semester: Semester;
    changeEditing: () => void;
    editSemester: (id: string, newSemester: Semester) => void;
    deleteSemester: (id: string) => void;
}): JSX.Element {
    const [title, setTitle] = useState<string>(semester.title);
    const [description, setDescription] = useState<string>(
        semester.description
    );

    function saveSemester() {
        editSemester(semester.id, {
            ...semester,
            title: title,
            description: description
        });
        changeEditing();
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/* Title */}
                    <Form.Group controlId="formSemesterTitle" as={Row}>
                        <Form.Label className="App-blacktext" column sm={2}>
                            Semester Title:
                        </Form.Label>
                        <Col>
                            {" "}
                            <Form.Control
                                value={title}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setTitle(event.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    {/* Description */}
                    <Form.Group controlId="formSemesterDescription" as={Row}>
                        <Form.Label className="App-blacktext" column sm={2}>
                            Semester Description:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setDescription(event.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    {/* Save/Delete Buttons */}
                    <Button
                        onClick={saveSemester}
                        variant="success"
                        className="me-4"
                    >
                        Save Semester
                    </Button>
                    <Button
                        onClick={() => deleteSemester(semester.id)}
                        variant="danger"
                    >
                        Delete Semester
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
