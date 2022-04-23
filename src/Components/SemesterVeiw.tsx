import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../App.css";
import { Semester } from "../Interfaces/semester";

import { SemesterEditor } from "./SemesterEditor";

export function SemesterView({
    semester,
    editSemester,
    deleteSemester
}: {
    semester: Semester;
    editSemester: (id: string, newSemester: Semester) => void;
    deleteSemester: (id: string) => void;
}): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    // const [published, setPublished] = useState<boolean>(true);

    /*
    function flipShowUnPublished(): void {
        setPublished(!published);
    }
    */

    function flipVisibility(): void {
        setVisible(!visible);
    }

    function changeEditing() {
        setEdit(!edit);
    }

    return edit ? (
        <SemesterEditor
            changeEditing={changeEditing}
            semester={semester}
            editSemester={editSemester}
            deleteSemester={deleteSemester}
        ></SemesterEditor>
    ) : (
        <Container>
            <Row>
                <Col>
                    <h3 className="App-blacktext">
                        {" "}
                        Semester Title: {semester.title}{" "}
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6 className="App-blacktext">
                        {" "}
                        Semester ID: {semester.id}{" "}
                    </h6>
                </Col>
            </Row>
            <Row>
                <p className="App-blacktext">
                    {" "}
                    Semester Description: {semester.description}{" "}
                </p>
            </Row>
            <Row>
                <Button onClick={flipVisibility}> Show/Hide Semester </Button>
                <Button onClick={changeEditing} variant="danger">
                    {" "}
                    Edit Semester Details{" "}
                </Button>
            </Row>
        </Container>
    );
}
