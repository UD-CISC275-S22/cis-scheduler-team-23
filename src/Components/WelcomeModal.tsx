import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

export function WelcomeModal() {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="light" onClick={handleOpen}>
                Click here for how to begin!
            </Button>
            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to our Website!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Hello and welcome to our interactive website to help
                    Computer Science majors at the University of Delaware make
                    their schedules. You will be given a plan to work inside,
                    where you can add/remove semesters and the classes you wish
                    to take in each of those semesters. There are many options
                    for you to edit the plan exactly how you like, including
                    even being able to edit the courses themselves if you would
                    like. Also, if you look at the column on the right side of
                    the website, you can change the concentration to what you
                    wish, and tables of courses and requirements will be
                    displayed. This allows you to see exactly what you need to
                    finish your degree for Computer Science at the University of
                    Delaware. Good luck!
                </Modal.Body>
                <Modal.Footer>
                    <img
                        src="https://media2.giphy.com/media/VxXL8GwKOei90gYlXC/giphy.gif?cid=ecf05e47xhc4mltmj5joywckpdw9y2zlkzfmv9j3bqh971to&rid=giphy.gif&ct=s"
                        width="30"
                        onClick={() =>
                            window.open("https://www.udel.edu", "_blank")
                        }
                    />
                </Modal.Footer>
            </Modal>
        </div>
    );
}
