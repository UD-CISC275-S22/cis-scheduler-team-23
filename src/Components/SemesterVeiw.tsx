import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";

export function SemesterView({
    semester
}: // editSemester,
// deleteSemester
{
    semester: Semester;
    editSemester: (id: string, newSemester: Semester) => void;
    deleteSemester: (id: string) => void;
}): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);
    // const [edit, setEdit] = useState<boolean>(false);
    // const [published, setPublished] = useState<boolean>(true);

    /*
    function flipShowUnPublished(): void {
        setPublished(!published);
    }
    */

    function flipVisibility(): void {
        setVisible(!visible);
    }
    /*
    function changeEditing() {
        setEdit(!edit);
    }
    */

    return (
        <Container>
            <Row>
                <Col>
                    <h3> {semester.id}</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6> Semester ID: {semester.id} </h6>
                </Col>
            </Row>
            <Row>
                <p> {semester.description} </p>
            </Row>
            <Row>
                <Button onClick={flipVisibility}> Show/Hide Semester </Button>
                {/* <Button onClick={changeEditing}>Edit</Button> */}
            </Row>
        </Container>
    );
}
