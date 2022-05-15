import React, { useState } from "react";
import { Col, Container, Form } from "react-bootstrap";
//import { Table } from "react-bootstrap";
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
                <div className="App-allignleft">
                    <p></p>
                    <p>Choose your concentration:</p>
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
                    <p></p>

                    <p>Total Credits: 0 / 124</p>
                    <p></p>
                    <b>
                        <u>Core Requirements:</u>
                    </b>
                    <p></p>
                    <b>
                        <u>Concentration Requirements:</u>
                    </b>
                </div>
            </Container>
        </div>
    );
}
