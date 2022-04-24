import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Course } from "../Interfaces/courses";
//import cs_courses_json from "../Data/cs_course_data.json";

export function DisplayCourses({ course }: { course: Course }): JSX.Element {
    //const [courseName, setName] = useState<string>("CISC 181");
    /*
    const [courseDesc, setCourse] = useState<string>(
        "Principles of computer science illustrated and applied through " +
            "programming in an object oriented language. Programming projects illustrate " +
            "computational problems, styles and issues that arise in computer systems " +
            "development and in all application areas of computation."
    );
    */
    const [visible, setVisible] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        course.courseName = event.target.value;
        //setName(event.target.value);
    }
    function updateCourseDesc(event: React.ChangeEvent<HTMLInputElement>) {
        course.courseDesc = event.target.value;
        //setCourse(event.target.value);
    }
    function updateEditing(event: React.ChangeEvent<HTMLInputElement>) {
        setIsEditing(event.target.checked);
    }
    function flipVisibility(): void {
        setVisible(!visible);
    }

    /*
    const CS_COURSES_LIST = (courses: {
        value: {
            code: string;
            name: string;
            descr: string;
            credits: string;
            preReq: string;
            restrict: string;
            breadth: string;
            typ: string;
        };
    }): Course => {
        return {
            courseCode: courses.value.code,
            courseName: courses.value.name,
            courseDesc: courses.value.descr,
            courseCredits: courses.value.credits,
            coursePrereq: courses.value.preReq,
            courseRestrict: courses.value.restrict,
            courseBreadth: courses.value.breadth,
            courseTyp: courses.value.typ
        };
    };
*/
    /*
    const COURSES = cs_courses_json.map(
        (course): Course => ({
            courseCode: course.code,
            courseName: course.name,
            courseDesc: course.descr,
            courseCredits: course.credits,
            coursePrereq: course.preReq,
            courseRestrict: course.restrict,
            courseBreadth: course.breadth,
            courseTyp: course.typ
        })
    );
    */
    return (
        <div>
            <div>
                <h3>Edit Course</h3>
                <Form.Check
                    type="switch"
                    id="is-edit-mode"
                    label="Editing?"
                    checked={isEditing}
                    onChange={updateEditing}
                />
                <Button onClick={flipVisibility}> {course.courseName} </Button>
                {visible && <div>{course.courseDesc}</div>}
                {isEditing && (
                    <div>
                        <Form.Group controlId="formCourseName">
                            <Form.Label>Course Name:</Form.Label>
                            <Form.Control
                                value={course.courseName}
                                onChange={updateName}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCourseDescription">
                            <Form.Label>Course Description:</Form.Label>
                            <Form.Control
                                value={course.courseDesc}
                                onChange={updateCourseDesc}
                            />
                        </Form.Group>
                    </div>
                )}
            </div>
        </div>
    );
}
/*
        div>
            <h3>Courses</h3>
            {COURSES.map((c: Course) => (
                <>
                    <Button onClick={flipVisibility}> {c.courseName} </Button>
                    <Form.Group controlId="formCourseName">
                        <Form.Label>Course Name:</Form.Label>
                        <Form.Control
                            value={c.courseName}
                            onChange={updateName}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCourseDescription">
                        <Form.Label>Course Description:</Form.Label>
                        <Form.Control
                            value={c.courseDesc}
                            onChange={updateCourseDesc}
                        />
                    </Form.Group>
                </>
            ))}
        </div>
*/
/*
    return (
        <div>
            <div>
                <h3>Edit Course</h3>
                <Form.Check
                    type="switch"
                    id="is-edit-mode"
                    label="Editing?"
                    checked={isEditing}
                    onChange={updateEditing}
                />
                <Button onClick={flipVisibility}> {courseName} </Button>
                {visible && <div>{courseDesc}</div>}
                {isEditing && (
                    <div>
                        <Form.Group controlId="formCourseName">
                            <Form.Label>Course Name:</Form.Label>
                            <Form.Control
                                value={courseName}
                                onChange={updateName}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCourseDescription">
                            <Form.Label>Course Description:</Form.Label>
                            <Form.Control
                                value={courseDesc}
                                onChange={updateCourseDesc}
                            />
                        </Form.Group>
                    </div>
                )}
            </div>
        </div>
    );
*/
