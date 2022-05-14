import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
import { Course } from "../Interfaces/courses";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function AddSemester({
    show,
    handleClose,
    addSemester
}: {
    show: boolean;
    handleClose: () => void;
    addSemester: (newSemester: Semester) => void;
}): JSX.Element {
    const seasonsList = ["Fall", "Spring", "Summer", "Winter"];
    const [season, setSeason] = useState<string>(seasonsList[0]);
    const [year, setYear] = useState<number>(2022);

    function saveChanges() {
        if (season === "Summer") {
            addSemester({
                id: season.slice(0, 3).toLowerCase() + year,
                title: season + " " + year,
                description: "",
                courseArray: [] as Course[]
            });
        } else {
            addSemester({
                id: season[0].toLowerCase() + year,
                title: season + " " + year,
                description: "",
                courseArray: [] as Course[]
            });
        }
        handleClose();
    }

    const changeSeason = (event: ChangeEvent) => {
        setSeason(event.target.value);
    };

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title> Add New Semester </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formSemesterTitle" as={Row}>
                    <Form.Label column sm={3}>
                        Semester Season:
                    </Form.Label>
                    <Col>
                        <Form.Select value={season} onChange={changeSeason}>
                            {seasonsList.map((choice: string) => (
                                <option key={choice} value={choice}>
                                    {choice}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group controlId="formSemesterId" as={Row}>
                    <Form.Label column sm={3}>
                        Semester Year:
                    </Form.Label>
                    <Col>
                        <Form.Control
                            type="number"
                            value={year}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setYear(parseInt(event.target.value))}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
