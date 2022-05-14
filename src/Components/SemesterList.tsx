import React from "react";
import { Stack } from "react-bootstrap";
import { Plan } from "../Interfaces/plans";
import { Semester } from "../Interfaces/semester";
import { SemesterView } from "./SemesterView";

export function SemesterList({
    activePlan,
    editSemester,
    deleteSemester,
    setPlans
}: {
    activePlan: Plan;
    editSemester: (id: string, newSemester: Semester) => void;
    deleteSemester: (id: string) => void;
    setPlans: (t: Plan) => void;
}): JSX.Element {
    return (
        <Stack gap={3}>
            {activePlan.semesters.map((semester: Semester) => (
                <div key={semester.id} className="bg-light border m-2 p-2">
                    <SemesterView
                        semester={semester}
                        editSemester={editSemester}
                        deleteSemester={deleteSemester}
                        activePlan={activePlan}
                        setPlan={setPlans}
                    ></SemesterView>
                </div>
            ))}
        </Stack>
    );
}
