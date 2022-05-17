import React, { useState } from "react";
import { Button, Col, Container, Form, Modal } from "react-bootstrap";
// import { CoursePool } from "../Interfaces/coursepool";
import { Table } from "react-bootstrap";
import { Concentration } from "../Interfaces/requirements";
import { CoreReqs } from "../Interfaces/requirements";
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
        "AI",
        "Bioinformatics",
        "Cybersecurity",
        "DataScience",
        "HighPerformanceComputing",
        "SystemsandNetworks",
        "TheoryandComputationContinous",
        "TheoryandComputationDiscreet"
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
        handleCloseModal();
    }

    const changeConcentration = (event: ChangeEvent) => {
        setConcentration(event.target.value);
    };

    /** const userCourses: Course[][] = plan.semesters.map(
        (userSemesters: Semester) =>
            userSemesters.courseArray.map((userCourse: Course) => ({
                ...userCourse
            }))
    );
    const userCreds2d: string[][] = userCourses.map((cArray: Course[]) =>
        cArray.map((userC: Course) => userC.credits)
    );
    const testArr = [] as string[];
    const userCodes1d = testArr.concat(...userCreds2d);
    function updateCreds(credList: string[], plan: Plan) {
        const credits = credList.reduce(
            (currentTotal: number, c: string) => currentTotal + Number(c),
            0
        );
        plan.totalCreds += credits;
    }
    updateCreds(userCodes1d, plan); **/
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
                        <Modal.Header closeButton>
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
                    <p>Concentration: {concentration}</p>
                    <p></p>

                    <p>Total Credits: {plan.totalCreds} / 124</p>
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
                    </tbody>
                </Table>
                <p></p>
                <div>
                    <b>
                        <u>Concentration Requirements:</u>
                    </b>
                </div>
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
        </div>
    );
}
