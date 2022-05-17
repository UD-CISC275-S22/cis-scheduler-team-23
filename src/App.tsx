import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import NonBlurryBannerMaybe from "./Pictures/NonBlurryBannerMaybe.png";
import "./App.css";

import { WelcomeModal } from "./Components/WelcomeModal";
import { AddSemester } from "./Components/AddSemester";
import { SemesterList } from "./Components/SemesterList";
import { DisplayCoursePool } from "./Components/DisplayCoursePool";
import { ChangePlan } from "./Components/ChangePlan";
import { AddPlan } from "./Components/AddPlan";
import { ClearPlan } from "./Components/ClearPlan";
import { DeletePlan } from "./Components/DeletePlan";
import { EditPlan } from "./Components/EditPlan";
import { ExportCSV } from "./Components/ExportCSV";

import { Semester } from "./Interfaces/semester";
import { Course } from "./Interfaces/courses";
import { Plan } from "./Interfaces/plans";
import { CoursePool } from "./Interfaces/coursepool";

import course_data_json from "./Data/course_data.json";
import semester_json from "./Data/semester_data.json";
import { RequirementView } from "./Components/RequirementView";

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
            title: "Team 23 Auto Generated Plan",
            id: 0,
            semesters: SEMESTER,
            totalCreds: 0
        },
        {
            title: "Team 23 Auto Generated Plan Version 2",
            id: 1,
            semesters: [],
            totalCreds: 5
        }
    ]);

    const [plan, setPlan] = useState<Plan>(planArray[0]);

    const [showAddModal, setShowAddModal] = useState(false);

    function addSemester(newSem: Semester) {
        const existing = plan.semesters.find(
            (semester: Semester): boolean => semester.id === newSem.id
        );
        if (existing === undefined) {
            plan.semesters.push(newSem);
            setPlan(plan);
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
        const planIndex = planArray.findIndex(
            (p: Plan): boolean => p.id === plan.id
        );
        planArray[planIndex] = plan;
        setPlan(plan);
        setPlanArray(planArray);
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

    const [showAddPlanModal, setShowAddPlanModal] = useState(false);
    const handleCloseAddPlanModal = () => setShowAddPlanModal(false);
    const handleShowAddPlanModal = () => setShowAddPlanModal(true);

    const [showClearPlanModal, setShowClearPlanModal] = useState(false);
    const handleCloseClearPlanModal = () => setShowClearPlanModal(false);
    const handleShowClearPlanModal = () => setShowClearPlanModal(true);

    const [showDeletePlanModal, setShowDeletePlanModal] = useState(false);
    const handleCloseDeletePlanModal = () => setShowDeletePlanModal(false);
    const handleShowDeletePlanModal = () => setShowDeletePlanModal(true);

    const [showEditPlanModal, setShowEditPlanModal] = useState(false);
    const handleCloseEditPlanModal = () => setShowEditPlanModal(false);
    const handleShowEditPlanModal = () => setShowEditPlanModal(true);

    type CourseRecord = Record<string, Record<string, Course>>;
    const ALLCOURSES: CourseRecord = course_data_json;
    const pool: CoursePool = {
        semesters: plan.semesters,
        courses: ALLCOURSES
    };

    return (
        <div className="App">
            {/* Website Banner */}
            <img
                src={NonBlurryBannerMaybe}
                width="100%"
                height="100%"
                data-testid="header-image"
            />

            {/* Welcome Modal and Message */}
            <div>
                <p></p>
                <WelcomeModal></WelcomeModal>
                <p></p>
            </div>

            <Row>
                <Col>
                    {/* Current Plan Title */}
                    <h2>
                        <b> {plan.title} </b>
                        <p></p>
                    </h2>

                    {/* Add New Plan */}
                    <Button
                        variant="primary"
                        onClick={handleShowAddPlanModal}
                        data-testid="addNewPlanButton"
                    >
                        Add Plan
                    </Button>
                    <AddPlan
                        show={showAddPlanModal}
                        handleClose={handleCloseAddPlanModal}
                        plans={planArray}
                        setPlans={setPlanArray}
                    ></AddPlan>

                    {"  "}

                    {/* Change Plan */}
                    <Button
                        variant="secondary"
                        onClick={handleShowPlanModal}
                        data-testid="changePlanButton"
                    >
                        Change Plan
                    </Button>
                    <ChangePlan
                        show={showPlanModal}
                        handleClose={handleClosePlanModal}
                        plan={plan}
                        plans={planArray}
                        setPlan={setPlan}
                    ></ChangePlan>

                    <p></p>

                    {/* Export CSV Files */}
                    <ExportCSV
                        semesters={plan.semesters}
                        plan={plan}
                    ></ExportCSV>

                    <p></p>

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

                    <SemesterList
                        activePlan={plan}
                        editSemester={editSemester}
                        deleteSemester={deleteSemester}
                        setPlan={setPlan}
                        plans={planArray}
                        setPlans={setPlanArray}
                    ></SemesterList>

                    <Row>
                        <Col>
                            {/* Add Semester Button */}
                            <Button
                                variant="light"
                                onClick={handleShowAddModal}
                                data-testid="addSemesterButton"
                            >
                                Add New Semester
                            </Button>
                            <AddSemester
                                show={showAddModal}
                                handleClose={handleCloseAddModal}
                                addSemester={addSemester}
                            ></AddSemester>

                            <p></p>

                            {/* Edit Plan */}
                            <Button
                                variant="secondary"
                                onClick={handleShowEditPlanModal}
                                data-testid="editPlanButton"
                            >
                                Edit Plan
                            </Button>
                            <EditPlan
                                show={showEditPlanModal}
                                handleClose={handleCloseEditPlanModal}
                                plan={plan}
                                plans={planArray}
                                setPlan={setPlan}
                                setPlans={setPlanArray}
                            ></EditPlan>

                            {"  "}

                            {/* Clear Plan */}
                            <Button
                                variant="warning"
                                onClick={handleShowClearPlanModal}
                                data-testid="clearPlanButton"
                            >
                                Clear Plan
                            </Button>
                            <ClearPlan
                                show={showClearPlanModal}
                                handleClose={handleCloseClearPlanModal}
                                plan={plan}
                                plans={planArray}
                                setPlan={setPlan}
                                setPlans={setPlanArray}
                            ></ClearPlan>

                            {"  "}

                            {/* Delete Plan */}
                            <Button
                                variant="danger"
                                onClick={handleShowDeletePlanModal}
                                data-testid="deletePlanButton"
                            >
                                Delete Plan
                            </Button>
                            <DeletePlan
                                show={showDeletePlanModal}
                                handleClose={handleCloseDeletePlanModal}
                                plan={plan}
                                plans={planArray}
                                setPlan={setPlan}
                                setPlans={setPlanArray}
                            ></DeletePlan>

                            <p></p>
                        </Col>
                    </Row>
                </Col>

                {/* Degree Requirements */}
                <Col xs={4}>
                    <RequirementView plan={plan}></RequirementView>
                </Col>
            </Row>
        </div>
    );
}

export default App;
