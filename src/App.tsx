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
import { ChangePlan } from "./Components/ChangePlan";

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
            semesters: []
        }
    ]);

    // propogate plans with user input
    function makeNewPlan() {
        setPlanArray([
            ...planArray,
            {
                title: "new plan" + planArray.length.toString() + 1,
                id: planArray.length + 1,
                semesters: []
            }
        ]);
    }

    // const [plan, setPlan] = useState<Plan>(planArray[0]);
    // const [allsems, setSems] = useState<Semester[]>(SEMESTER);
    //May not be updating automatically.
    const [plan, setPlan] = useState<Plan>(planArray[0]);

    const [showAddModal, setShowAddModal] = useState(false);

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

    const [showPlanModal, setShowPlanModal] = useState(false);
    const handleClosePlanModal = () => setShowPlanModal(false);
    const handleShowPlanModal = () => setShowPlanModal(true);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    type CourseRecord = Record<string, Record<string, Course>>;
    const ALLCOURSES: CourseRecord = course_data_json;
    const pool: CoursePool = {
        semesters: plan.semesters,
        courses: ALLCOURSES
    };

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
            <h3>{plan.title}</h3>
            <DisplayCoursePool
                show={showPoolModal}
                handleClose={handleClosePoolModal}
                coursepool={pool}
            ></DisplayCoursePool>

            <SemesterList
                activePlan={plan}
                editSemester={editSemester}
                deleteSemester={deleteSemester}
                setPlans={setPlan} //Used to be setSems
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

            {/* Add New Plan */}
            <Button variant="secondary" onClick={handleShowPlanModal}>
                Change Plan
            </Button>
            <p></p>
            <ChangePlan
                show={showPlanModal}
                handleClose={handleClosePlanModal}
                plan={plan}
                plans={planArray}
                setPlan={setPlan}
            ></ChangePlan>
            {/*Replace with component */}
            <Button onClick={makeNewPlan}> ADD PLAN (click 1x) </Button>
        </div>
    );
}

export default App;
