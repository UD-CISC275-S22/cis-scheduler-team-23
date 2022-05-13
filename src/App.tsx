import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import headerbackground from "./Pictures/seal-background-5.jpeg";
import "./App.css";

import { AddSemester } from "./Components/AddSemester";
import { SemesterList } from "./Components/SemesterList";
import { DisplayCoursePool } from "./Components/DisplayCoursePool";

import { Semester } from "./Interfaces/semester";
import { Course } from "./Interfaces/courses";
import { Plan } from "./Interfaces/plans";
import { CoursePool } from "./Interfaces/coursepool";

import course_data_json from "./Data/course_data.json";
import semester_json from "./Data/semester_data.json";

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
    const [planArray, setPlanArray] = useState<Plan[]>([
        {
            title: "test plan",
            id: 0,
            semesters: SEMESTER
        },
        {
            title: "test plan2",
            id: 1,
            semesters: [...SEMESTER]
        }
    ]);

    function updatePlan() {
        setPlanArray(
            planArray.map(
                (usedPlan: Plan): Plan =>
                    plan.id === usedPlan.id ? plan : usedPlan
            )
        );
        if (plan.id === 0) {
            setPlan(planArray[1]);
        } else {
            setPlan(planArray[0]);
        }
    }
    //const [semIndex, setSemIndex] = useState<number>(0);
    const [plan, setPlan] = useState<Plan>({
        title: "test plan",
        id: 0,
        semesters: SEMESTER
    });
    const [showAddModal, setShowAddModal] = useState(false);
    // const [courses, setCourses] = useState<CourseRecord>(ALLCOURSES);

    function addSemester(newSem: Semester) {
        const existing = plan.semesters.find(
            (semester: Semester): boolean => semester.id === newSem.id
        );
        if (existing === undefined) {
            setPlan({ ...plan, semesters: [...plan.semesters, newSem] });
        }
    }

    function editSemester(id: string, newSem: Semester) {
        setPlan({
            ...plan,
            semesters: plan.semesters.map(
                (semester: Semester): Semester =>
                    semester.id === id ? newSem : semester
            )
        });
    }

    function deleteSemester(id: string) {
        setPlan({
            ...plan,
            semesters: plan.semesters.filter(
                (semester: Semester): boolean => semester.id !== id
            )
        });
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
        semesters: plan.semesters,
        courses: ALLCOURSES
    };
    //const cs_courses = course_data_json["CISC"];

    return (
        <div className="App">
            <img src={headerbackground} width="100%" height="100%" />
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
                semester={plan.semesters}
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
            <Button variant="light" onClick={updatePlan}>
                ADD PLAN
            </Button>
        </div>
    );
}

export default App;
