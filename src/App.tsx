import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import headerbackground from "./Pictures/headerbackground.jpeg";
import "./App.css";

import { AddSemester } from "./Components/AddSemester";
import { SemesterList } from "./Components/SemesterList";
// import { AddPlan } from "./Components/AddPlan";
// import { DisplayCourses } from "./Components/DisplayCourses";

import { Semester } from "./Interfaces/semester";
import { Course } from "./Interfaces/courses";

import { CoursePool } from "./Interfaces/coursepool";
import course_data_json from "./Data/course_data.json";
// import { AddPlan } from "./Components/AddPlan";

import semester_json from "./Data/semester_data.json";
import { DisplayCoursePool } from "./Components/DisplayCoursePool";
// import course_data_json from "./Data/course_data.json";

//type CourseRecord = Record<string, Record<string, Course>>;
//const jsonObject = course_data_json as CourseRecord;

const SEMESTER = semester_json.map(
    (semester): Semester => ({
        ...semester,
        courseArray: semester.courseArray.map(
            (course): Course => ({
                code: course.code,
                name: course.name,
                descr: course.descr,
                credits: course.credits,
                preReq: course.preReq,
                restrict: course.restrict,
                breadth: course.breadth,
                typ: course.typ
            })
        )
    })
);

// type CourseRecord = Record<string, Record<string, Course>>;
// const ALLCOURSES: CourseRecord = course_data_json;

function App(): JSX.Element {
    const [sem, setSem] = useState<Semester[]>(SEMESTER);
    const [showAddModal, setShowAddModal] = useState(false);
    // const [courses, setCourses] = useState<CourseRecord>(ALLCOURSES);

    function addSemester(newSem: Semester) {
        const existing = sem.find(
            (semester: Semester): boolean => semester.id === newSem.id
        );
        if (existing === undefined) {
            setSem([...sem, newSem]);
        }
    }

    function editSemester(id: string, newSem: Semester) {
        setSem(
            sem.map(
                (semester: Semester): Semester =>
                    semester.id === id ? newSem : semester
            )
        );
    }

    function deleteSemester(id: string) {
        setSem(sem.filter((semester: Semester): boolean => semester.id !== id));
    }

    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);

    const [showPoolModal, setShowPoolModal] = useState(false);
    const handleClosePoolModal = () => setShowPoolModal(false);
    const handleShowPoolModal = () => setShowPoolModal(true);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const [addPlan, setAddPlan] = useState<boolean>(false);
    // const handleCloseAddPlanModal = () => setAddPlan(false);
    // const handleShowAddPlanModal = () => setAddPlan(true);

    type CourseRecord = Record<string, Record<string, Course>>;
    const ALLCOURSES: CourseRecord = course_data_json;
    const pool: CoursePool = {
        semesters: sem,
        courses: ALLCOURSES
    };
    //const cs_courses = course_data_json["CISC"];

    return (
        <div className="App">
            <img src={headerbackground} width="100%" height="230" />
            <div>
                <p></p>
                <Button variant="light" onClick={handleOpen}>
                    Click here for how to begin!
                </Button>
                <Modal show={open} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Welcome to our Website!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Hello and welcome to our website to help Computer
                        Science majors at the University of Delaware make
                        schedules. This website will allow you to put together
                        your desired schedule for the rest of your career. Add
                        the classes you wish to take to their their semester,
                        add/remove semesters, add one or more plans, and even
                        edit the class itself if necessary!
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
                <p></p>
            </div>

            {/*
            <div style={{ textAlign: "center", margin: "auto" }}>
                <Button
                    variant="contained"
                    color="success"
                    className="m-4"
                    onClick={handleShowAddPlanModal}
                    style={{ width: "50%" }}
                >
                    Add Plan
                </Button>
                <AddPlan
                    show={addPlan}
                    handleClose={handleCloseAddPlanModal}
                    // plans={plans}
                    // setPlans={setPlans}
                ></AddPlan>
            </div>
            */}
            <Button variant="secondary" onClick={handleShowPoolModal}>
                Display Course Pool
            </Button>
            <p></p>

            {/* Add Semester */}
            <DisplayCoursePool
                show={showPoolModal}
                handleClose={handleClosePoolModal}
                coursepool={pool}
            ></DisplayCoursePool>
            <SemesterList
                semester={sem}
                editSemester={editSemester}
                deleteSemester={deleteSemester}
            ></SemesterList>

            {/* Add Semester Button */}
            <p></p>
            <Button variant="light" onClick={handleShowAddModal}>
                Add New Semester
            </Button>
            <p></p>

            {/* Add Semester */}
            <AddSemester
                show={showAddModal}
                handleClose={handleCloseAddModal}
                addSemester={addSemester}
            ></AddSemester>
        </div>
    );
}

export default App;
