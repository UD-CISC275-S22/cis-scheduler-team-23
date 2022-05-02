import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { Course } from "../Interfaces/courses";

import "../App.css";
import { Semester } from "../Interfaces/semester";
import { DisplayCourses } from "./DisplayCourses";

import { SemesterEditor } from "./SemesterEditor";
import { AddCourse } from "./AddCourse";

export function SemesterView({
    semester,
    editSemester,
    deleteSemester
}: {
    semester: Semester;
    editSemester: (id: string, newSemester: Semester) => void;
    deleteSemester: (id: string) => void;
}): JSX.Element {
    // const [visible, setVisible] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);

    {
        /*
    function flipVisibility(): void {
        setVisible(!visible);
    }
*/
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
                    <h3>
                        <b> Semester Title: </b> {semester.title}
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6>
                        <b> Semester ID: </b> {semester.id}
                    </h6>
                </Col>
            </Row>
            <Row>
                <p>
                    <b> Semester Description: </b> {semester.description}
                </p>
            </Row>
            <Row>
                <p>
                    <u>
                        <b>Courses</b>
                    </u>
                </p>
                {semester.courseArray.map((c: Course) => (
                    <Col key={c.code} sm="4">
                        <DisplayCourses
                            course={c}
                            courseSemester={semester}
                        ></DisplayCourses>
                    </Col>
                ))}
            </Row>
            <p></p>
            <Row>
                {/* <Button onClick={flipVisibility}> Show/Hide Semester </Button> */}
                <Button onClick={changeEditing} variant="danger">
                    {" "}
                    Edit Semester Details{" "}
                </Button>

                <Button onClick={handleShowAddModal} variant="success">
                    Add Course
                </Button>
                <p></p>

                <AddCourse
                    show={showAddModal}
                    handleClose={handleCloseAddModal}
                    currSemester={semester}
                ></AddCourse>
            </Row>
        </Container>
    );
}
