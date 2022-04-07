import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function DisplayCourses(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);

    function flipVisibility(): void {
        setVisible(!visible);
    }
    return (
        <div>
            <Button onClick={flipVisibility}> CISC 181 </Button>
            {visible && (
                <div>
                    {" "}
                    Principles of computer science illustrated and applied
                    through programming in an object oriented language.
                    Programming projects illustrate computational problems,
                    styles and issues that arise in computer systems development
                    and in all application areas of computation.{" "}
                </div>
            )}
        </div>
    );
}
