import React from "react";
import { Stack } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
import { SemesterView } from "./SemesterView";

export function SemesterList({
    semesters,
    editSemester,
    deleteSemester,
    setSemesters
}: {
    semesters: Semester[];
    editSemester: (id: string, newSemester: Semester) => void;
    deleteSemester: (id: string) => void;
    setSemesters: (t: Semester[]) => void;
}): JSX.Element {
    return (
        <Stack gap={3}>
            {semesters.map((semester: Semester) => (
                <div key={semester.id} className="bg-light border m-2 p-2">
                    <SemesterView
                        semester={semester}
                        editSemester={editSemester}
                        deleteSemester={deleteSemester}
                        allsemesters={semesters}
                        setSemesters={setSemesters}
                    ></SemesterView>
                </div>
            ))}
        </Stack>
    );
}
