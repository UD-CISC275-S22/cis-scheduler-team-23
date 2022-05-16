import React, { useState } from "react";
import { Col, Container, Form } from "react-bootstrap";
// import { CoursePool } from "../Interfaces/coursepool";
import { Table } from "react-bootstrap";
import { Concentration } from "../Interfaces/requirements";
import { CoreReqs } from "../Interfaces/requirements";

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
    const [concReqs, setConcReqs] = useState(Concentration[0]);

    function changeConcReqs() {
        if (concentration === "AI") {
            setConcReqs(Concentration[0]);
        } else if (concentration === "Bioinformatics") {
            setConcReqs(Concentration[1]);
        } else if (concentration === "Cybersecurity") {
            setConcReqs(Concentration[2]);
        } else if (concentration === "DataScience") {
            setConcReqs(Concentration[3]);
        } else if (concentration === "HighPerformanceComputing") {
            setConcReqs(Concentration[4]);
        } else if (concentration === "SystemsandNetworks") {
            setConcReqs(Concentration[5]);
        } else {
            setConcReqs(Concentration[6]);
        }
    }

    const changeConcentration = (event: ChangeEvent) => {
        changeConcReqs();
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
                {/** Dropdown for choosing concentration */}
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
                </div>
                <p></p>
                {/** Table for Core Requirements */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <b>Class</b>
                            </th>
                            <th>
                                <b>Taken</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {CoreReqs.map((s) => (
                            <tr key="null">
                                <td>{s}</td>
                                <td>❌</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/*<p>{CoreReqs.map((s: string) => s.concat("\n"))}</p>*/}
                <p></p>
                <b>
                    <u>Concentration Requirements:</u>
                </b>
                <p></p>
                {/** Table for Concentration Requirements */}
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <b>Class</b>
                        </th>
                        <th>
                            <b>Taken</b>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {concReqs.map((s) => (
                        <tr key="null">
                            <td>{s}</td>
                            <td>❌</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
