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
    setPlan
}: {
    semester: Semester;
    changeEditing: () => void;
    editSemester: (plan: Plan) => void;
    deleteSemester: (id: string) => void;
    plan: Plan;
    plans: Plan[];
    setPlan: (t: Plan) => void;
    setPlans: (t: Plan[]) => void;
}): JSX.Element {
    const seasonsList = ["Fall", "Spring", "Summer", "Winter"];
    const semInfo = semester.title.split(" ", 2);
    const semSeason = semInfo[0];
    const [season, setSeason] = useState<string>(semSeason);
    const [year, setYear] = useState<string>(semInfo[1]);
    function changeSeason(event: ChangeEvent) {
        setSeason(event.target.value);
    }
    function changeYear(event: ChangeEvent) {
        setYear(event.target.value);
    }
    const [description, setDescription] = useState<string>(
        semester.description
    );
    function changeDescription(event: ChangeEvent) {
        setDescription(event.target.value);
    }

    function saveSemester() {
        let newPlan: Plan;
        if (season === "Summer") {
            const newID = season.slice(0, 3).toLowerCase() + year;
            const sameID = plan.semesters.findIndex(
                (s: Semester): boolean => newID === s.id
            );
            if (sameID === -1 || plan.semesters[sameID].id === semester.id) {
                const newSemester: Semester = {
                    title: season + " " + year,
                    description: description,
                    id: newID,
                    courseArray: semester.courseArray
                };
                newPlan = {
                    ...plan,
                    semesters: plan.semesters.map(
                        (s: Semester): Semester =>
                            s.id === semester.id ? newSemester : s
                    )
                };
                setPlan(newPlan);
                editSemester(newPlan);
            }
        } else {
            const newID = season[0].toLowerCase() + year;
            const sameID = plan.semesters.findIndex(
                (s: Semester): boolean => newID === s.id
            );
            if (sameID === -1 || plan.semesters[sameID].id === semester.id) {
                const newSemester: Semester = {
                    description: description,
                    id: newID,
                    title: season + " " + year,
                    courseArray: semester.courseArray
                };
                newPlan = {
                    ...plan,
                    semesters: plan.semesters.map(
                        (s: Semester): Semester =>
                            s.id === semester.id ? newSemester : s
                    )
                };
                setPlan(newPlan);
                editSemester(newPlan);
            }
        }
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
                                onChange={changeYear}
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
                                onChange={changeDescription}
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
