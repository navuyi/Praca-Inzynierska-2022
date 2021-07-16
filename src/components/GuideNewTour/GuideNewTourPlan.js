import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import React from "react";
import isEmptyString from "../../utils/isEmptyString";

function GuideNewTourPlan(props) {
    const [editMode, setEditMode] = useState(false);
    const [idToEdit, setIdToEdit] = useState(-1);
    const [planInput, setPlanInput] = useState("");


    function handlePointAdd() {
        if (editMode === false) {
            // Check if input is not empty string
            if (isEmptyString(planInput)) {
                return 1;
            }
            // Add new point
            const tmp_plan = [...props.tourData.tour_plan];
            tmp_plan.push(planInput);
            props.setTourData({...props.tourData, ["tour_plan"]: tmp_plan});
            setPlanInput("");
        } else if (editMode === true) {
            if (planInput.length != 0) {
                // Modify selected point
                const tmp_plan = [...props.tourData.tour_plan];
                tmp_plan[idToEdit] = planInput;

                props.setTourData({...props.tourData, ["tour_plan"]: tmp_plan});
                setEditMode(false);
                setPlanInput("");
            }
        }
    }

    function handlePointDelete(e) {
        const tmp_plan = [...props.tourData.tour_plan];
        const index = e.target.id;
        tmp_plan.splice(index, 1);
        props.setTourData({...props.tourData, ["tour_plan"]: tmp_plan});
    }

    function handlePointEdit(e) {
        // Enable edit mode
        setEditMode(true);
        const tmp_plan = [...props.tourData.tour_plan];
        let inputToEdit = tmp_plan[e.target.id];

        setIdToEdit(e.target.id);
        setPlanInput(inputToEdit);

        // Scroll back to tour plan input
        window.scroll({
            top: document.getElementById("point-input").offsetParent.offsetTop - window.innerHeight / 4,
            left: 0,
            behavior: "smooth"
        });
    }

    return (
        <React.Fragment>
        <Row className={"d-flex flex-row justify-content-center"}>
            <Col lg={3} xs={12} className={"d-flex align-items-center justify-content-between flex-column"}>
                <Form.Group className={"w-100"}>
                    <Form.Control id="point-input" as="textarea" rows={6} value={planInput}
                                  placeholder="Dodaj punkt planu wycieczki"
                                  onChange={(e) => setPlanInput(e.target.value)}/>
                </Form.Group>
                {
                    editMode ? <Button onClick={handlePointAdd} className={"w-100 btn-primary"}> Edytuj </Button> :
                        <Button onClick={handlePointAdd} className={"w-100 btn-success"}> Dodaj </Button>
                }
            </Col>
            <Col lg={8} className={"d-flex justify-content-center mt-5 mt-sm-5 mt-md-5 mt-lg-0 mt-xl-0"}>
                <div className={"table-container"}>
                    {
                        props.tourData.tour_plan.length == 0 ? <div className={"table-container-text"}>  Tutaj pojawią się dodane przez Ciebie punkty planu </div> : null
                    }
                    {
                        props.tourData.tour_plan.map((point, index) => {
                            return (
                                <Row key={index} lg={12}
                                     className={"d-flex flex-xl-row flex-lg-row flex-md-row flex-row justify-content-center mt-5 mt-xl-0 mt-lg-0 mt-md-1 p-1 plan-row"}>
                                    <Col xl={1} lg={1} md={1} xs={2}
                                         className={"d-flex justify-content-xl-center justify-content-md-around justify-content-center align-items-center"}> {index + 1} </Col>
                                    <Col xl={6} lg={6} md={6} xs={7}
                                         className={"d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-center align-items-center "}> {point} </Col>
                                    <Col xl={5} lg={5} md={5} xs={12}
                                         className={"d-flex justify-content-xl-around justify-content-lg-around justify-content-md-around justify-content-around align-items-center mt-3 mt-xl-0 mt-lg-0 mt-md-0"}>
                                        <Button className={"td-b plan-row-button"} variant={"outline-primary"}
                                                onClick={handlePointEdit} id={index}> Edytuj </Button>
                                        <Button className={"td-b plan-row-button"} variant={"outline-danger"}
                                                onClick={handlePointDelete} id={index}> Usuń </Button>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </div>
            </Col>
        </Row>
        </React.Fragment>
        )
}

export default GuideNewTourPlan;