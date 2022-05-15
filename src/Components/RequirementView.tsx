import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
// import { Concentration } from "../Interfaces/requirements";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function RequirementView() {
    const concentrationsList = [
        "AI",
        "Bioinformatics",
        "Cybersecurity",
        "DataScience",
        "HighPerformanceComputing",
        "SystemsandNetworks",
        "TheoryandComputation"
    ];
    const [concentration, setConcentration] = useState(concentrationsList[0]);

    const changeConcentration = (event: ChangeEvent) => {
        setConcentration(event.target.value);
    };

    return (
        <div className="bg-white border m-2 p-2">
            <Container>
                <h4>
                    <b>
                        <u>Degree Requirements</u>
                    </b>
                </h4>
                <p></p>
                <Form.Group controlId="formSemesterTitle" as={Row}>
                    <Form.Label column sm={3}>
                        Choose your concentration:
                    </Form.Label>
                    <Col>
                        <Form.Select
                            value={concentration}
                            onChange={changeConcentration}
                        >
                            {concentrationsList.map((choice: string) => (
                                <option key={choice} value={choice}>
                                    {choice}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <p></p>
            </Container>
        </div>
    );
}
