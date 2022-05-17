import React, { useState } from "react";
import { Button, Col, Container, Form, Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Concentration } from "../Interfaces/requirements";
import { CoreReqs } from "../Interfaces/requirements";
import { statReqs } from "../Interfaces/requirements";
import { writingReqs } from "../Interfaces/requirements";
import { capstoneReqs } from "../Interfaces/requirements";
import { labScienceReqs } from "../Interfaces/requirements";
import { Plan } from "../Interfaces/plans";
import { Course } from "../Interfaces/courses";
import { Semester } from "../Interfaces/semester";
import { DisplayCoursePool } from "./DisplayCoursePool";
import { CoursePool } from "../Interfaces/coursepool";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;
export function RequirementView({
    plan,
    setPlan,
    pool
}: {
    plan: Plan;
    setPlan: (t: Plan) => void;
    pool: CoursePool;
}) {
    const concentrationsList = [
        "Aritificial Intelligence and Robotics",
        "Bioinformatics",
        "Cybersecurity",
        "Data Science",
        "High Performance Computing - Applied Math Track",
        "High Performance Computing - Data Track",
        "Systems and Networks",
        "Theory and Computation - Continuous Track",
        "Theory and Computation - Discrete Track"
    ];
    const [concentration, setConcentration] = useState(concentrationsList[0]);
    const [concReqs, setConcReqs] = useState(Concentration[0]);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [showPoolModal, setShowPoolModal] = useState(false);
    const handleClosePoolModal = () => setShowPoolModal(false);
    const handleShowPoolModal = () => setShowPoolModal(true);
    const userCourses: Course[][] = plan.semesters.map(
        (userSemesters: Semester) =>
            userSemesters.courseArray.map((userCourse: Course) => ({
                ...userCourse
            }))
    );
    const userCodes2d: string[][] = userCourses.map((cArray: Course[]) =>
        cArray.map((userC: Course) => userC.code)
    );
    const testArr = [] as string[];
    const userCodes1d = testArr.concat(...userCodes2d);

    const userCreds2d: string[][] = userCourses.map((cArray: Course[]) =>
        cArray.map((userC: Course) => userC.credits)
    );
    const testArr2 = [] as string[];
    const userCreds1d = testArr2.concat(...userCreds2d);
    const credits = userCreds1d.reduce(
        (currentTotal: number, c: string) => currentTotal + Number(c),
        0
    );

    function changeConcReqs() {
        if (concentration === "Aritificial Intelligence and Robotics") {
            setConcReqs(Concentration[0]);
        } else if (concentration === "Bioinformatics") {
            setConcReqs(Concentration[1]);
        } else if (concentration === "Cybersecurity") {
            setConcReqs(Concentration[2]);
        } else if (concentration === "Data Science") {
            setConcReqs(Concentration[3]);
        } else if (
            concentration === "High Performance Computing - Applied Math Track"
        ) {
            setConcReqs(Concentration[4]);
        } else if (
            concentration === "High Performance Computing - Data Track"
        ) {
            setConcReqs(Concentration[5]);
        } else if (concentration === "Systems and Networks") {
            setConcReqs(Concentration[6]);
        } else if (
            concentration === "Theory and Computation - Continuous Track"
        ) {
            setConcReqs(Concentration[7]);
        } else {
            setConcReqs(Concentration[8]);
        }
        handleCloseModal();
    }

    const changeConcentration = (event: ChangeEvent) => {
        setConcentration(event.target.value);
    };

    const statReqsComb: [string] = [statReqs[0] + " or " + statReqs[1]];
    const writingReqsComb: [string] = [
        writingReqs[0] + " or " + writingReqs[1]
    ];
    const dle = ["DLE Requirement"];
    const capstone = ["Capstone Requirement"];
    const labScience = ["Lab Science Requirement"];

    function ReqsFunction(courses: string[]) {
        const takenCourses = courses.filter((course: string): boolean =>
            userCodes1d.includes(course)
        );
        if (takenCourses.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    function capstoneReqsFunction(courses: string[]) {
        if (
            userCodes1d.includes(courses[0]) &&
            userCodes1d.includes(courses[1])
        ) {
            return true;
        } else if (
            userCodes1d.includes(courses[2]) &&
            userCodes1d.includes(courses[3])
        ) {
            return true;
        } else {
            return false;
        }
    }
    function labReqsFunction(courses: string[]) {
        if (
            userCodes1d.includes(courses[0]) &&
            userCodes1d.includes(courses[1]) &&
            userCodes1d.includes(courses[2]) &&
            userCodes1d.includes(courses[3])
        ) {
            return true;
        } else if (
            userCodes1d.includes(courses[4]) &&
            userCodes1d.includes(courses[5]) &&
            userCodes1d.includes(courses[6]) &&
            userCodes1d.includes(courses[7])
        ) {
            return true;
        } else if (
            userCodes1d.includes(courses[8]) &&
            userCodes1d.includes(courses[9])
        ) {
            return true;
        } else if (
            userCodes1d.includes(courses[10]) &&
            userCodes1d.includes(courses[11]) &&
            userCodes1d.includes(courses[12])
        ) {
            return true;
        } else if (
            userCodes1d.includes(courses[12]) &&
            userCodes1d.includes(courses[13])
        ) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="bg-white border m-2 p-2">
            <Container>
                <h4>
                    <b>
                        <u>Degree Requirements</u>
                    </b>
                </h4>
                {/** Dropdown for choosing concentration */}
                <div>
                    {/* Course Pool */}
                    <Button
                        variant="secondary"
                        onClick={handleShowPoolModal}
                        data-testid="displayCoursePoolButton"
                    >
                        Course Pool
                    </Button>
                    <DisplayCoursePool
                        show={showPoolModal}
                        handleClose={handleClosePoolModal}
                        coursepool={pool}
                        plan={plan}
                        setPlan={setPlan}
                    ></DisplayCoursePool>
                    <p></p>
                    <Button variant="outline-success" onClick={handleShowModal}>
                        Choose your Concentration
                    </Button>
                    <p></p>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header>
                            <Modal.Title> Choose Concentration </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col>
                                <Form.Select
                                    value={concentration}
                                    onChange={changeConcentration}
                                >
                                    {concentrationsList.map(
                                        (choice: string) => (
                                            <option key={choice} value={choice}>
                                                {choice}
                                            </option>
                                        )
                                    )}
                                </Form.Select>
                            </Col>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={changeConcReqs}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <p></p>
                    <p>
                        <b>Concentration:</b> {concentration}
                    </p>
                    <p></p>

                    <p>
                        <b>Total Credits:</b> {credits} / 124
                    </p>
                    <p></p>
                    <b>
                        <u>Core Requirement:</u>
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
                        {CoreReqs.map((s) =>
                            userCodes1d.includes(s) ? (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>✔️</td>
                                </tr>
                            ) : (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>❌</td>
                                </tr>
                            )
                        )}
                        {statReqsComb.map((s) =>
                            ReqsFunction(statReqs) ? (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>✔️</td>
                                </tr>
                            ) : (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>❌</td>
                                </tr>
                            )
                        )}
                        {writingReqsComb.map((s) =>
                            ReqsFunction(writingReqs) ? (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>✔️</td>
                                </tr>
                            ) : (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>❌</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
                <p></p>
                <b>
                    <u>University Requirements:</u>
                </b>
                <p></p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <b>Requirement</b>
                            </th>
                            <th>
                                <b>Taken</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {labScience.map((s) =>
                            labReqsFunction(labScienceReqs) ? (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>✔️</td>
                                </tr>
                            ) : (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>❌</td>
                                </tr>
                            )
                        )}
                        {dle.map((s) =>
                            capstoneReqsFunction(capstoneReqs) ? (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>✔️</td>
                                </tr>
                            ) : (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>❌</td>
                                </tr>
                            )
                        )}
                        {capstone.map((s) =>
                            capstoneReqsFunction(capstoneReqs) ? (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>✔️</td>
                                </tr>
                            ) : (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>❌</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
                <div>
                    <b>
                        <u>Concentration Requirement:</u>
                    </b>
                </div>
                <p></p>
                {/** Table for Concentration Requirements */}
            </Container>
            <Container>
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
                        {concReqs.map((s) =>
                            userCodes1d.includes(s) ? (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>✔️</td>
                                </tr>
                            ) : (
                                <tr key={s}>
                                    <td>{s}</td>
                                    <td>❌</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
            </Container>

            <p></p>
            <b>
                <u>External Resources:</u>
            </b>
            <p></p>

            <Button
                onClick={() =>
                    window.open(
                        "https://catalog.udel.edu/preview_entity.php?catoid=47&ent_oid=5200&returnto=8864",
                        "_blank"
                    )
                }
            >
                Computer Science Catalog
            </Button>

            <p></p>

            <Button
                onClick={() =>
                    window.open("https://www.cis.udel.edu", "_blank")
                }
            >
                UD Department of CS
            </Button>
        </div>
    );
}
