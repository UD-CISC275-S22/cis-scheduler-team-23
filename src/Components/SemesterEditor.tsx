import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "../App.css";
import { Plan } from "../Interfaces/plans";
import { Semester } from "../Interfaces/semester";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function SemesterEditor({
    semester,
    changeEditing,
    editSemester,
    deleteSemester,
    plan,
    plans,
    setPlan,
    setPlans
}: {
    semester: Semester;
    changeEditing: () => void;
    editSemester: (id: string, newSemester: Semester) => void;
    deleteSemester: (id: string) => void;
    plan: Plan;
    plans: Plan[];
    setPlan: (t: Plan) => void;
    setPlans: (t: Plan[]) => void;
}): JSX.Element {
    const seasonsList = ["Fall", "Spring", "Summer", "Winter"];
    const [season, setSeason] = useState<string>(seasonsList[0]);
    const [year, setYear] = useState<number>(2022);
    function changeSeason(event: ChangeEvent) {
        setSeason(event.target.value);
    }
    const [description, setDescription] = useState<string>(
        semester.description
    );

    function saveSemester() {
        if (season === "Summer") {
            const newID = season.slice(0, 3).toLowerCase() + year;
            const sameID = plan.semesters.findIndex(
                (s: Semester): boolean => newID === s.id
            );
            if (sameID === -1) {
                semester.title = season + " " + year;
                semester.id = season.slice(0, 3).toLowerCase() + year;
                semester.description = description;
            }
        } else {
            const newID = season[0].toLowerCase() + year;
            const sameID = plan.semesters.findIndex(
                (s: Semester): boolean => newID === s.id
            );
            if (sameID === -1) {
                semester.title = season + " " + year;
                semester.id = season[0].toLowerCase() + year;
                semester.description = description;
            }
        }
        editSemester(semester.id, semester);
        const semIndex = plan.semesters.findIndex(
            (s: Semester): boolean => semester.id === s.id
        );
        const planIndex = plans.findIndex(
            (p: Plan): boolean => p.id === plan.id
        );
        plans[planIndex].semesters[semIndex] = semester;
        plans[planIndex] = plan;
        setPlan(plan);
        setPlans(plans);
        changeEditing();
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/* Title */}
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

                    {/* Semester notes */}
                    <Form.Group controlId="formSemesterDescription" as={Row}>
                        <Form.Label className="App-blacktext" column sm={2}>
                            Semester Notes:
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

                    {/* Save Semester button */}
                    <Button
                        data-testid="saveSemesterButton"
                        onClick={saveSemester}
                        variant="success"
                        className="me-4" // makes buttons wider apart
                    >
                        Save Semester
                    </Button>

                    {"  "}

                    {/* Delete Semester button */}
                    <Button
                        data-testid="deleteSemesterButton"
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
