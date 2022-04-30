import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Course } from "../Interfaces/courses";
import { Semester } from "../Interfaces/semester";
import "../App.css";
import { DeleteCourse } from "./DeleteCourse";

export function DisplayCourses({
    course,
    courseSemester
}: {
    course: Course;
    courseSemester: Semester;
}): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        course.name = event.target.value;
    }
    function updateCourseDesc(event: React.ChangeEvent<HTMLInputElement>) {
        course.descr = event.target.value;
    }
    function updateCourseCredits(event: React.ChangeEvent<HTMLInputElement>) {
        course.credits = event.target.value;
    }
    function updateCoursePrereq(event: React.ChangeEvent<HTMLInputElement>) {
        course.preReq = event.target.value;
    }
    function updateCourseRestrict(event: React.ChangeEvent<HTMLInputElement>) {
        course.restrict = event.target.value;
    }
    function updateCourseBreadth(event: React.ChangeEvent<HTMLInputElement>) {
        course.breadth = event.target.value;
    }
    function updateCourseTyp(event: React.ChangeEvent<HTMLInputElement>) {
        course.typ = event.target.value;
    }
    function updateEditing(event: React.ChangeEvent<HTMLInputElement>) {
        setIsEditing(event.target.checked);
    }
    function flipVisibility(): void {
        setVisible(!visible);
    }

    return (
        <div>
            {courseSemester.courseArray.findIndex(
                (c: Course): boolean => c.code === course.code
            ) != -1 && (
                <div>
                    <Button onClick={flipVisibility}> {course.name} </Button>
                    {visible && (
                        <div>
                            <Form.Check
                                type="switch"
                                id="is-edit-mode"
                                label="Edit Course"
                                checked={isEditing}
                                onChange={updateEditing}
                            />
                            <Button
                                onClick={handleShowAddModal}
                                variant="danger"
                            >
                                Delete Course
                            </Button>
                            <p></p>

                            <DeleteCourse
                                show={showAddModal}
                                handleClose={handleCloseAddModal}
                                currCourse={course}
                                currSemester={courseSemester}
                            ></DeleteCourse>
                            {!isEditing && (
                                <div>
                                    <div>Course Code: {course.code}</div>
                                    <div>Course Name: {course.name}</div>
                                    <div>Description: {course.descr}</div>
                                    <div>
                                        Number of Credits: {course.credits}
                                    </div>
                                    <div>Pre-Requisites: {course.preReq}</div>
                                    <div>Restrictions: {course.restrict}</div>
                                    <div>
                                        Breadth Requirements: {course.breadth}
                                    </div>
                                    <div>Semesters offered: {course.typ}</div>
                                </div>
                            )}
                        </div>
                    )}
                    {isEditing && (
                        <div>
                            <Form.Group controlId="formCourseCode">
                                <Form.Label>Course Code:</Form.Label>
                                <Form.Control
                                    value={course.code}
                                    onChange={updateName}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourseName">
                                <Form.Label>Course Name:</Form.Label>
                                <Form.Control
                                    value={course.name}
                                    onChange={updateName}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourseDescription">
                                <Form.Label>Course Description:</Form.Label>
                                <Form.Control
                                    value={course.descr}
                                    onChange={updateCourseDesc}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourseredits">
                                <Form.Label>Course Credits:</Form.Label>
                                <Form.Control
                                    value={course.credits}
                                    onChange={updateCourseCredits}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCoursePrereq">
                                <Form.Label>Course Pre-Requisites:</Form.Label>
                                <Form.Control
                                    value={course.preReq}
                                    onChange={updateCoursePrereq}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourseRestrict">
                                <Form.Label>Course Restrictions:</Form.Label>
                                <Form.Control
                                    value={course.restrict}
                                    onChange={updateCourseRestrict}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourseBreadth">
                                <Form.Label>Course Breadth:</Form.Label>
                                <Form.Control
                                    value={course.breadth}
                                    onChange={updateCourseBreadth}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourseTyp">
                                <Form.Label>Semesters Offered:</Form.Label>
                                <Form.Control
                                    value={course.typ}
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
