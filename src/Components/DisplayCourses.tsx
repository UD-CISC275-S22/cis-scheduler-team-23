import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Course } from "../Interfaces/courses";
import { Semester } from "../Interfaces/semester";
import { Plan } from "../Interfaces/plans";
import "../App.css";
import { DeleteCourse } from "./DeleteCourse";
import { DefaultCourse } from "./DefaultCourse";
import { ChangeSemester } from "./ChangeSemester";

export function DisplayCourses({
    course,
    courseSemester,
    activePlan,
    setPlan
}: {
    course: Course;
    courseSemester: Semester;
    activePlan: Plan;
    setPlan: (t: Plan) => void;
}): JSX.Element {
    const [code, setCode] = useState(course.code);
    const [name, setName] = useState(course.name);
    const [descr, setDescr] = useState(course.descr);
    const [credits, setCredits] = useState(course.credits);
    const [prereq, setPrereq] = useState(course.restrict);
    const [restrict, setRestrict] = useState(course.restrict);
    const [breadth, setBreadth] = useState(course.breadth);
    const [typ, setTyp] = useState(course.typ);
    const [visible, setVisible] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editButtonName, setEditButtonName] = useState<string>("Edit Course");
    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);
    const [showChangeModal, setShowChangeModal] = useState(false);
    const handleCloseChangeModal = () => setShowChangeModal(false);
    const handleShowChangeModal = () => setShowChangeModal(true);
    if (course.default_code) {
        course.default_code.push(course.code);
    } else {
        course.default_code = [course.code];
    }
    function updateCode(event: React.ChangeEvent<HTMLInputElement>) {
        course.code = event.target.value;
        setCode(event.target.value);
    }
    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        course.name = event.target.value;
        setName(event.target.value);
    }
    function updateCourseDesc(event: React.ChangeEvent<HTMLInputElement>) {
        course.descr = event.target.value;
        setDescr(event.target.value);
    }
    function updateCourseCredits(event: React.ChangeEvent<HTMLInputElement>) {
        //checks for spaces in string, makes it 0 if blank.
        let credInput = event.target.value.replace(/\s/g, "");
        if (credInput === "" || credInput === undefined) {
            credInput = "0";
        }
        console.log(credits);
        setCredits(credInput);
        console.log(credits);
        const courseIndex = courseSemester.courseArray.findIndex(
            (c: Course): boolean => c.code === course.code
        );
        const newSemester = { ...courseSemester };
        if (courseIndex > -1) {
            newSemester.courseArray[courseIndex].credits = credInput;
            console.log(credits);
            setCredits(Number(credInput).toString());
            console.log(credits);
        }
        setPlan({
            ...activePlan,
            semesters: activePlan.semesters.map(
                (semester: Semester): Semester =>
                    semester.id === newSemester.id ? newSemester : semester
            )
        });
    }
    function updateCoursePrereq(event: React.ChangeEvent<HTMLInputElement>) {
        course.preReq = event.target.value;
        setPrereq(event.target.value);
    }
    function updateCourseRestrict(event: React.ChangeEvent<HTMLInputElement>) {
        course.restrict = event.target.value;
        setRestrict(event.target.value);
    }
    function updateCourseBreadth(event: React.ChangeEvent<HTMLInputElement>) {
        course.breadth = event.target.value;
        setBreadth(event.target.value);
    }
    function updateCourseTyp(event: React.ChangeEvent<HTMLInputElement>) {
        course.typ = event.target.value;
        setTyp(event.target.value);
    }
    function updateEditing() {
        setIsEditing(!isEditing);
        if (editButtonName === "Edit Course") setEditButtonName("Save Changes");
        else setEditButtonName("Edit Course");
    }
    function flipVisibility(): void {
        setVisible(!visible);
        setEditButtonName("Edit Course");
        setIsEditing(false);
        setEditButtonName("Edit Course");
    }
    function restoreDefault(): void {
        if (course.default_code) {
            DefaultCourse(course, course.default_code);
        }
        setCode(course.code);
        setName(course.name);
        setDescr(course.descr);
        setCredits(course.credits);
        setPrereq(course.preReq);
        setRestrict(course.restrict);
        setBreadth(course.breadth);
        setTyp(course.typ);
    }
    return (
        <div>
            {courseSemester.courseArray.findIndex(
                (c: Course): boolean => c.code === course.code
            ) != -1 && (
                <div>
                    <Button onClick={flipVisibility}> {course.code} </Button>
                    {visible && (
                        <div>
                            <p></p>
                            <Button
                                onClick={handleShowChangeModal}
                                variant="secondary"
                                data-testid="changeSemesterButton"
                            >
                                Change Semester
                            </Button>
                            <ChangeSemester
                                show={showChangeModal}
                                handleClose={handleCloseChangeModal}
                                course={course}
                                courseSemester={courseSemester}
                                activePlan={activePlan}
                                setPlan={setPlan}
                            ></ChangeSemester>

                            <p></p>

                            <Button
                                id="is-editing"
                                onClick={updateEditing}
                                variant="warning"
                                data-testid="editCourseButton"
                            >
                                {editButtonName}
                            </Button>

                            <p></p>

                            <Button
                                onClick={handleShowAddModal}
                                variant="danger"
                                data-testid="deleteCourseButton"
                            >
                                Delete Course
                            </Button>
                            <DeleteCourse
                                show={showAddModal}
                                handleClose={handleCloseAddModal}
                                currCourse={course}
                                currSemester={courseSemester}
                                plan={activePlan}
                                setPlan={setPlan}
                            ></DeleteCourse>

                            <p></p>

                            <Button
                                onClick={restoreDefault}
                                variant="info"
                                data-testid="resetCourseToDefaultButton"
                            >
                                Reset Course To Default
                            </Button>

                            <p></p>

                            {!isEditing && (
                                <div className="App-allignleft">
                                    <div>
                                        <b>Course Code:</b> {course.code}
                                    </div>
                                    <div>
                                        <b>Course Name:</b> {course.name}
                                    </div>
                                    <div>
                                        <b>Description:</b> {course.descr}
                                    </div>
                                    <div>
                                        <b>Number of Credits:</b>
                                        {course.credits}
                                    </div>
                                    <div>
                                        <b>Pre-Requisites:</b> {course.preReq}
                                    </div>
                                    <div>
                                        <b>Restrictions:</b> {course.restrict}
                                    </div>
                                    <div>
                                        <b>Breadth Requirements:</b>
                                        {course.breadth}
                                    </div>
                                    <div>
                                        <b>Semesters offered:</b> {course.typ}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {isEditing && (
                        <div>
                            <Form.Group controlId="formCourseCode">
                                <Form.Label>Course Code:</Form.Label>
                                <Form.Control
                                    value={code}
                                    onChange={updateCode}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourseName">
                                <Form.Label>Course Name:</Form.Label>
                                <Form.Control
                                    value={name}
                                    onChange={updateName}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourseDescription">
                                <Form.Label>Course Description:</Form.Label>
                                <Form.Control
                                    value={descr}
                                    onChange={updateCourseDesc}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourseredits">
                                <Form.Label>Course Credits:</Form.Label>
                                <Form.Control
                                    value={credits}
                                    onChange={updateCourseCredits}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCoursePrereq">
                                <Form.Label>Course Pre-Requisites:</Form.Label>
                                <Form.Control
                                    value={prereq}
                                    onChange={updateCoursePrereq}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourseRestrict">
                                <Form.Label>Course Restrictions:</Form.Label>
                                <Form.Control
                                    value={restrict}
                                    onChange={updateCourseRestrict}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourseBreadth">
                                <Form.Label>Course Breadth:</Form.Label>
                                <Form.Control
                                    value={breadth}
                                    onChange={updateCourseBreadth}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourseTyp">
                                <Form.Label>Semesters Offered:</Form.Label>
                                <Form.Control
                                    value={typ}
                                    onChange={updateCourseTyp}
                                />
                            </Form.Group>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
