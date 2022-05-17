import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { Course } from "../Interfaces/courses";

import "../App.css";
import { Plan } from "../Interfaces/plans";
import { Semester } from "../Interfaces/semester";
import { DisplayCourses } from "./DisplayCourses";

import { SemesterEditor } from "./SemesterEditor";
import { AddCourse } from "./AddCourse";
import { ClearSemester } from "./ClearSemester";

export function SemesterView({
    semester,
    editSemester,
    deleteSemester,
    activePlan,
    setPlan,
    plans,
    setPlans
}: {
    semester: Semester;
    editSemester: (id: string, newSemester: Semester) => void;
    deleteSemester: (id: string) => void;
    activePlan: Plan;
    setPlan: (t: Plan) => void;
    plans: Plan[];
    setPlans: (t: Plan[]) => void;
}): JSX.Element {
    // const [visible, setVisible] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseClearModal = () => setShowClearModal(false);
    const handleShowClearModal = () => setShowClearModal(true);
    const [showClearModal, setShowClearModal] = useState(false);

    function changeEditing() {
        setEdit(!edit);
    }
    const validCreditCourses = semester.courseArray.filter(
        (c: Course): boolean => !isNaN(Number(c.credits))
    );
    function updateCreds(courses: Course[]) {
        const credits = courses.reduce(
            (currentTotal: number, c: Course) =>
                currentTotal + Number(c.credits),
            0
        );
        activePlan.totalCreds += credits / 2;
    }
    updateCreds(validCreditCourses);
    return edit ? (
        <SemesterEditor
            changeEditing={changeEditing}
            semester={semester}
            editSemester={editSemester}
            deleteSemester={deleteSemester}
            plan={activePlan}
            setPlan={setPlan}
            plans={plans}
            setPlans={setPlans}
        ></SemesterEditor>
    ) : (
        <Container>
            <Row>
                <Col>
                    <h3>
                        <b>{semester.title}</b>
                    </h3>
                </Col>
            </Row>
            <Row>
                <p>
                    <b> Notes: </b> {semester.description}
                </p>
            </Row>
            <Row>
                <p>
                    <b> Credits: </b> {/*semCreds*/}
                    {validCreditCourses.reduce(
                        (currentTotal: number, c: Course) =>
                            currentTotal + Number(c.credits),
                        0
                    )}
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
                            activePlan={activePlan}
                            setPlan={setPlan}
                        ></DisplayCourses>
                    </Col>
                ))}
            </Row>
            <p></p>
            <Row>
                <Col>
                    <Button onClick={handleShowAddModal} variant="success">
                        Add Course
                    </Button>

                    <AddCourse
                        show={showAddModal}
                        handleClose={handleCloseAddModal}
                        currSemester={semester}
                        plan={activePlan}
                        setPlan={setPlan}
                    ></AddCourse>
                    <Button onClick={handleShowClearModal} variant="warning">
                        Clear All Courses
                    </Button>

                    <ClearSemester
                        show={showClearModal}
                        handleClose={handleCloseClearModal}
                        currSemester={semester}
                    ></ClearSemester>
                    <Button onClick={changeEditing} variant="danger">
                        {" "}
                        Edit Semester Details{" "}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
